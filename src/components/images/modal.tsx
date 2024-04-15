import { PropsWithChildren, useState } from "react"
import { Modal } from 'reactstrap'

export const ImageModal = (props: PropsWithChildren<{ id: string, image: string}>) => {
    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)
    return (
        <div id={props.id} onClick={toggleModal}>
            {props.children}
            <Modal isOpen={modal} toggle={toggleModal} {...props}>
                    <img src={props.image} style={{borderRadius: 4}}/>
            </Modal>
        </div>
    )
}