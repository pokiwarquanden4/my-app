import Modal from 'react-bootstrap/Modal';
import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from 'react';

interface IModalComponent {
    header: string
    children: ReactNode
    visible: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}

function ModalComponent(props: IModalComponent) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.visible)
    }, [props.visible])

    const handleClose = useCallback(() => {
        props.setShow(false)
    }, [props])

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    </>
}

export default ModalComponent