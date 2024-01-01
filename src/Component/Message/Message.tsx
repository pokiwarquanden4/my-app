import { useState } from 'react'
import styles from './Message.module.scss'
import MessageContent from './MessageContent/MessageContent'
import { useAppSelector } from '../../App/hook'

function Message() {
    const [all, setAll] = useState<boolean>(false)
    const notifyData = useAppSelector(store => store.user.notify)

    return <div className={`shadow p-3 mb-5 bg-body rounded ${styles.wrapper}`}>
        <div className={styles.header}>
            <div className={`${styles.header_content} h4`}>
                Notifications
            </div>
            <div className={`${styles.status} d-flex`}>
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
        <div className={`${styles.content} pt-3`}>
            {
                notifyData && notifyData.length
                    ? notifyData
                        .filter(item => all || !item.checked)
                        .map((item, index) => {
                            return <MessageContent
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