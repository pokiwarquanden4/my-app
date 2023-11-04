import Avatar from '../../Avatar/Avatar'
import styles from './MessageContent.module.scss'

function MessageContent() {
    return <div className={`${styles.wrapper} d-flex align-items-center px-1 py-2`}>
        <div className={styles.avatar}>
            <Avatar size='50' name='avatar' src='https://brocanvas.com/wp-content/uploads/2022/01/hinh-anh-doremon-nam-nghi.jpg'></Avatar>
        </div>
        <div className={`${styles.content} ps-3`}>
            <div className={styles.details}>
                <strong className={`${styles.user} pe-1`}>Nguyễn Hải Phong</strong>
                shared
                <strong className={`${styles.post} ps-1`}>Lốp Minh Phong</strong>
                's post: "Đến thôi chần chừ j nữa
            </div>
        </div>
        <div className={styles.tagUnread}></div>
    </div>
}

export default MessageContent