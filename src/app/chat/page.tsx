'use client'

import { useSession } from "next-auth/react";
import ChatNavigation from "../../components/chat/navigation";
import { SideBar } from "../../components/chat/sidebar";
import { ChatBox } from "../../components/chat/chatbox";
import Notifications from "../../components/chat/notifications";
import UserProfile from "../../components/chat/userprofile";
import Settings from "../../components/chat/settings";
import Disconnected from "../../components/chat/disconnected";
import VoiceCallModal from "../../components/chat/voicecallmodal";
import HeaderNav from "../../components/header";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/loader";
import { useEffect, useState } from "react";
import { useModel } from "@/utils/useModel";

export default function Chat() {
    const query = useSearchParams()

    const { getModel } = useModel()

    const chatId = query.get('chatId')

    const { data: session, status } = useSession()

    const [modelId, setModelId] = useState<string | null>(null)

    useEffect(() => {
        if (modelId === null) {
            getModel().then((data) => setModelId(data.modelId))
        }
    }, [modelId])


    if (status === "loading" || modelId === null) {
        return <Loader />
    }

    return (
        <>
            <HeaderNav />
            <main>
                <div className="layout">
                    {/* <!-- navigation --> */}
                    {/* <ChatNavigation /> */}
                    {/* <!-- ./ navigation --> */}

                    {/* <!-- Chat left sidebar --> */}
                    {/* <SideBar session={session!} chatId={chatId} /> */}
                    {/* <!-- ./ Chat left sidebar --> */}

                    {/* <!-- chat --> */}
                    <ChatBox session={session!} conversationId={chatId} modelId={modelId}
                    />
                    {/* <!-- ./ chat --> */}

                    {/* <!-- ./ layout --> */}
                </div>
                {/* <!-- Notifications --> */}
                <Notifications />
                {/* <!-- ./ Notifications --> */}

                {/* <!-- User profile --> */}
                <UserProfile />
                {/* <!-- ./ User profile --> */}

                {/* <!-- Settings --> */}
                <Settings />
                {/* <!-- ./ Settings --> */}

                {/* <!-- disconnected modal --> */}
                <Disconnected />
                {/* <!-- ./ disconnected modal --> */}

                {/* <!-- voice call modal --> */}
                <VoiceCallModal />
                {/* <!-- ./ Video call modal --> */}

                {/* <!-- add friends modal --> */}
                <div className="modal fade" id="intiveUsers" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="mdi mdi-account-plus-outline"></i> Invite users
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <i className="mdi mdi-close"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="mb-4">
                                    <div className="form-group">
                                        <label htmlFor="invite_emails" className="col-form-label">Email address</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" id="invite_emails" placeholder="Email address" />
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-success">
                                                    <i className="mdi mdi-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="invite_topic" className="col-form-label">Invitation topic</label>
                                        <input type="text" className="form-control" id="invite_topic" placeholder="Topic" />
                                    </div>
                                </form>
                                <div className="d-flex justify-content-between">
                                    <span>Users</span>
                                    <span className="text-muted small">Total 3 users</span>
                                </div>
                                <hr />
                                <div>
                                    <ul className="list-group list-group-unlined">
                                        <li className="list-group-item px-0 d-flex">
                                            <figure className="avatar mr-3">
                                                <Image src="/dist/media/img/avatar4.jpg" className="rounded-circle" alt="image" width={128} height={128} />
                                            </figure>
                                            <div>
                                                <div>Amanda Harvey</div>
                                                <div className="small text-muted">amanda@example.com</div>
                                            </div>
                                            <a className="text-danger ml-auto" data-toggle="tooltip" title="Delete" href="#">
                                                <i className="mdi mdi-delete-outline"></i>
                                            </a>
                                        </li>
                                        <li className="list-group-item px-0 d-flex">
                                            <figure className="avatar mr-3">
                                                <span className="avatar-title bg-info rounded-circle">D</span>
                                            </figure>
                                            <div>
                                                <div>David Harrison</div>
                                                <div className="small text-muted">david@example.com</div>
                                            </div>
                                            <a className="text-danger ml-auto" data-toggle="tooltip" title="Delete" href="#">
                                                <i className="mdi mdi-delete-outline"></i>
                                            </a>
                                        </li>
                                        <li className="list-group-item px-0 d-flex">
                                            <figure className="avatar mr-3">
                                                <Image src="/dist/media/img/avatar10.jpg" className="rounded-circle" alt="image" width={128} height={128} />
                                            </figure>
                                            <div>
                                                <div>Ella Lauda</div>
                                                <div className="small text-muted">Markvt@example.com</div>
                                            </div>
                                            <a className="text-danger ml-auto" data-toggle="tooltip" title="Delete" href="#">
                                                <i className="mdi mdi-delete-outline"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ./ add friends modal --> */}

                {/* <!-- new group modal --> */}
                <div className="modal fade" id="newGroup" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="mdi mdi-account-group-outline mr-2"></i> New Group
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <i className="mdi mdi-close"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="group_name" className="col-form-label">Group name</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="group_name" />
                                            <div className="input-group-append">
                                                <button className="btn btn-success" data-toggle="dropdown" title="Emoji" type="button">
                                                    <i className="mdi mdi-face"></i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-big dropdown-menu-right p-0">
                                                    <div className="dropdown-menu-search">
                                                        <input type="text" className="form-control" placeholder="Search emoji" />
                                                    </div>
                                                    <div className="emojis chat-emojis">
                                                        <ul>
                                                            <li>😁</li>
                                                            <li>😂</li>
                                                            <li>😃</li>
                                                            <li>😄</li>
                                                            <li>😅</li>
                                                            <li>😆</li>
                                                            <li>😉</li>
                                                            <li>😊</li>
                                                            <li>😋</li>
                                                            <li>😌</li>
                                                            <li>😍</li>
                                                            <li>😏</li>
                                                            <li>😒</li>
                                                            <li>😓</li>
                                                            <li>😔</li>
                                                            <li>😖</li>
                                                            <li>😘</li>
                                                            <li>😝</li>
                                                            <li>😠</li>
                                                            <li>😢</li>
                                                            <li>🙅</li>
                                                            <li>🙆</li>
                                                            <li>🙇</li>
                                                            <li>🙈</li>
                                                            <li>🙉</li>
                                                            <li>🙊</li>
                                                            <li>🙋</li>
                                                            <li>🙌</li>
                                                            <li>🙍</li>
                                                            <li>🙎</li>
                                                            <li>🙏</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-2">The group members</p>
                                    <div className="form-group">
                                        <div className="avatar-group">
                                            <figure className="avatar" data-toggle="tooltip" title="Tobit Spraging">
                                                <span className="avatar-title bg-success rounded-circle">T</span>
                                            </figure>
                                            <figure className="avatar" data-toggle="tooltip" title="Cloe Jeayes">
                                                <Image src="/dist/media/img/avatar8.jpg" className="rounded-circle" alt="image" width={128} height={128} />
                                            </figure>
                                            <figure className="avatar" data-toggle="tooltip" title="Marlee Perazzo">
                                                <span className="avatar-title bg-warning rounded-circle">M</span>
                                            </figure>
                                            <figure className="avatar" data-toggle="tooltip" title="Stafford Pioch">
                                                <Image src="/dist/media/img/avatar1.jpg" className="rounded-circle" alt="image" width={128} height={128} />
                                            </figure>
                                            <figure className="avatar" data-toggle="tooltip" title="Bethena Langsdon">
                                                <span className="avatar-title bg-info rounded-circle">B</span>
                                            </figure>
                                        </div>
                                        <button type="button" className="btn btn-light" title="Add User"
                                            data-toggle="dropdown">
                                            Add new user
                                        </button>
                                        <div className="dropdown-menu p-0">
                                            <div className="dropdown-menu-search">
                                                <input type="text" className="form-control" placeholder="Search users" />
                                            </div>
                                            <div className="px-3 pb-3">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item d-flex align-items-center px-0">
                                                        <div className="mr-2">
                                                            <figure className="avatar avatar-sm">
                                                                <span className="avatar-title bg-info rounded-circle">V</span>
                                                            </figure>
                                                        </div>
                                                        <div>Valentine Maton</div>
                                                        <button type="button" className="btn ml-auto text-primary">Add</button>
                                                    </li>
                                                    <li className="list-group-item d-flex align-items-center px-0">
                                                        <div className="mr-2">
                                                            <figure className="avatar avatar-sm">
                                                                <Image src="/dist/media/img/avatar1.jpg"
                                                                    className="rounded-circle" alt="image" width={128} height={128} />
                                                            </figure>
                                                        </div>
                                                        <div>Forest Kroch</div>
                                                        <button type="button" className="btn ml-auto text-primary">Add</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description" className="col-form-label">Description</label>
                                        <textarea className="form-control" id="description"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Create Group</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ./ new group modal --> */}

                {/* <!-- setting modal --> */}
                <div className="modal fade" id="settingsModal" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="mdi mdi-cog mr-2"></i> Settings
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <i className="mdi mdi-close"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#account" role="tab" aria-controls="account"
                                            aria-selected="true">Account</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#notification" role="tab"
                                            aria-controls="notification" aria-selected="false">Notification</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#contact" role="tab" aria-controls="contact"
                                            aria-selected="false">Security</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane show active" id="account" role="tabpanel">
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" checked id="customSwitch1" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch1">Allow connected contacts</label>
                                        </div>
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" checked id="customSwitch2" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch2">Confirm message requests</label>
                                        </div>
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" checked id="customSwitch3" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch3">Profile privacy</label>
                                        </div>
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="customSwitch4" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch4">Developer mode options</label>
                                        </div>
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" checked id="customSwitch5" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch5">Two-step security
                                                verification</label>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="notification" role="tabpanel">
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" checked id="customSwitch6" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch6">Allow mobile notifications</label>
                                        </div>
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="customSwitch7" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch7">Notifications from your
                                                friends</label>
                                        </div>
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="customSwitch8" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch8">Send notifications by email</label>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="contact" role="tabpanel">
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="customSwitch9" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch9">Suggest changing passwords every
                                                month.</label>
                                        </div>
                                        <div className="form-item custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" checked id="customSwitch10" onChange={() => { }} />
                                            <label className="custom-control-label" htmlFor="customSwitch10">Let me know about suspicious
                                                entries to your account</label>
                                        </div>
                                        <div className="form-item">
                                            <p>
                                                <a className="btn btn-light" data-toggle="collapse" href="#collapseExample" role="button"
                                                    aria-expanded="false"
                                                    aria-controls="collapseExample">
                                                    <i className="mdi mdi-plus mr-2"></i> Security Questions
                                                </a>
                                            </p>
                                            <div className="collapse" id="collapseExample">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Question 1" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Answer 1" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Question 2" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Answer 2" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ./ setting modal --> */}

                {/* <!-- edit profile modal --> */}
                <div className="modal fade" id="editProfile" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="mdi mdi-clipboard-edit-outline mr-2"></i> Edit Profile
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <i className="mdi mdi-close"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#personal" role="tab"
                                            aria-controls="personal" aria-selected="true">Personal</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#about" role="tab" aria-controls="about"
                                            aria-selected="false">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#social-links" role="tab"
                                            aria-controls="social-links" aria-selected="false">Social Links</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane show active" id="personal" role="tabpanel">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="fullname" className="col-form-label">Fullname</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" id="fullname" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">
                                                            <i className="mdi mdi-account-outline"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label">Avatar</label>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <figure className="avatar mr-3 item-rtl">
                                                            <Image src="/dist/media/img/avatar4.jpg" className="rounded-circle"
                                                                alt="image" width={128} height={128} />
                                                        </figure>
                                                    </div>
                                                    <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="customFile" />
                                                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="city" className="col-form-label">City</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" id="city" placeholder="Ex: Columbia" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">
                                                            <i className="mdi mdi-map-marker-outline"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone" className="col-form-label">Phone</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" id="phone" placeholder="(555) 555 55 55" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">
                                                            <i className="mdi mdi-phone"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="website" className="col-form-label">Website</label>
                                                <input type="text" className="form-control" id="website" placeholder="https://" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="tab-pane" id="about" role="tabpanel">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="about-text" className="col-form-label">Write a few words that describe
                                                    you</label>
                                                <textarea className="form-control" id="about-text"></textarea>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" checked id="customCheck1" onChange={() => { }} />
                                                <label className="custom-control-label" htmlFor="customCheck1">View profile</label>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="tab-pane" id="social-links" role="tabpanel">
                                        <form>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Username" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-facebook">
                                                            <i className="mdi mdi-facebook"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Username" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-twitter">
                                                            <i className="mdi mdi-twitter"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Username" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-instagram">
                                                            <i className="mdi mdi-instagram"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Username" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-linkedin">
                                                            <i className="mdi mdi-linkedin"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Username" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-youtube">
                                                            <i className="mdi mdi-youtube"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Username" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-google">
                                                            <i className="mdi mdi-google"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Username" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-whatsapp">
                                                            <i className="mdi mdi-whatsapp"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ./ edit profile modal --> */}
            </main>
        </>
    )
}
