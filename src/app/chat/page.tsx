'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "../components/login-button";

export default function Chat() {
    const { data: session } = useSession()
    return (
        <main>
            {/* <!-- Google Nunito font --> */}
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700&display=swap" rel="stylesheet" />

            {/* <!-- Themify icons --> */}
            <link href="./dist/icons/themify/themify-icons.css" rel="stylesheet" />

            {/* <!-- Material design icons --> */}
            <link href="./dist/icons/materialicons/css/materialdesignicons.min.css" rel="stylesheet" />

            {/* <!-- Bundle styles --> */}
            <link rel="stylesheet" href="dist/vendor/bundle.css" />

            {/* <!-- Slick --> */}
            <link rel="stylesheet" href="dist/vendor/slick/slick-theme.css" />
            <link rel="stylesheet" href="dist/vendor/slick/slick.css" />

            {/* <!-- Fancybox --> */}
            <link rel="stylesheet" href="dist/vendor/fancybox/jquery.fancybox.min.css" type="text/css" />

            {/* <!-- Intro js --> */}
            <link rel="stylesheet" href="dist/vendor/introjs/introjs.css" type="text/css" />

            {/* <!-- App styles --> */}
            <link rel="stylesheet" href="./dist/css/app.min.css" />
            Pippo è qui
            <Link href={'/'}>Home</Link>
            <br />
            {session?.user?.name}
            <LoginButton />


            {/* <!-- preloader --> */}
            <div className="preloader">
                <img src="./dist/media/img/logo-2x.png" alt="logo" />
                <p className="lead font-weight-bold text-muted my-5">Loading Tinno Chat App ...</p>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            {/* <!-- ./ preloader --> */}

            {/* <!-- layout --> */}
            <div className="layout">

                {/* <!-- navigation --> */}
                <nav className="navigation">
                    <div className="nav-group">
                        <ul>
                            <li className="logo">
                                <a href="#">
                                    <img src="./dist/media/img/logo.png" alt="logo"/>
                                </a>
                            </li>
                            <li className="navigation-action-button dropright" title="New" data-placement="right">
                                <a href="#" data-intro-js="1" data-toggle="dropdown">
                                    <i className="mdi mdi-plus"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="#" className="dropdown-item" data-left-sidebar="friends">Start Chat</a>
                                    <a href="#" className="dropdown-item" data-toggle="modal" data-target="#newGroup">Add Group</a>
                                    <a href="#" className="dropdown-item" data-toggle="modal" data-target="#intiveUsers">Invite users</a>
                                </div>
                            </li>
                            <li>
                                <a className="active" data-intro-js="2" data-left-sidebar="chats" href="#" data-toggle="tooltip"
                                    title="Chats" data-placement="right">
                                    <span className="badge badge-warning"></span>
                                    <i data-feather="message-circle"></i>
                                </a>
                            </li>
                            <li>
                                <a data-left-sidebar="friends" href="#" data-toggle="tooltip"
                                    title="Friends" data-placement="right">
                                    <span className="badge badge-danger"></span>
                                    <i data-feather="user"></i>
                                </a>
                            </li>
                            <li>
                                <a data-left-sidebar="favorites" data-toggle="tooltip" title="Favorites" data-placement="right"
                                    href="#">
                                    <i data-feather="star"></i>
                                </a>
                            </li>
                            <li className="brackets">
                                <a data-left-sidebar="archived" href="#" data-toggle="tooltip"
                                    title="Archived" data-placement="right">
                                    <i data-feather="archive"></i>
                                </a>
                            </li>
                            <li className="d-none d-lg-block" data-toggle="tooltip" title="Settings" data-placement="right">
                                <a href="#" data-toggle="modal" data-right-sidebar="settings">
                                    <i data-feather="settings"></i>
                                </a>
                            </li>
                            <li data-toggle="tooltip" title="User menu" data-placement="right">
                                <a href="./login.html" data-intro-js="3" data-toggle="dropdown">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar9.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item" data-toggle="modal" data-target="#editProfile">Edit
                                        profile</a>
                                    <a href="#" className="dropdown-item" data-right-sidebar="user-profile">Profile</a>
                                    <a href="#" className="dropdown-item" data-toggle="modal" data-target="#settingsModal">Settings</a>
                                    <a href="#" className="dropdown-item d-none d-md-block example-app-tour-start">Start Tour</a>
                                    <div className="dropdown-divider"></div>
                                    <a href="login.html" className="dropdown-item text-danger">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* <!-- ./ navigation --> */}

                {/* <!-- Chat left sidebar --> */}
                <div id="chats" className="left-sidebar open">
                    <div className="left-sidebar-header">
                        <div className="story-block">
                            <h4 className="mb-4">Stories</h4>
                            <div className="story-items mb-4" data-intro-js="4">
                                <div className="story-item">
                                    <a href="#" className="avatar avatar-border-primary">
                                        <span className="avatar-title bg-info rounded-circle">M</span>
                                        <span className="story-content">Matteo Reedy</span>
                                    </a>
                                </div>
                                <div className="story-item">
                                    <a href="#" className="avatar avatar-border-success">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                        <span className="story-content">Meredith Dyet</span>
                                    </a>
                                </div>
                                <div className="story-item">
                                    <a href="#" className="avatar avatar-border-primary">
                                        <span className="avatar-title bg-success rounded-circle">C</span>
                                        <span className="story-content">Cesar Weems</span>
                                    </a>
                                </div>
                                <div className="story-item">
                                    <a href="#" className="avatar">
                                        <img src="./dist/media/img/avatar2.jpg" className="rounded-circle" alt="image" />
                                        <span className="story-content">Pansy Coghill</span>
                                    </a>
                                </div>
                                <div className="story-item">
                                    <a href="#" className="avatar">
                                        <img src="./dist/media/img/avatar7.jpg" className="rounded-circle" alt="image" />
                                        <span className="story-content">Cullen Scyone</span>
                                    </a>
                                </div>
                                <div className="story-item">
                                    <a href="#" className="avatar">
                                        <img src="./dist/media/img/avatar1.jpg" className="rounded-circle" alt="image" />
                                        <span className="story-content">North Boorer</span>
                                    </a>
                                </div>
                                <div className="story-item">
                                    <a href="#" className="avatar">
                                        <img src="./dist/media/img/avatar9.jpg" className="rounded-circle" alt="image" />
                                        <span className="story-content">Dilan Maasze</span>
                                    </a>
                                </div>
                                <div className="story-item">
                                    <a href="#" className="avatar">
                                        <img src="./dist/media/img/avatar5.jpg" className="rounded-circle" alt="image" />
                                        <span className="story-content">Antons Cornier</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <form>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn" type="button">
                                        <i className="ti-search"></i>
                                    </button>
                                </div>
                                <input type="text" className="form-control" placeholder="Search chats"/>
                            </div>
                        </form>
                    </div>
                    <div className="left-sidebar-content">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item active">
                                <div>
                                    <figure className="avatar mr-3">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Maribel Mallon</h5>
                                        <p>I sent you all the files. Good luck with 😃</p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">11:05 AM</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile" className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li data-intro-js="5" className="list-group-item unread-chat">
                                <figure className="avatar avatar-state-success mr-3">
                                    <span className="avatar-title bg-secondary rounded-circle">T</span>
                                </figure>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Townsend Seary</h5>
                                        <p>What's up, how are you?</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="new-message-count">3</div>
                                        <small>03:41 PM</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile" className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item unread-chat">
                                <figure className="avatar avatar-state-warning mr-3">
                                    <img src="./dist/media/img/avatar4.jpg" className="rounded-circle" alt="image" />
                                </figure>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Forest Kroch</h5>
                                        <p>
                                            <i className="mdi mdi-camera mr-1"></i> Photo
                                        </p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="new-message-count">1</div>
                                        <small>Yesterday</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile" className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Margaretta Worvell</h5>
                                        <p>
                                            <i className="mdi mdi-check-all text-info mr-1"></i> I need you today. Can you
                                            come with me?
                                        </p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">03:41 PM</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile" className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <figure className="avatar mr-3">
                                    <span className="avatar-title bg-warning bg-success rounded-circle">
                                        <i className="mdi mdi-account-group-outline"></i>
                                    </span>
                                </figure>
                                <div className="users-list-body">
                                    <div>
                                        <h5>😍 Business Group</h5>
                                        <p><strong>Maher Ruslandi: </strong>Hello!!!</p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">Yesterday</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Leave group</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar avatar-state-warning mr-3">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Jennica Kindred</h5>
                                        <p>
                                            <i className="mdi mdi-video-outline mr-1"></i>
                                            Video
                                        </p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">03:41 PM</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <span className="avatar-title bg-info rounded-circle">M</span>
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Marvin Rohan</h5>
                                        <p>
                                            <i className="mdi mdi-microphone mr-1"></i>
                                            Sent audio file
                                        </p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">Yesterday</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <img src="./dist/media/img/avatar7.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Townsend Seary</h5>
                                        <p>Where are you?</p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">03:41 PM</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <span className="avatar-title bg-secondary rounded-circle">G</span>
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Gibb Ivanchin</h5>
                                        <p>I want to visit them.</p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">03:41 PM</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <img src="./dist/media/img/avatar1.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Harald Kowalski</h5>
                                        <p>Reports are ready.</p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">03:41 PM</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <span className="avatar-title bg-success rounded-circle">A</span>
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Afton McGilvra</h5>
                                        <p>I do not know where is it. Don't ask me, please.</p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">03:41 PM</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <img src="./dist/media/img/avatar2.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Alexandr Donnelly</h5>
                                        <p>Can anyone enter the meeting?</p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">03:41 PM</small>
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <a href="#" className="dropdown-item">Add to archive</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger example-delete-chat">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <!-- ./ Chat left sidebar --> */}

                {/* <!-- Friends left sidebar --> */}
                <div id="friends" className="left-sidebar">
                    <div className="left-sidebar-header">
                        <form>
                            <h4 className="mb-4">Friends</h4>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn" type="button">
                                        <i className="ti-search"></i>
                                    </button>
                                </div>
                                <input type="text" className="form-control" placeholder="Search friends"/>
                            </div>
                        </form>
                    </div>
                    <div className="left-sidebar-content">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <img src="./dist/media/img/avatar9.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Harrietta Souten</h5>
                                        <p>Dental Hygienist</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar avatar-state-warning mr-3">
                                        <span className="avatar-title bg-success rounded-circle">A</span>
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Aline McShee</h5>
                                        <p>Marketing Assistant</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar avatar-state-success mr-3">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Brietta Blogg</h5>
                                        <p>Actuary</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar avatar-state-success mr-3">
                                        <img src="./dist/media/img/avatar3.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Karl Hubane</h5>
                                        <p>Chemical Engineer</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <img src="./dist/media/img/avatar2.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Jillana Tows</h5>
                                        <p>Project Manager</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar avatar-state-success mr-3">
                                        <span className="avatar-title bg-info rounded-circle">AD</span>
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Alina Derington</h5>
                                        <p>Nurse</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar avatar-state-secondary mr-3">
                                        <span className="avatar-title bg-warning rounded-circle">S</span>
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Stevy Kermeen</h5>
                                        <p>Associate Professor</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <img src="./dist/media/img/avatar1.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Stevy Kermeen</h5>
                                        <p>Senior Quality Engineer</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar mr-3">
                                        <img src="./dist/media/img/avatar5.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Gloriane Shimmans</h5>
                                        <p>Web Designer</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <figure className="avatar avatar-state-warning mr-3">
                                        <span className="avatar-title bg-secondary rounded-circle">B</span>
                                    </figure>
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Bernhard Perrett</h5>
                                        <p>Software Engineer</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">New chat</a>
                                                    <a href="#" data-right-sidebar="user-profile"
                                                        className="dropdown-item">Profile</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <!-- ./ Friends left sidebar --> */}

                {/* <!-- Favorites left sidebar --> */}
                <div id="favorites" className="left-sidebar">
                    <div className="left-sidebar-header">
                        <form>
                            <h4 className="mb-4">Favorites</h4>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn" type="button">
                                        <i className="ti-search"></i>
                                    </button>
                                </div>
                                <input type="text" className="form-control" placeholder="Search favorites" />
                            </div>
                        </form>
                    </div>
                    <div className="left-sidebar-content">
                        <ul className="list-group list-group-flush users-list">
                            <li className="list-group-item">
                                <div className="users-list-body">
                                    <div>
                                        <h5>Jennica Kindred</h5>
                                        <p>I know how important this file is to you. You can trust me ;</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" className="dropdown-item">Remove favorites</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="users-list-body">
                                    <div>
                                        <h5>Marvin Rohan</h5>
                                        <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" className="dropdown-item">Remove favorites</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="users-list-body">
                                    <div>
                                        <h5>Frans Hanscombe</h5>
                                        <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" className="dropdown-item">Remove favorites</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="users-list-body">
                                    <div>
                                        <h5>Karl Hubane</h5>
                                        <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" className="dropdown-item">Remove favorites</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <!-- ./ Favorites left sidebar --> */}

                {/* <!-- Archived left sidebar --> */}
                <div id="archived" className="left-sidebar">
                    <div className="left-sidebar-header">
                        <form>
                            <h4 className="mb-4">Archived</h4>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn" type="button">
                                        <i className="ti-search"></i>
                                    </button>
                                </div>
                                <input type="text" className="form-control" placeholder="Search archived" />
                            </div>
                        </form>
                    </div>
                    <div className="left-sidebar-content">
                        <ul className="list-group list-group-flush users-list">
                            <li className="list-group-item">
                                <figure className="avatar mr-3">
                                    <span className="avatar-title bg-danger rounded-circle">M</span>
                                </figure>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Mercedes Pllu</h5>
                                        <p>I know how important this file is to you. You can trust me ;)</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" className="dropdown-item">Restore</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <figure className="avatar mr-3">
                                    <span className="avatar-title bg-secondary rounded-circle">R</span>
                                </figure>
                                <div className="users-list-body">
                                    <div>
                                        <h5>Rochelle Golley</h5>
                                        <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                                    </div>
                                    <div className="users-list-action">
                                        <div className="action-toggle">
                                            <div className="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Open</a>
                                                    <a href="#" className="dropdown-item">Restore</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a href="#" className="dropdown-item text-danger">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <!-- ./ Archived left sidebar --> */}

                {/* <!-- chat --> */}
                <div className="chat">
                    <div className="chat-preloader d-none">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="no-message-container">
                        <div className="row mb-5">
                            <div className="col-md-4 offset-4">
                                <img src="./dist/media/svg/chat_empty.svg" className="img-fluid" alt="image" />
                            </div>
                        </div>
                        <p className="lead">Choose a chat or start a <a href="#" data-left-sidebar="friends">new chat</a>.</p>
                    </div>
                    <div className="chat-header">
                        <div className="chat-header-user">
                            <figure className="avatar avatar-state-success">
                                <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Maribel Mallon</h5>
                                <small className="text-success">Online</small>
                            </div>
                        </div>
                        <div className="chat-header-action">
                            <ul className="list-inline" data-intro-js="7">
                                <li className="list-inline-item d-inline d-lg-none">
                                    <a href="#" className="btn btn-danger btn-floating example-chat-close">
                                        <i className="mdi mdi-arrow-left"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item" data-toggle="tooltip" title="Voice call">
                                    <a href="#" className="btn btn-info btn-floating" data-right-sidebar="notifications">
                                        <i className="mdi mdi-bell-outline"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item" data-toggle="tooltip" title="Voice call">
                                    <a href="#" className="btn btn-success btn-floating voice-call-request">
                                        <i className="mdi mdi-phone"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item" data-toggle="tooltip" title="Video call">
                                    <a href="#" className="btn btn-warning btn-floating video-call-request">
                                        <i className="mdi mdi-video-outline"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-dark btn-floating" data-toggle="dropdown">
                                        <i className="mdi mdi-dots-horizontal"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a href="#" data-right-sidebar="user-profile" className="dropdown-item">Profile</a>
                                        <a href="#" className="dropdown-item example-close-selected-chat">Close chat</a>
                                        <a href="#" className="dropdown-item">Add to archive</a>
                                        <a href="#" className="dropdown-item example-delete-chat">Delete</a>
                                        <div className="dropdown-divider"></div>
                                        <a href="#" className="dropdown-item text-danger example-block-user">Block</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="chat-body">
                        <div className="messages">
                            <div className="message-item in">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Maribel Mallon</h5>
                                        <div className="time">10:12 PM</div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="message-text">Hello, Blondy Neeson 😃</div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item in">
                                <div className="message-content">
                                    <div className="message-text">How do you feel today? I want to ask you something.</div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item out">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar9.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Matteo Reedy</h5>
                                        <div className="time">01:20 PM <i className="mdi mdi-check-all text-info ml-1"></i></div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="message-text">
                                        Hello 😃
                                        <br />
                                        <br />
                                        All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as
                                        necessary, making this the first true generator on the Internet. It uses a dictionary of
                                        over 200 Latin words, combined with a handful of model sentence structures, to generate
                                        Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free
                                        from repetition, injected humour, or non-characteristic words etc.
                                    </div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item in">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Maribel Mallon</h5>
                                        <div className="time">10:43 AM</div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <audio controls>
                                        <source src="https://www.w3schools.com/tags/horse.ogg" type="audio/ogg" />
                                        <source src="https://www.w3schools.com/tags/horse.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item out">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar9.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Matteo Reedy</h5>
                                        <div className="time">
                                            10:43 AM
                                            <i className="mdi mdi-check-all text-info ml-1"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <audio controls>
                                        <source src="https://www.w3schools.com/tags/horse.ogg" type="audio/ogg" />
                                        <source src="https://www.w3schools.com/tags/horse.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item out">
                                <div className="message-content">
                                    <div className="message-text">You are good ❤❤</div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item in">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Maribel Mallon</h5>
                                        <div className="time">11:59 PM</div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="message-text">I want to send you a file.</div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item in">
                                <div className="message-content message-file">
                                    <div className="message-text d-flex">
                                        <div className="file-icon">
                                            <i className="mdi mdi-file-pdf-box-outline"></i>
                                        </div>
                                        <div>
                                            <div>test-filename.pdf <small className="text-muted small">(50KB)</small></div>
                                            <ul className="list-inline mt-2">
                                                <li className="list-inline-item mb-0">
                                                    <a href="#" className="btn btn-sm btn-light-success btn-floating" title="View">
                                                        <i className="mdi mdi-link"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item mb-0">
                                                    <a href="#" className="btn btn-sm btn-light-success btn-floating"
                                                        title="Download">
                                                        <i className="mdi mdi-download"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item messages-divider sticky-top" data-label="Yesterday"></div>
                            <div className="message-item out">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar9.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Matteo Reedy</h5>
                                        <div className="time">07:45 AM <i className="mdi mdi-check-all text-info ml-1"></i></div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="message-text">Thank you so much. These files are very important to me. I guess
                                        you didn't make any changes
                                        to these files. So I need the original versions of these files. Thank you very much
                                        again.
                                    </div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item in">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Maribel Mallon</h5>
                                        <div className="time">07:15 AM</div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="message-text">I'm about to send the other file now.</div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item out">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar9.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Matteo Reedy</h5>
                                        <div className="time">07:45 AM <i className="mdi mdi-check-all text-info ml-1"></i></div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div>
                                        <div className="message-content-images">
                                            <a href="./dist/media/img/image1.jpg" data-fancybox="images">
                                                <img src="./dist/media/img/image1.jpg" alt="image" />
                                            </a>
                                            <a href="./dist/media/img/image2.jpg" data-fancybox="images">
                                                <img src="./dist/media/img/image2.jpg" alt="image" />
                                            </a>
                                            <a href="./dist/media/img/image3.jpg" data-fancybox="images">
                                                <img src="./dist/media/img/image3.jpg" alt="image" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item in">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Maribel Mallon</h5>
                                        <div className="time">08:00 AM</div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="message-text">I thank you. We are glad to help you. 😃</div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item out">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar9.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Matteo Reedy</h5>
                                        <div className="time">09:23 AM <i className="mdi mdi-check-all text-info ml-1"></i></div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
                                        exercitationem inventore
                                        quaerat quos repellendus sunt? Assumenda dolor earum optio quis?
                                    </div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item out">
                                <div className="message-content">
                                    <div className="message-text">😃 😃 ❤ ❤</div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item in">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Maribel Mallon</h5>
                                        <div className="time">08:00 AM</div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="video-block">
                                        <a data-fancybox
                                            href="https://www.youtube.com/watch?v=c5nhWy7Zoxg&list=PLmUBwxvdqHq-2La24tH5J55DwBdUwZnoI&ab_channel=FrameStockFootages">
                                            <i className="mdi mdi-play-circle-outline"></i>
                                        </a>
                                    </div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item messages-divider" data-label="1 message unread"></div>
                            <div className="message-item in">
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src="./dist/media/img/avatar6.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <h5>Maribel Mallon</h5>
                                        <div className="time">11:05 AM</div>
                                    </div>
                                </div>
                                <div className="message-content">
                                    <div className="message-text">I sent you all the files. Good luck with 😃</div>
                                    <div className="dropdown">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#" className="dropdown-item">Reply</a>
                                            <a href="#" className="dropdown-item">Forward</a>
                                            <a href="#" className="dropdown-item">Copy</a>
                                            <a href="#" className="dropdown-item">Starred</a>
                                            <a href="#" className="dropdown-item example-delete-message">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="message-item in in-typing">
                                <div className="message-content">
                                    <div className="message-text">
                                        <div className="writing-animation">
                                            <div className="writing-animation-line"></div>
                                            <div className="writing-animation-line"></div>
                                            <div className="writing-animation-line"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-footer" data-intro-js="6">
                        <form className="d-flex">
                            <div className="dropdown">
                                <button className="btn btn-light-info btn-floating mr-3" data-toggle="dropdown" title="Emoji"
                                    type="button">
                                    <i className="mdi mdi-face"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-big p-0">
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
                            <div className="dropdown">
                                <button className="btn btn-light-info btn-floating mr-3" data-toggle="dropdown" title="Emoji"
                                    type="button">
                                    <i className="mdi mdi-plus"></i>
                                </button>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Location</a>
                                    <a href="#" className="dropdown-item">Attach</a>
                                    <a href="#" className="dropdown-item">Document</a>
                                    <a href="#" className="dropdown-item">File</a>
                                    <a href="#" className="dropdown-item">Video</a>
                                </div>
                            </div>
                            <input type="text" className="form-control form-control-main" placeholder="Write a message." />
                            <div>
                                <button className="btn btn-primary ml-2 btn-floating" type="submit">
                                    <i className="mdi mdi-send"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <!-- ./ chat --> */}

                {/* <!-- ./ layout --> */}
            </div>
            {/* <!-- Notifications --> */}
            <div className="right-sidebar" id="notifications">
                <div className="right-sidebar-header">
                    <span className="right-sidebar-title">Notifications</span>
                    <a data-right-sidebar="settings" title="Settings" href="#">
                        <i className="mdi mdi-cog"></i>
                    </a>
                    <a href="#" className="right-sidebar-close">
                        <i className="mdi mdi-close"></i>
                    </a>
                </div>
                <div className="right-sidebar-content">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                            <div className="d-flex">
                                <figure className="avatar avatar-state-warning mr-3">
                                    <span className="avatar-title bg-info-bright text-info rounded-circle">
                                        <i className="mdi mdi-server"></i>
                                    </span>
                                </figure>
                                <div>
                                    <div>You joined a group</div>
                                    <span className="text-muted small">
                                        <i className="mdi mdi-clock-outline small mr-1"></i> Today
                                    </span>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="#" className="dropdown-item">Unread</a>
                                    <a href="#" className="dropdown-item">Detail</a>
                                    <a href="#" className="dropdown-item">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                            <div className="d-flex">
                                <figure className="avatar avatar-state-warning mr-3">
                                    <span className="avatar-title bg-warning-bright text-warning rounded-circle">
                                        <i className="mdi mdi-server"></i>
                                    </span>
                                </figure>
                                <div>
                                    <div>Storage is running low!</div>
                                    <span className="text-muted small">
                                        <i className="mdi mdi-clock-outline small mr-1"></i> Today
                                    </span>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="#" className="dropdown-item">Unread</a>
                                    <a href="#" className="dropdown-item">Detail</a>
                                    <a href="#" className="dropdown-item">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                            <div className="d-flex">
                                <figure className="avatar mr-3">
                                    <span className="avatar-title bg-secondary-bright text-secondary rounded-circle">
                                        <i className="mdi mdi-file-document-outline"></i>
                                    </span>
                                </figure>
                                <div>
                                    <div>1 person sent a file</div>
                                    <span className="text-muted small">
                                        <i className="mdi mdi-clock-outline small mr-1"></i> 50 min ago
                                    </span>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="#" className="dropdown-item">Unread</a>
                                    <a href="#" className="dropdown-item">Detail</a>
                                    <a href="#" className="dropdown-item">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                            <div className="d-flex">
                                <figure className="avatar mr-3">
                                    <span className="avatar-title bg-success-bright text-success rounded-circle">
                                        <i className="mdi mdi-download"></i>
                                    </span>
                                </figure>
                                <div>
                                    <div>Reports ready to download</div>
                                    <span className="text-muted small">
                                        <i className="mdi mdi-clock-outline small mr-1"></i> 5 hour ago
                                    </span>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="#" className="dropdown-item">Unread</a>
                                    <a href="#" className="dropdown-item">Detail</a>
                                    <a href="#" className="dropdown-item">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                            <div className="d-flex">
                                <figure className="avatar mr-3">
                                    <span className="avatar-title bg-info-bright text-info rounded-circle">
                                        <i className="mdi mdi-lock"></i>
                                    </span>
                                </figure>
                                <div>
                                    <div>2 steps verification</div>
                                    <span className="text-muted small">
                                        <i className="mdi mdi-clock-outline small mr-1"></i> Yesterday
                                    </span>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="#" className="dropdown-item">Unread</a>
                                    <a href="#" className="dropdown-item">Detail</a>
                                    <a href="#" className="dropdown-item">Delete</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <!-- ./ Notifications --> */}

            {/* <!-- User profile --> */}
            <div className="right-sidebar" id="user-profile">
                <div className="right-sidebar-header with-tab-menu">
                    <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                                aria-controls="home" aria-selected="true">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                                aria-controls="profile" aria-selected="false">Media</a>
                        </li>
                    </ul>
                    <a href="#" className="right-sidebar-close">
                        <i className="mdi mdi-window-close"></i>
                    </a>
                </div>
                <div className="right-sidebar-content">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="text-center mb-4">
                                <figure className="avatar avatar-xl mb-4">
                                    <img src="./dist/media/img/avatar9.jpg" className="rounded-circle" alt="image" />
                                </figure>
                                <h5 className="mb-1">Matteo Reedy</h5>
                                <small className="text-muted font-italic">Last seen: Today</small>
                            </div>
                            <p className="text-muted">Lorem ipsum is a pseudo-Latin text used in web design, typography,
                                layout, and printing in place of English to emphasise design elements over content.
                                It's also called placeholder (or filler) text. It's a convenient tool for
                                mock-ups.</p>
                            <div className="mt-4 mb-4">
                                <h6>Phone</h6>
                                <p className="text-muted">(555) 555 55 55</p>
                            </div>
                            <div className="mt-4 mb-4">
                                <h6>City</h6>
                                <p className="text-muted">Germany / Berlin</p>
                            </div>
                            <div className="mt-4 mb-4">
                                <h6>Website</h6>
                                <p>
                                    <a href="#">www.franshanscombe.com</a>
                                </p>
                            </div>
                            <div className="mt-4 mb-4">
                                <h6 className="mb-3">Social media accounts</h6>
                                <ul className="list-inline social-links">
                                    <li className="list-inline-item">
                                        <a href="#" className="btn btn-floating btn-facebook"
                                            data-toggle="tooltip" title="Facebook">
                                            <i className="mdi mdi-facebook"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="btn btn-floating btn-twitter"
                                            data-toggle="tooltip" title="Twitter">
                                            <i className="mdi mdi-twitter"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="btn btn-floating btn-instagram"
                                            data-toggle="tooltip" title="Instagram">
                                            <i className="mdi mdi-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-4 mb-4">
                                <h6 className="mb-3">Settings</h6>
                                <div className="form-group">
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch11" />
                                        <label className="custom-control-label" htmlFor="customSwitch11">Block</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" checked={false}
                                            id="customSwitch12" />
                                        <label className="custom-control-label" htmlFor="customSwitch12">Mute</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch13" />
                                        <label className="custom-control-label" htmlFor="customSwitch13">Get
                                            notification</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                                        <div>
                                            <figure className="avatar avatar-sm mr-2">
                                                <span className="avatar-title bg-danger rounded-circle">
                                                    <i className="mdi mdi-file-pdf-box-outline"></i>
                                                </span>
                                            </figure>
                                            report4221.pdf
                                        </div>
                                        <div className="dropdown">
                                            <a href="#" data-toggle="dropdown">
                                                <i className="mdi mdi-dots-horizontal"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a href="#" className="dropdown-item">Forward</a>
                                                <a href="#" className="dropdown-item">Download</a>
                                                <a href="#" className="dropdown-item">Delete</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                                        <div>
                                            <figure className="avatar avatar-sm mr-2">
                                                <span className="avatar-title bg-secondary rounded-circle">
                                                    <i className="mdi mdi-image"></i>
                                                </span>
                                            </figure>
                                            avatar_image.png
                                        </div>
                                        <div className="dropdown">
                                            <a href="#" data-toggle="dropdown">
                                                <i className="mdi mdi-dots-horizontal"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a href="#" className="dropdown-item">Forward</a>
                                                <a href="#" className="dropdown-item">Download</a>
                                                <a href="#" className="dropdown-item">Delete</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                                        <div>
                                            <figure className="avatar avatar-sm mr-2">
                                                <span className="avatar-title bg-success rounded-circle">
                                                    <i className="mdi mdi-file-excel-box-outline"></i>
                                                </span>
                                            </figure>
                                            excel_report_file2020.xlsx
                                        </div>
                                        <div className="dropdown">
                                            <a href="#" data-toggle="dropdown">
                                                <i className="mdi mdi-dots-horizontal"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a href="#" className="dropdown-item">Forward</a>
                                                <a href="#" className="dropdown-item">Download</a>
                                                <a href="#" className="dropdown-item">Delete</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                                        <div>
                                            <figure className="avatar avatar-sm mr-2">
                                                <span className="avatar-title bg-info rounded-circle">
                                                    <i className="mdi mdi-file-document-outline"></i>
                                                </span>
                                            </figure>
                                            articles342133.txt
                                        </div>
                                        <div className="dropdown">
                                            <a href="#" data-toggle="dropdown">
                                                <i className="mdi mdi-dots-horizontal"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a href="#" className="dropdown-item">Forward</a>
                                                <a href="#" className="dropdown-item">Download</a>
                                                <a href="#" className="dropdown-item">Delete</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ./ User profile --> */}

            {/* <!-- Settings --> */}
            <div className="right-sidebar" id="settings">
                <div className="right-sidebar-header">
                    <span className="right-sidebar-title">Settings</span>
                    <a href="#" className="right-sidebar-close">
                        <i className="mdi mdi-window-close"></i>
                    </a>
                </div>
                <div className="right-sidebar-content">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item py-3 px-0">
                            <div className="form-item custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" checked id="customSwitch14" />
                                <label className="custom-control-label" htmlFor="customSwitch14">Allow connected contacts</label>
                            </div>
                        </li>
                        <li className="list-group-item py-3 px-0">
                            <div className="form-item custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" checked id="customSwitch15" />
                                <label className="custom-control-label" htmlFor="customSwitch15">Confirm message requests</label>
                            </div>
                        </li>
                        <li className="list-group-item py-3 px-0">
                            <div className="form-item custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" checked id="customSwitch16" />
                                <label className="custom-control-label" htmlFor="customSwitch16">Profile privacy</label>
                            </div>
                        </li>
                        <li className="list-group-item py-3 px-0">
                            <div className="form-item custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" id="customSwitch17" />
                                <label className="custom-control-label" htmlFor="customSwitch17">Developer mode options</label>
                            </div>
                        </li>
                        <li className="list-group-item py-3 px-0">
                            <div className="form-item custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" checked id="customSwitch18" />
                                <label className="custom-control-label" htmlFor="customSwitch18">Two-step security
                                    verification</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <!-- ./ Settings --> */}

            {/* <!-- disconnected modal --> */}
            <div className="modal fade" id="disconnected" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-zoom" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row mb-5">
                                <div className="col-md-6 offset-3">
                                    <img src="./dist/media/svg/undraw_warning_cyit.svg" className="img-fluid" alt="image" />
                                </div>
                            </div>
                            <p className="lead text-center">Application disconnected</p>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-primary">Reconnect</button>
                            <a href="login.html" className="btn btn-link">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ./ disconnected modal --> */}

            {/* <!-- voice call modal --> */}
            <div className="modal fade" id="voiceCallRequest" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                    <div className="modal-content call-request">
                        <div className="modal-body">
                            <figure className="avatar avatar-xl">
                                <img src="./dist/media/img/avatar4.jpg" className="rounded-circle" alt="image" />
                            </figure>
                            <h4 className="my-4">Brietta Blogg <span className="text-success">calling...</span></h4>
                            <div className="call-action-button">
                                <button type="button" className="btn btn-danger btn-floating btn-lg" data-dismiss="modal">
                                    <i className="mdi mdi-phone-cancel"></i>
                                </button>
                                <button type="button" className="btn btn-success btn-pulse btn-floating btn-lg voice-call-accept">
                                    <i className="mdi mdi-phone-check"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ./ voice call modal --> */}

            {/* <!-- voice call modal --> */}
            <div className="modal voice-call fade" id="voiceCall" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                    <div className="modal-content">
                        <div className="modal-body" style={{ background: "url(./dist/media/img/avatar2.jpg)" }}>
                            <figure className="avatar mb-4 avatar-state-success avatar-xl">
                                <img src="./dist/media/img/avatar2.jpg" className="rounded-circle" alt="image" />
                            </figure>
                            <div className="mb-2 font-weight-bold lead">Brietta Blogg</div>
                            <div className="mb-4 chat-stopwatch">00:00:00</div>
                            <div className="call-action-button">
                                <button type="button" className="btn btn-pulse btn-floating btn-lg mute-event" data-toggle="tooltip"
                                    title="Turn on / off sound">
                                    <i data-feather="volume-2"></i>
                                </button>
                                <button type="button" className="btn btn-danger btn-floating btn-lg" data-toggle="tooltip"
                                    title="Stop talking" data-dismiss="modal">
                                    <i className="mdi mdi-close"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ./ voice call modal --> */}

            {/* <!-- voice call modal --> */}
            <div className="modal fade" id="videoCallRequest" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                    <div className="modal-content call-request">
                        <div className="modal-body">
                            <figure className="avatar avatar-xl">
                                <img src="./dist/media/img/avatar2.jpg" className="rounded-circle" alt="image" />
                            </figure>
                            <h4 className="my-4">Brietta Blogg <span className="text-success">calling...</span></h4>
                            <div className="call-action-button">
                                <button type="button" className="btn btn-danger btn-floating btn-lg" data-dismiss="modal">
                                    <i className="mdi mdi-video-minus-outline"></i>
                                </button>
                                <button type="button"
                                    className="btn btn-success btn-pulse btn-floating btn-lg video-call-request-accept">
                                    <i className="mdi mdi-video-check-outline"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ./ voice call modal --> */}

            {/* <!-- video call modal --> */}
            <div className="modal call fade" id="videoCall" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-zoom" role="document">
                    <div className="modal-content">
                        <div className="modal-body" style={{ background: "url(./dist/media/img/video-call.jpg)" }}>
                            <div className="call-time chat-stopwatch">00:00:00</div>
                            <div className="call-action">
                                <div className="call-action-button">
                                    <button type="button" className="btn btn-pulse btn-floating btn-lg mute-event" data-toggle="tooltip"
                                        data-placement="right" title="Turn on / off sound">
                                        <i data-feather="volume-2"></i>
                                    </button>
                                    <button type="button" className="btn btn-danger btn-floating btn-lg" data-toggle="tooltip"
                                        data-placement="right" title="Stop talking" data-dismiss="modal">
                                        <i className="mdi mdi-close"></i>
                                    </button>
                                </div>
                                <div className="call-users">
                                    <figure className="avatar" data-toggle="tooltip" data-placement="left" title="Margaretta Worvell">
                                        <img src="./dist/media/img/avatar2.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <figure className="avatar" data-toggle="tooltip" data-placement="left" title="Matteo Reedy">
                                        <span className="avatar-title bg-info rounded-circle">M</span>
                                    </figure>
                                    <figure className="avatar" data-toggle="tooltip" data-placement="left" title="Townsend Seary">
                                        <img src="./dist/media/img/avatar1.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                            <img src="./dist/media/img/avatar4.jpg" className="rounded-circle" alt="image" />
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
                                            <img src="./dist/media/img/avatar10.jpg" className="rounded-circle" alt="image" />
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
                                            <img src="./dist/media/img/avatar8.jpg" className="rounded-circle" alt="image" />
                                        </figure>
                                        <figure className="avatar" data-toggle="tooltip" title="Marlee Perazzo">
                                            <span className="avatar-title bg-warning rounded-circle">M</span>
                                        </figure>
                                        <figure className="avatar" data-toggle="tooltip" title="Stafford Pioch">
                                            <img src="./dist/media/img/avatar1.jpg" className="rounded-circle" alt="image" />
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
                                                            <img src="./dist/media/img/avatar1.jpg"
                                                                className="rounded-circle" alt="image" />
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
                                        <input type="checkbox" className="custom-control-input" checked id="customSwitch1" />
                                        <label className="custom-control-label" htmlFor="customSwitch1">Allow connected contacts</label>
                                    </div>
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" checked id="customSwitch2" />
                                        <label className="custom-control-label" htmlFor="customSwitch2">Confirm message requests</label>
                                    </div>
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" checked id="customSwitch3" />
                                        <label className="custom-control-label" htmlFor="customSwitch3">Profile privacy</label>
                                    </div>
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch4" />
                                        <label className="custom-control-label" htmlFor="customSwitch4">Developer mode options</label>
                                    </div>
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" checked id="customSwitch5" />
                                        <label className="custom-control-label" htmlFor="customSwitch5">Two-step security
                                            verification</label>
                                    </div>
                                </div>
                                <div className="tab-pane" id="notification" role="tabpanel">
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" checked id="customSwitch6" />
                                        <label className="custom-control-label" htmlFor="customSwitch6">Allow mobile notifications</label>
                                    </div>
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch7" />
                                        <label className="custom-control-label" htmlFor="customSwitch7">Notifications from your
                                            friends</label>
                                    </div>
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch8" />
                                        <label className="custom-control-label" htmlFor="customSwitch8">Send notifications by email</label>
                                    </div>
                                </div>
                                <div className="tab-pane" id="contact" role="tabpanel">
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch9" />
                                        <label className="custom-control-label" htmlFor="customSwitch9">Suggest changing passwords every
                                            month.</label>
                                    </div>
                                    <div className="form-item custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" checked id="customSwitch10" />
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
                                                        <img src="./dist/media/img/avatar4.jpg" className="rounded-circle"
                                                            alt="image" />
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
                                            <input type="checkbox" className="custom-control-input" checked id="customCheck1" />
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

            {/* <!-- Bundle scripts --> */}
            <script src="dist/vendor/bundle.js"></script>

            {/* <!-- Feather icons --> */}
            <script src="./dist/icons/feather/feather.min.js"></script>

            {/* <!-- Slick --> */}
            <script src="dist/vendor/slick/slick.min.js"></script>

            {/* <!-- Fancybox --> */}
            <script src="dist/vendor/fancybox/jquery.fancybox.min.js"></script>

            {/* <!-- Intro js --> */}
            <script src="dist/vendor/introjs/intro.js"></script>

            {/* <!-- Jquery Stopwatch --> */}
            <script src="dist/vendor/jquery.stopwatch.js"></script>

            {/* <!-- Sweetalert2 --> */}
            <script src="dist/vendor/sweetalert2.js"></script>

            {/* <!-- App scripts --> */}
            <script src="./dist/js/app.min.js"></script>

            {/* <!-- Examples --> */}
            <script src="./dist/js/examples.min.js"></script>
        </main>
    )
}
