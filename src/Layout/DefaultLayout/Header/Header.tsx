import SearchBar from '../../../Component/SearchBar/SearchBar'
import styles from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import IconNotification from '../../../Component/IconNotification/IconNotification'

function Header() {
    return <div className={`container-fluid d-flex justify-content-around align-items-center ${styles.wrapper}`}>
        <img
            src="https://cdn.shopify.com/s/files/1/0438/9070/4538/files/logo.png?v=1614325954"
            className={`px-5 ${styles.logo}`}
        ></img>
        <SearchBar></SearchBar>
        <div className='px-5 d-flex align-items-cente'>
            <IconNotification arlert={true} number={0}>
                <FontAwesomeIcon className={styles.icon} icon={faBell}></FontAwesomeIcon>
            </IconNotification>
            <IconNotification arlert={false}>
                <FontAwesomeIcon className={styles.icon} icon={faUser}></FontAwesomeIcon>
            </IconNotification>
            <IconNotification arlert={false}>
                <FontAwesomeIcon className={styles.icon} icon={faRightFromBracket}></FontAwesomeIcon>
            </IconNotification>
        </div>
    </div>
}

export default Header