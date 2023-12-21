import { useState } from 'react'
import styles from './Message.module.scss'
import MessageContent from './MessageContent/MessageContent'

function Message() {
    const [status, setStatus] = useState<boolean>(false)

    return <div className={`shadow p-3 mb-5 bg-body rounded ${styles.wrapper}`}>
        <div className={styles.header}>
            <div className={`${styles.header_content} h4`}>
                Notifications
            </div>
            <div className={`${styles.status} d-flex`}>
                <div
                    className={`${styles.status_read} ${status ? styles.focus : undefined}`}
                    onClick={() => {
                        setStatus(true)
                    }}
                >All</div>
                <div
                    className={`ms-2 ${styles.status_unRead} ${!status ? styles.focus : undefined}`}
                    onClick={() => {
                        setStatus(false)
                    }}
                >Unread</div>
            </div>
        </div>
        <div className={`${styles.content} pt-3`}>
            <MessageContent></MessageContent>
        </div>
    </div>
}

export default Message