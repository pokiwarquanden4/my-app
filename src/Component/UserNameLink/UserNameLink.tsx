import { useNavigate } from "react-router-dom"
import { routes } from "../../pages/pages/pages"
import styles from './UserNameLink.module.scss'

interface IUserNameLink {
    name: string
    styleVal: string
    fontSize?: string
}

function UserNameLink(props: IUserNameLink) {
    const navigate = useNavigate()

    return <div
        className={`${props.styleVal ? props.styleVal : ''} ${styles.mainName}`}
        style={props.fontSize ? { fontSize: `${props.fontSize}` } : {}}
        onClick={() => {
            navigate(routes.account.replace(':account', props.name))
        }}
    >{props.name}</div>
}

export default UserNameLink