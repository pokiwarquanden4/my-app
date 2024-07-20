import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../App/hook'
import { INotify } from '../../../Reducers/UserSlice'
import Avatar from '../../Avatar/Avatar'
import styles from './MessageContent.module.scss'
import { checkNotify } from './NotifyAPI'
import { routes } from '../../../pages/pages/pages'
import { Dispatch, SetStateAction, useCallback } from 'react'

interface IMessageContent {
    setShowMessage: Dispatch<SetStateAction<boolean>>
    data: INotify
}

function MessageContent(props: IMessageContent) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const getText = useCallback(() => {
        if (props.data.commentId) {
            if (props.data.action === 'Response') {
                return 'comment your response'
            }
        }

        if (props.data.responseId) {
            if (props.data.action === 'Follow') {
                return 'follow your response in'
            }
            if (props.data.action === 'Rate') {
                return 'rate your response in'
            }
            if (props.data.action === 'Vertify') {
                return 'vertify your response in'
            }
            if (props.data.action === 'Response') {
                return 'comment your response in'
            }
        }

        if (props.data.postId) {
            if (props.data.action === 'Follow') {
                return 'follow your post'
            }
            if (props.data.action === 'Rate') {
                return 'rate your post'
            }
        }
    }, [props.data.action, props.data.commentId, props.data.postId, props.data.responseId])

    return <div
        className={`${styles.wrapper} d-flex align-items-center px-1 py-2`}
        onClick={() => {
            if (!props.data.checked) {
                dispatch(checkNotify({
                    id: props.data._id
                }))
            }

            const targetUrl = routes.questionDetail.replace(':questionId', props.data.postId?._id).replace(':responseId', props.data.responseId ? props.data.responseId : ':responseId');

            if (window.location.pathname === targetUrl) {
                window.location.reload();
            } else {
                navigate(targetUrl);
            }

            props.setShowMessage(false);
        }}

    >
        <div className={styles.avatar}>
            <Avatar size='50' name={props.data.senderId.account} src={props.data.senderId.avatarURL}></Avatar>
        </div>
        <div className={`${styles.content} ps-3 pe-4`}>
            <div className={styles.details}>
                <strong className={`${styles.user} pe-1`}>{props.data.senderId.account}</strong>
                {getText()}
                <strong className={`${styles.post} ps-1`}>{props.data.postId ? props.data.postId.title : ''}</strong>
            </div>
        </div>
        {!props.data.checked ? <div

            className={styles.tagUnread}
        ></div> : undefined}
    </div>
}

export default MessageContent