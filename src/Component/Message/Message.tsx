import { Dispatch, SetStateAction, useState } from 'react'
import { INotify } from '../../Reducers/UserSlice'
import styles from './Message.module.scss'
import MessageContent from './MessageContent/MessageContent'

interface IMessage {
    setShowMessage: Dispatch<SetStateAction<boolean>>
    notifyData: INotify[] | undefined
}

function Message(props: IMessage) {
    const [all, setAll] = useState<boolean>(true)

    return <div className={`shadow p-3 mb-5 bg-body rounded ${styles.wrapper}`}>
        <div className={styles.header}>
            <div className={`${styles.header_content} h4`}>
                Notifications
            </div>
            <div className={`${styles.status} d-flex pb-2`}>
                <div
                    className={`${styles.status_read} ${all ? styles.focus : undefined}`}
                    onClick={() => {
                        setAll(true)
                    }}
                >All</div>
                <div
                    className={`ms-2 ${styles.status_unRead} ${!all ? styles.focus : undefined}`}
                    onClick={() => {
                        setAll(false)
                    }}
                >Unread</div>
            </div>
        </div>
        <div className={`${styles.content} pt-3 overflow-auto`}>
            {
                props.notifyData && props.notifyData.length
                    ? props.notifyData
                        .filter(item => all || !item.checked)
                        .map((item, index) => {
                            return <MessageContent
                                setShowMessage={props.setShowMessage}
                                key={index}
                                data={item}
                            ></MessageContent>
                        })
                    :
                    <div className='text-center'>You don't have any notify</div>
            }
        </div>
    </div>
}

export default Message