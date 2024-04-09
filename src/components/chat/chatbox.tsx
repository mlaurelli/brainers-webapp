import { AiGirlfriend } from "@/models/ai-girlfriend"
import { useConversation } from "@/utils/useConversation"
import useUser from "@/utils/useUser"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

export type ConversationType = {
    type: 'out' | 'in'
    text: string | null
    image: string | null
    avatar: string
    name: string
    messageId?: string
}

export type AiChatGirlfriendType = {
    id: string
    avatar: string
    name: string
    description: string
}

export const ChatBox = ({ session, conversationId, modelId }: { session: Session, conversationId: string | null, modelId: string }) => {
    const router = useRouter()

    let audioCtx: AudioContext
    let buffer

    const { data: user, isError } = useUser(session.user?.email!)

    if (isError)
        router.replace("/")

    const bottomRef = useRef<HTMLDivElement | null>(null)

    const { getConversation, newConversation, saveMessage, cleanUpChat, generateImageAi: generateImageCallback, chatCompletion, generateVoiceAi } = useConversation()

    const [data, setData] = useState<ConversationType[]>([])
    const modelFromEnv = AiGirlfriend.filter(model => model.id === modelId)[0]

    const model = {
        id: modelFromEnv.id,
        avatar: modelFromEnv.avatar,
        name: modelFromEnv.name,
        description: modelFromEnv.description
    } as AiChatGirlfriendType

    const [message, setMessage] = useState<string>("")
    const [isLoading, setLoading] = useState(false)
    const [source, setSource] = useState<AudioBufferSourceNode | null>(null)
    const [isLoadingVoice, setLoadingVoice] = useState(false)

    useEffect(() => {
        if (user && conversationId) {
            getConversation(user.id, conversationId)
                .then((data) => {
                    setData(data.conversation)
                    setLoading(false)
                })
        }
    }, [user, conversationId])

    const handleGenerateImage = async () => {
        setLoading(true)
        const messageConversationId = conversationId ? conversationId : (await newConversation(user.id, model!.id)).conversationId

        const imageConversation = await generateImageCallback(user.id, model!, messageConversationId)

        const newData = data
        setData(newData.concat(imageConversation))
        router.push(`/chat?chatId=${messageConversationId}`)
        setLoading(false)
    }

    const handlePlayVoice = async (userText: string) => {
        setLoadingVoice(true)
        try {
            // For knowledge
            // https://github.com/mdn/webaudio-examples/blob/main/audio-buffer-source-node/playbackrate/script.js
            audioCtx = new AudioContext()
            const response = await generateVoiceAi(user.id, userText, model!, conversationId!)
            buffer = await audioCtx.decodeAudioData(await response.arrayBuffer())
            let sourceAudio = audioCtx.createBufferSource()
            sourceAudio.buffer = buffer
            sourceAudio.connect(audioCtx.destination)
            sourceAudio.loop = false
            setSource(sourceAudio)

        } catch (err) {
            console.error(`Unable to fetch the audio file. Error: ${err}`);
            alert(`Unable to fetch the audio file, sorry for the issue :(, please contact our admins`);
        }
        setLoadingVoice(false)
    }

    const handleStopVoice = (e: MouseEvent) => {
        try {
            // For knowledge
            // https://github.com/mdn/webaudio-examples/blob/main/audio-buffer-source-node/playbackrate/script.js
            if (source) {
                source.stop()
                setSource(null)
            }

        } catch (err) {
            console.error(`Unable to fetch the audio file. Error: ${err}`);
        }
    }

    const handleMessage = async (event: any) => {
        event.preventDefault()
        setLoading(true)

        const outMessage: ConversationType = {
            type: "out",
            text: message,
            image: null,
            avatar: "/dist/media/img/avatar6.jpg",
            name: "me"
        }

        const messageConversationId = conversationId ? conversationId : (await newConversation(user.id, model!.id)).conversationId

        const outNewdata = data.concat(outMessage)
        setData(outNewdata)

        setMessage("")

        const response = await chatCompletion(user.id, outNewdata, model!, messageConversationId)

        const newDataFromResponse = outNewdata.concat(response)
        setData(newDataFromResponse)
        setLoading(false)
        router.push(`/chat?chatId=${messageConversationId}`)
    }

    const handleCleanUpChat = () => {
        if (confirm("Sei sicuro di voler cancellare la chat?")) {
            if (conversationId) cleanUpChat(user.id, conversationId)
                .then(() => {
                    setData([])
                })
                .catch(() => {
                    alert("Errore durante cancellazione della chat")
                })
        }
    }

    useEffect(() => {
        if (source) source.start()
    }, [source])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [data])

    return (
        <div style={{ padding: 12, paddingBottom: 100 }}>
            <div className="chat" style={{ padding: 0 }}>
                <div className="chat-body">
                    <div className="messages" style={{ height: 450, scrollbarWidth: "none", overflow: "auto" }}>
                        {!data || data.length === 0
                            ? <small>Fai il primo passo e scrivi un messaggio.</small>
                            : data?.map(message =>
                                <div className={`message-item ${message.type}`} key={uuidv4()} >
                                    <div className="message-avatar">
                                        <figure className="avatar avatar-sm">
                                            <img src={message.avatar} className="rounded-circle" alt="image" />
                                        </figure>
                                        <div className="align-middle">
                                            <h5>{message.type === 'in' ? model.name : message.name}</h5>
                                        </div>
                                    </div>
                                    <div className="message-content">
                                        {message.image ?
                                            <div>
                                                <div className="message-content-images">
                                                    <a href={message.image} data-fancybox="images">
                                                        <img src={message.image} onError={() => <i className="mdi-refresh"></i>} alt="image" />
                                                    </a>
                                                </div>
                                            </div>
                                            : <div className="message-text" style={{ scrollbarWidth: "none", overflow: "scroll" }}>{message.text}</div>
                                        }
                                    </div>
                                    <div>
                                        {message.type === 'in' && !message.image ? <>
                                            <button onClick={(e) => handlePlayVoice(message.text!)}>
                                                {isLoadingVoice ?
                                                    <div className="spinner-border" style={{ width: '1em', height: '1em', color: 'white' }} role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    : <i style={{ cursor: 'pointer' }} className="mdi mdi-volume-high"></i>}
                                                <small>Riproduci voce</small>
                                            </button>
                                            <button id="stop" onClick={(e) => handleStopVoice(e)}>
                                                <i style={{ cursor: 'pointer' }} className="mdi mdi-stop"></i>
                                                <small>Stop</small>
                                            </button>
                                        </> : null}
                                    </div>
                                </div>
                            )}
                        {isLoading ? <div className="chat-preloader">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> : null}
                        <div id="bottom-reference" ref={bottomRef} />
                    </div>
                </div>
                <div className="chat-footer">
                    {model ?
                        <form className="d-flex" onSubmit={handleMessage}>
                            <button className="btn btn-warning mr-3" style={{ height: 60 }} onClick={() => handleCleanUpChat()}
                                type="button">
                                Pulisci chat
                            </button>
                            <button className="btn btn-light-info mr-3" style={{ height: 60 }} onClick={() => handleGenerateImage()}
                                type="button">
                                Chiedi una foto
                            </button>
                            <input type="text"
                                className="form-control form-control-main"
                                placeholder="Scrivi un messaggio"
                                value={message}
                                onChange={(e) => setMessage(e.currentTarget.value)} />
                            <div>
                                <button className="btn btn-primary ml-2 btn-floating" type="submit">
                                    <i className="mdi mdi-send"></i>
                                </button>
                            </div>
                        </form>
                        : null}
                </div>
            </div>
        </div>

    )
}