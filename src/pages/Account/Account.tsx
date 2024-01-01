import styles from './Account.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '../../App/hook'
import Avatar from '../../Component/Avatar/Avatar'

function Account() {
    const userData = useAppSelector(store => store.user.data)

    return <div className={styles.wrapper}>
        <div className={`${styles.header} d-flex justify-content-between`}>
            <div className={`d-flex align-items-center ${styles.info}`}>
                <div className={`${styles.avatar} border rounded-3`}>
                    <Avatar
                        name={userData.account}
                        src={userData.avatarURL}
                        noRadius={true}
                    ></Avatar>
                </div>
                <div className={`ps-3 ${styles.user_info}`}>
                    <div className={`h2 ${styles.name}`}>
                        {userData.name}
                    </div>
                    <div className={`${styles.detail} d-flex align-items-center`}>
                        {/* <div className={`${styles.last_online} d-flex align-items-center`}>
                            <FontAwesomeIcon className={styles.last_online_icon} icon={faClock}></FontAwesomeIcon>
                            <div className={`ps-1 ${styles.last_online_content}`}>Last seen this week</div>
                        </div> */}
                        <div className={`${styles.heart_number} d-flex align-items-center`}>
                            <FontAwesomeIcon className={styles.heart_number_icon} icon={faHeart}></FontAwesomeIcon>
                            <div className={`${styles.heart_number_content} ps-1`}>{userData.heartNumber} contribution</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.edit}>
                <button type="button" className={`btn btn-outline-secondary d-flex align-items-center`}>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    <div className='ps-2'>Edit Profile</div>
                </button>
            </div>
        </div>
    </div>
}

export default Account

