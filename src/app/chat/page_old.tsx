'use client'

import { useSession } from "next-auth/react";
import { ChatBox } from "../../components/chat/chatbox";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useModel } from "@/utils/useModel";

export default function ChatOld() {
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
        return <>Loading</>
    }

    return (
        <>
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
            </main>
        </>
    )
}
