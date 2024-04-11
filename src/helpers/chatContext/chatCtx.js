import { useState, useEffect } from "react";
import Context from "./index"
import { useModel } from "@/utils/useModel"
import { useRouter, useSearchParams } from "next/navigation";
import { AiGirlfriend } from "@/models/ai-girlfriend"
import { useConversation } from "@/utils/useConversation"


const ChatProvider = (props) => {
  const router = useRouter()
  const { getModel } = useModel()
  const [modelId, setModelId] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [girlfriend, setGirlfriend] = useState(null)
  const query = useSearchParams()
  const conversationId = query.get('chatId')
  const { getConversation, newConversation, saveMessage, cleanUpChat, generateImageAi, chatCompletion, generateVoiceAi } = useConversation()
  const [toggleSmallSide, setToggleSmallSide] = useState(false)
  const [profileToggle, setProfileToggle] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [chatMembers, setChatMembers] = useState([])
  const [chats, setChats] = useState([])
  const [isTyeping, setIsTypeing] = useState(false)

  useEffect(() => {
    if (modelId === null) {
      getModel().then((data) => {
        setModelId(data.modelId)
        const girlfriend = AiGirlfriend.filter(model => model.id == data.modelId)[0]
        setGirlfriend(girlfriend)
        setSelectedUser({
          id: girlfriend.id,
          name: girlfriend.name,
          thumb: girlfriend.avatar,
          status: "8",
          mesg: girlfriend.description,
          lastSeenDate: (new Date()).toDateString(),
          onlineStatus: "online",
          typing: false,
        })
      })

    }
  }, [modelId])

  useEffect(() => {
    // get all initial chat users
    setChatMembers(AiGirlfriend)
    // get initial chat between two chat users
    if (props.userId && conversationId) {
      getConversation(props.userId, conversationId)
        .then((data) => {
          setChats(data.conversation)
        })
    }
  }, [conversationId, props.userId]);

  // chat with user first time
  const createChat = (currentUserId, selectedUserId, chats, onlineStatus) => {
    let conversation = {
      id: chats.length + 1,
      users: [currentUserId, selectedUserId],
      lastMessageTime: "-",
      messages: [],
      stickers: [],
      onlineStatus: onlineStatus,
    };
    chats.splice(0, 0, conversation);
    const selectedUser = chatMembers.find((x) => x.id === selectedUserId);
    setChats([...chats]);
    setSelectedUser(selectedUser);
  };

  // change existing chat between two chat users
  const changeChat = (userId) => {
    const selectedUser = chatMembers.find((x) => x.id === userId);
    setSelectedUser(selectedUser);
  };

  // send message to selected chat users
  const sendMessage = async (
    currentUserId,
    selectedUserId,
    messageInput,
    image,
    chats
  ) => {
    const outMessage = {
      type: "out",
      text: messageInput,
      image: null,
      avatar: "/contact/4.jpg",
      name: "me"
    }
    chats.push(outMessage)

    const messageConversationId = conversationId ? conversationId : (await newConversation(currentUserId, selectedUserId)).conversationId

    const response = await chatCompletion(currentUserId, chats, girlfriend, messageConversationId)
    chats.push(response)
    router.push(`/messenger?chatId=${messageConversationId}`)
  };

  const deleteChat = (currentUserId) => {
    if (currentUserId && conversationId) {
      cleanUpChat(currentUserId, conversationId)
        .then(() => {
          setChats([])
          router.push(`/messenger`)
        })
        .catch(() => {
          alert("Errore durante cancellazione della chat")
        })
    }
  }

  const requestImage = async (currentUserId) => {
    if (currentUserId && girlfriend) {
      const messageConversationId = conversationId ? conversationId : (await newConversation(currentUserId, girlfriend.id)).conversationId

      await generateImageAi(currentUserId, girlfriend, messageConversationId)
      router.push(`/messenger?chatId=${messageConversationId}`)
    }
  }

  const playVoiceCallback = async (currentUserId, userText) => {
    try {
        // For knowledge
        // https://github.com/mdn/webaudio-examples/blob/main/audio-buffer-source-node/playbackrate/script.js
        if (girlfriend && conversationId){
          return await generateVoiceAi(currentUserId, userText, girlfriend, conversationId)
        }
    } catch (err) {
        console.error(`Unable to fetch the audio file. Error: ${err}`);
        alert(`Unable to fetch the audio file, sorry for the issue :(, please contact our admins`);
    }
}

  // reply message to selected chat users
  const replyMessage = (currentUserId, selectedUserId, replyMessage, chats) => {
    let chat = chats.find(
      (x) => x.users.includes(currentUserId) && x.users.includes(selectedUserId)
    ); // find selected chat User Id
    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes();
    if (chat) {
      chat.messages.push({
        sender: selectedUserId,
        time: time,
        text: replyMessage,
        read: true,
      });
      chat.lastMessageTime = time;
      chat.online = "";
      let chats_data = chats.filter((x) => x.id !== chat.id);
      chats_data.splice(0, 0, chat);
      const selectedUser = chatMembers.find((x) => x.id === selectedUserId);
      selectedUser.onlineStatus = "online"; // chat user reply the message then set selected chat user  status to "online"
      setChats([...chats]); // update chats messages
      setSelectedUser(selectedUser);
    }
  };

  // when chat user replied to our message existing tyeping loader
  const typingMessage = (typeing) => {
    setIsTypeing(typeing);
  };

  //toggle right sidebar In and Out on cLick
  const OpenAppSidebar = (rside) => {
    console.log("rside", rside);
    if (rside) {
      console.log("rside if ....", rside);
      setToggleSmallSide(!rside);
      document.querySelector(".chitchat-main").classList.add("small-sidebar");
      document.querySelector(".app-sidebar").classList.add("active");
      console.log("localStorage.getItem", localStorage.getItem("layout_mode"));
      document.body.className = `sidebar-active ${localStorage.getItem(
        "layout_mode"
      )}`;
    } else {
      console.log(
        "rside else ....",
        rside,
        localStorage.getItem("layout_mode")
      );
      setToggleSmallSide(!rside);
      document
        .querySelector(".chitchat-main")
        .classList.remove("small-sidebar");
      document.querySelector(".app-sidebar").classList.remove("active");
      console.log("localStorage.getItem", localStorage.getItem("layout_mode"));
      document.body.className = `main-page ${localStorage.getItem(
        "layout_mode"
      )}`;
    }
  };

  const CloseAppSidebar = (rside) => {
    setToggleSmallSide(!rside);
    document.querySelector(".chitchat-main").classList.remove("small-sidebar");
    document.querySelector(".app-sidebar").classList.remove("active");
    document.body.className = `main-page ${localStorage.getItem(
      "layout_mode"
    )}`;
  };

  //set responsive in messenger page
  const handleClickRight = (response) => {
    if (response) {
      setMobileMenu(!response);
      document.querySelector(".sidebar-toggle").classList.add("mobile-menu");
    } else {
      setMobileMenu(!response);
      document.querySelector(".sidebar-toggle").classList.remove("mobile-menu");
    }
  };

  return (
    <Context.Provider
      value={{
        profileToggle: profileToggle,
        setProfileToggle: setProfileToggle,
        toggleSmallSide: toggleSmallSide,
        CloseAppSidebar: CloseAppSidebar,
        OpenAppSidebar: OpenAppSidebar,
        mobileMenu: mobileMenu,
        handleClickRight: handleClickRight,
        chatMembers: chatMembers,
        chats: chats,
        currentUser: { id: props.userId },
        selectedUser: selectedUser,
        isTyeping: isTyeping,
        changeChat: changeChat,
        createChat: createChat,
        sendMessage: sendMessage,
        replyMessage: replyMessage,
        typingMessage: typingMessage,
        deleteChat: deleteChat,
        generateImageAi: requestImage,
        playVoiceCallback: playVoiceCallback
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default ChatProvider;
