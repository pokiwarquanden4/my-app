import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from 'react';

interface IModalComponent {
    header: string
    children: ReactNode
    confirm: string
    visible: boolean
    setLoginShow: Dispatch<SetStateAction<boolean>>
}

function ModalComponent(props: IModalComponent) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.visible)
    }, [props.visible])

    const handleClose = useCallback(() => {
        props.setLoginShow(false)
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