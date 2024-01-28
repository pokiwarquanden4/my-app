import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../App/hook'
import { INotify } from '../../../Reducers/UserSlice'
import Avatar from '../../Avatar/Avatar'
import styles from './MessageContent.module.scss'
import { checkNotify } from './NotifyAPI'
import { routes } from '../../../pages/pages/pages'
import { Dispatch, SetStateAction } from 'react'

interface IMessageContent {
    setShowMessage: Dispatch<SetStateAction<boolean>>
    data: INotify
}

function MessageContent(props: IMessageContent) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return <div
        className={`${styles.wrapper} d-flex align-items-center px-1 py-2`}
        onClick={() => {
            if (!props.data.checked) {
                dispatch(checkNotify({
                    id: props.data._id
                }))
            }
            navigate(routes.questionDetail.replace(':questionId', props.data.postId).replace(':responseId', props.data.responseId ? props.data.responseId : ':responseId'));
            props.setShowMessage(false)
        }}
    >
        <div className={styles.avatar}>
            <Avatar size='50' name={props.data.details.sender} src={props.data.details.avatar}></Avatar>
        </div>
        <div className={`${styles.content} ps-3 pe-4`}>
            <div className={styles.details}>
                <strong className={`${styles.user} pe-1`}>{props.data.details.sender}</strong>
                {props.data.details.postName ? 'response' : 'comment'}
                <strong className={`${styles.post} ps-1`}>{props.data.details.postName}</strong>
            </div>
        </div>
        {!props.data.checked ? <div

            className={styles.tagUnread}
        ></div> : undefined}
    </div>
}

export default MessageContent