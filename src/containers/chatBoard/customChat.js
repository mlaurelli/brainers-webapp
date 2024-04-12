import { useContext, useEffect, useState, useRef } from "react";
import { Button, Dropdown, DropdownToggle, Modal, ModalBody, ModalHeader } from "reactstrap";
import { User, Search, ChevronLeft, Phone, Video, Trash2, Slash, MoreVertical, UserPlus, Pause, Download, RotateCw } from "react-feather";
import ChatContext from "../../helpers/chatContext";
import { Tooltip } from "react-tippy";
import MessageInput from "./messageInput";
import Link from "next/link";

const CustomChat = (props) => {
  const [volum, setVolum] = useState(true);
  const [search, setSearch] = useState(false);
  const [audiocall, setAudiocall] = useState(false);
  const [audioreceivecall, setAudioreceivecall] = useState(false);
  const [videocall, setVideocall] = useState(false);
  const [videoscreen, setVideoScreen] = useState(false);
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const chatCtx = useContext(ChatContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [playVoice, setPlayVoice] = useState(false)
  const { handleClickRight, mainMenu, profileToggle, setProfileToggle } = useContext(ChatContext);
  const [source, setSource] = useState(null)

  const chatMembers = chatCtx.chatMembers;
  const chats = chatCtx.chats;
  const currentUser = chatCtx?.currentUser;
  const selectedUser = chatCtx.selectedUser;
  const isTyeping = chatCtx.isTyeping;
  const typingMessage = chatCtx.typingMessage;
  const deleteChat = chatCtx.deleteChat
  const playVoiceCallback = chatCtx.playVoiceCallback
  const selectedChat = chatMembers && chats && selectedUser ? chats : null;
  const bottomRef = useRef(null)


  // useful for audio
  let audioCtx
  let buffer

  const toggleAudiocall = () => {
    setAudiocall(!audiocall);
  };
  const toggleVideocall = () => {
    setVideocall(!videocall);
  };
  const toggleAudioReceiveCall = () => {
    setAudioreceivecall(!audioreceivecall);
  };

  const AudioReceiveCall = async () => {
    setAudioreceivecall(true);
    setAudiocall(false);
  };

  const profileSideBarToggle = (toggle) => {
    console.log("call toggle");
    if (toggle) {
      document.body.className = `sidebar-active main-page menu-active ${localStorage.getItem("layout_mode")}`;
      // document
      //   .querySelector('.chitchat-main')
      //   .classList.remove('small-sidebar');
      document.querySelector(".chitchat-main").classList.add("small-sidebar");
      document.querySelector(".app-sidebar").classList.remove("active");
      setProfileToggle(toggle);
      props.setQuickAction(false);
    } else {
      document.body.className = `sidebar-active main-page ${localStorage.getItem("layout_mode")}`;
      document.querySelector(".chitchat-main").classList.add("small-sidebar");
      document.querySelector(".app-sidebar").classList.add("active");
      setProfileToggle(toggle);
    }
  };

  const refreshCw = (e) => {
    e.currentTarget.classList.toggle("refreshed");
  }

  const handlePlayVoice = async (currentUserId, userText) => {
    try {
      // For knowledge
      // https://github.com/mdn/webaudio-examples/blob/main/audio-buffer-source-node/playbackrate/script.js
      audioCtx = new AudioContext()
      const response = await playVoiceCallback(currentUserId, userText)
      buffer = await audioCtx.decodeAudioData(await response.arrayBuffer())
      let sourceAudio = audioCtx.createBufferSource()
      sourceAudio.buffer = buffer
      sourceAudio.connect(audioCtx.destination)
      sourceAudio.loop = false
      setSource(sourceAudio)
      setPlayVoice(true)
    } catch (err) {
      console.error(`Unable to fetch the audio file. Error: ${err}`);
      alert(`Unable to fetch the audio file, sorry for the issue :(, please contact our admins`);
    }
  }

  const handleStopVoice = () => {
    try {
      // For knowledge
      // https://github.com/mdn/webaudio-examples/blob/main/audio-buffer-source-node/playbackrate/script.js
      if (source) {
        source.stop()
        setSource(null)
        setPlayVoice(false)
      }

    } catch (err) {
      console.error(`Unable to fetch the audio file. Error: ${err}`);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      typingMessage(false);
    }, 3000);
  }, [isTyeping]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedChat])

  useEffect(() => {
    if (source) source.start()
  }, [source])

  return chatMembers && chats && selectedUser ? (
    <>
      <div className="messages custom-scroll active wallpapers" id="chating">
        {/* <div className="contact-details">
          <div className="row">
            <form className={`form-inline search-form ${search ? "open" : ""}`}>
              <div className="form-group">
                <input className="form-control-plaintext" type="search" placeholder="Search..." />
                <div className="icon-close close-search" onClick={() => setSearch(false)}></div>
              </div>
            </form>
            <div className="col-7">
              <div className="media left">
                <div className="media-left mr-3" onClick={() => profileSideBarToggle(!profileToggle)}>
                  <div
                    className={`profile menu-trigger ${selectedUser.onlineStatus}`}
                    style={{
                      backgroundImage: `url('assets/images/${selectedUser.thumb}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "block",
                    }}></div>
                </div>
                <div className="media-body">
                  <h5 color="white">{selectedUser.name}</h5>
                  <div className={`badge ${selectedUser.onlineStatus === "online" ? "badge-success" : "badge-danger"}`}>{selectedUser.onlineStatus === "online" ? "Active" : "InActive"}</div>
                </div>
                 <div className="media-right">
                  <ul>
                    <li>
                      <Link className="icon-btn btn-light button-effect mute" href="#" onClick={() => setVolum(!volum)}>
                        {volum ? <span className="effect-wave"></span> : ""}
                        <i className={`fa fa-volume-up ${volum ? "" : "off"}`}></i>
                      </Link>
                    </li>
                    <li>
                      <Link className="icon-btn btn-light search search-right" href="#" onClick={() => setSearch(!search)}>
                        <Search />
                      </Link>
                    </li>
                    <li>
                      <Link className="icon-btn btn-light button-effect mobile-sidebar" href="#" onClick={() => handleClickRight(mainMenu)}>
                        <ChevronLeft />
                      </Link>
                    </li>
                  </ul>
                </div> 
              </div>
            </div>
             <div className="col">
              <ul className="calls text-right">
                <li>
                  <Tooltip title="Quick Audio Call" position="bottom-end" trigger="mouseenter">
                    <Link className="icon-btn btn-light button-effect" href="#" onClick={() => setAudiocall(!audiocall)}>
                      <Phone />
                    </Link>
                  </Tooltip>
                  <Modal className="show" isOpen={audiocall} toggle={toggleAudiocall} centered={true}>
                    <ModalBody className="p-0">
                      <div
                        className="audiocall1 call-modal"
                        style={{
                          backgroundImage: `url('../assets/images/avtar/big/audiocall.jpg')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          display: "block",
                        }}>
                        <img className="bg-img" src="../assets/images/avtar/big/audiocall.jpg" alt="Avatar" style={{ display: "none" }} />
                        <div className="center-con text-center">
                          <div className="title2">Josephin water</div>
                          <h6>log angelina california</h6>
                          <ul>
                            <li>
                              <Link className="icon-btn btn-success button-effect btn-xl is-animating" href="#" onClick={AudioReceiveCall}>
                                <Phone />
                              </Link>
                            </li>
                            <li>
                              <Link className="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" href="#" onClick={toggleAudiocall}>
                                <Phone />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                  <Modal className="fade audiorcvcall show" id="audiorcvcall" isOpen={audioreceivecall} toggle={toggleAudioReceiveCall} centered={true}>
                    <ModalBody className="p-0">
                      <div className="audiocall2 call-modal">
                        <img className="bg-img" src="../assets/images/avtar/big/audiocall.jpg" alt="Avatar" />
                        <div className="center-con text-center">
                          <div id="basicUsage2">{props.timeValues}</div>
                          <div className="title2">Josephin water</div>
                          <h6>log angelina california</h6>
                          <ul>
                            <li>
                              <Link className="icon-btn btn-light button-effect mute" href="#" onClick={() => setMute(!mute)}>
                                <i className={`fa fa-microphone ${mute ? "off" : ""}`}></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="icon-btn btn-light button-effect mute" href="#" onClick={() => setSpeaker(!speaker)}>
                                <i className={`fa fa-volume-up ${speaker ? "off" : ""}`}></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="icon-btn btn-danger button-effect btn-xl is-animating" href="#" onClick={toggleAudioReceiveCall}>
                                {" "}
                                <Phone />
                              </Link>
                            </li>
                            <li>
                              <Link className="icon-btn btn-light button-effect" href="#" data-tippy-content="Add Call">
                                <UserPlus />
                              </Link>
                            </li>
                            <li>
                              <Link className="icon-btn btn-light button-effect" href="#" data-tippy-content="Pause">
                                <Pause />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </li>
                <li>
                  <Tooltip title="Quick Video Call" position="bottom-end" trigger="mouseenter">
                    <Link className="icon-btn btn-light button-effect" href="#" onClick={() => setVideocall(!videocall)}>
                      <Video />
                    </Link>
                  </Tooltip>
                  <Modal className={`viddiolog fade show ${videoscreen ? "active" : ""}`} isOpen={videocall} toggle={toggleVideocall} centered={true}>
                    <ModalBody>
                      <div
                        className="videocall call-modal "
                        style={{
                          backgroundImage: `url('../assets/images/avtar/big/videocall_bg.jpg')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          display: "block",
                        }}>
                        <img className="bg-img" src="/assets/images/avtar/big/videocall_bg.jpg" alt="Avatar" style={{ display: "none" }} />
                        <div
                          className="small-image"
                          style={{
                            backgroundImage: `url('../assets/images/avtar/big/videocall.jpg')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "block",
                          }}>
                          <img className="bg-img" src="/assets/images/avtar/big/videocall.jpg" alt="Avatar" style={{ display: "none" }} />
                        </div>
                        <div className="media videocall-details">
                          <div className="usersprof">
                            <div
                              className="profile"
                              style={{
                                backgroundImage: `url('../assets/images/avtar/2.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                display: "block",
                              }}>
                              <img className="bg-img" src="/assets/images/avtar/2.jpg" alt="Avatar" style={{ display: "none" }} />
                            </div>
                            <div
                              className="profile"
                              style={{
                                backgroundImage: `url('../assets/images/avtar/3.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                display: "block",
                              }}>
                              <img className="bg-img" src="/assets/images/avtar/3.jpg" alt="Avatar" style={{ display: "none" }} />
                            </div>
                          </div>
                          <div className="media-body">
                            <h5>Josephin water</h5>
                            <h6>America ,California</h6>
                          </div>
                          <div id="basicUsage">{props.timeValues}</div>
                          <div className="zoomcontent">
                            <Link className="text-dark" href="#" onClick={() => setVideoScreen(!videoscreen)}>
                              <img src="../assets/images/logo/maximize.svg" alt="zoom screen" />
                            </Link>
                          </div>
                        </div>
                        <div className="center-con text-center">
                          <ul>
                            <li>
                              <Link className="icon-btn btn-light button-effect pause" href="#" data-tippy-content="Hold">
                                <i className="ti-control-pause"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="icon-btn btn-danger button-effect btn-xl is-animating" href="#" onClick={toggleVideocall}>
                                {" "}
                                <Phone />
                              </Link>
                            </li>
                            <li>
                              <Link className="icon-btn btn-light button-effect mic" href="#" data-tippy-content="Mute">
                                <i className="fa fa-microphone"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </li>
                <li>
                  <Tooltip title="All Apps" position="bottom-end" trigger="mouseenter">
                    <Link className="icon-btn btn-light button-effect apps-toggle" href="#" onClick={() => props.OpenAppSidebar(props.toggleSmallSide)}>
                      <i className="ti-layout-grid2"></i>
                    </Link>
                  </Tooltip>
                </li>
                <li className="chat-friend-toggle">
                  <Dropdown isOpen={props.quickAction} toggle={() => props.setQuickAction(!props.quickAction)}>
                    <Tooltip title="Quick action" trigger="mouseenter" position="bottom-end">
                      <DropdownToggle tag="button" data-toggle="dropdown" aria-expanded={props.quickAction} className="icon-btn btn-light bg-transparent button-effect outside">
                        <MoreVertical />
                      </DropdownToggle>
                    </Tooltip>
                    <div className="chat-frind-content" style={props.quickAction ? { display: "block" } : { display: "none" }}>
                      <ul>
                        <li>
                          <Link className="icon-btn btn-outline-primary button-effect btn-sm" href="#" onClick={() => profileSideBarToggle(!profileToggle)}>
                            <User />
                          </Link>
                          <h5 onClick={() => profileSideBarToggle(!profileToggle)}>Profile</h5>
                        </li>
                        <li>
                          <Link className="icon-btn btn-outline-danger button-effect btn-sm" href="#" onClick={() => setDeleteModal(!deleteModal)}>
                            <Trash2 />
                          </Link>
                          <h5 onClick={() => setDeleteModal(!deleteModal)}>Delete</h5>
                        </li>
                        <li>
                          <Link className="icon-btn btn-outline-light button-effect btn-sm" href="#" onClick={() => setBlockModal(!blockModal)}>
                            <Slash />
                          </Link>
                          <h5 onClick={() => setBlockModal(!blockModal)}>Block</h5>
                        </li>
                      </ul>
                    </div>
                  </Dropdown>
                </li>
              </ul>
            </div> *
          </div>
        </div> */}
        <Modal isOpen={deleteModal} className="add-popup delete-modal" toggle={() => setDeleteModal(!deleteModal)} centered>
          <ModalHeader toggle={() => setDeleteModal(!deleteModal)}></ModalHeader>
          <ModalBody>
            <h3>Do you want to delete the chat?</h3>
            <div className="delete-btn">
              <Button className="button-effect" size="sm" color="danger" onClick={() => {
                setDeleteModal(!deleteModal)
                deleteChat(currentUser.id)
              }}>
                Delete
              </Button>
              <Button className="button-effect ml-2" size="sm" color="primary" onClick={() => setDeleteModal(!deleteModal)}>
                Close
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={blockModal} className="add-popup delete-modal" toggle={() => setBlockModal(!blockModal)} centered>
          <ModalHeader toggle={() => setBlockModal(!blockModal)}></ModalHeader>
          <ModalBody>
            <h3>Do you want to block this user?</h3>
            <div className="delete-btn">
              <Button className="button-effect" size="sm" color="danger" onClick={() => setBlockModal(!blockModal)}>
                Block
              </Button>
              <Button className="button-effect ml-2" size="sm" color="primary" onClick={() => setBlockModal(!blockModal)}>
                Close
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <div className="contact-chat">
          <ul className="chatappend">
            {selectedChat?.length > 0 ? (
              selectedChat.map((item, index) => {
                // const participators = chatMembers.find((x) => x.id === item.sender);
                return (
                  <li className={`${item.type !== 'out' ? "sent" : "replies"}`} key={index}>
                    <div className="media">
                      <div
                        className="profile mr-4"
                        style={{
                          backgroundImage: `url('assets/images/${item.avatar}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          // display: "block",
                        }}>
                        <img className="bg-img" src={`/assets/images/${item.avatar}`} alt="Avatar" style={{ display: "none" }} />
                      </div>
                      <div className="media-body">
                        <div className="contact-name">
                          <h5>{item.name}</h5>
                          {/* <h6>{item.time}</h6> */}
                          <ul className="msg-box">
                            <li className="msg-setting-main">
                              {item.text ? <>
                                <h5> {item.text}</h5>
                                {item.type !== 'out' ? <Link className="icon-btn btn-light button-effect mute" href="#" onClick={async () => {
                                  if (!playVoice) {
                                    await handlePlayVoice(currentUser.id, item.text)
                                  } else {
                                    await handleStopVoice()
                                  }
                                }}>
                                  {volum ? <span className="effect-wave"></span> : ""}
                                  <i className={`fa fa-volume-up ${volum ? "" : "off"}`}></i>
                                </Link> : ''}
                              </> : ""}
                              {item.image ?
                                <ul className="auto-gallery">
                                  <li
                                    style={{
                                      backgroundImage: `url('${item.image}')`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                      display: "block",
                                    }}>
                                    {/* <img className="bg-img" src={`${item.image}`} alt="Avatar" style={{ display: "none" }} /> */}
                                  </li>
                                </ul> : ""}
                              {/* {item.stickers ? <img src={item.stickers} alt="" /> : ""} */}
                              {/* {<div className="badge badge-success sm ml-2"> R</div>} */}

                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <li>
                <div className="contact-chat">
                  <div className="rightchat animat-rate">
                    <div className="bg_circle">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="cross"></div>
                    <div className="cross1"></div>
                    <div className="cross2"></div>
                    <div className="dot"></div>
                    <div className="dot1"> </div>
                  </div>
                </div>
                <div className="call-list-center">
                  <img src="/assets/images/chat.png" alt="" />
                  <div className="animated-bg">
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                  <p>Select a chat to read messages</p>
                </div>
              </li>
            )}
            <li className="sent last typing-m" style={isTyeping ? { display: "block" } : { display: "none" }}>
              <div className="media">
                <div
                  className="profile mr-4"
                  style={{
                    backgroundImage: `url('assets/images/${selectedUser.avatar}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "block",
                  }}></div>
                <div className="media-body">
                  <div className="contact-name">
                    <h5>{selectedUser.name}</h5>
                    <ul className="msg-box">
                      <li>
                        <h5>
                          <span className="d-block type">
                            <span className="d-block typing-loader"></span>
                          </span>
                        </h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li id="bottom-reference" ref={bottomRef}>
            </li>
          </ul>
        </div>
      </div>
      <MessageInput customChat={"direct"} />
    </>
  ) : (
    ""
  );
};

export default CustomChat;
