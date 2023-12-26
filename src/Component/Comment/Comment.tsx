import { faFlag as faFlagNormal, faHeart as faHeartNormal } from '@fortawesome/free-regular-svg-icons'
import { faCheck, faFlag as faFlagFill, faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../../App/hook'
import { IComment, IResponse, createComment, getCommentInResponse } from '../../pages/QuestionDetails/QuestionDetailsAPI'
import ResponseContentQuestion from '../ContentQuestion/ResponseContentQuestion'
import styles from './Comment.module.scss'

interface ICommentProps {
    onFollowReponse: (responseId: string, follow: boolean) => void
    onUpdateResponse: (responseId: string, content: string, show: Dispatch<SetStateAction<boolean>>) => void
    postId: string | undefined
    sortBy: string
    responses: IResponse[]
}

function Comment(props: ICommentProps) {
    const dispatch = useAppDispatch()
    const [heart, setHeart] = useState<boolean>(false)
    const [follow, setFollow] = useState<boolean>(false)
    const [comment, setComment] = useState<Record<string, IComment[]>>({})
    const [showComment, setShowComment] = useState<boolean>(false)
    const [shortResponse, setShortResponse] = useState<IResponse[]>([])

    const onGetComment = useCallback(async (responseId: string) => {
        if (responseId && !comment[responseId]) {
            const res = await dispatch(getCommentInResponse(responseId))
            setComment((preVal) => {
                return {
                    ...preVal,
                    [responseId]: res.payload.data.comments as IComment[]
                }
            })
        }

        setShowComment(!showComment)
    }, [comment, dispatch, showComment])

    const onCreateComment = useCallback(async (responseId: string, content: string) => {
        if (!content || !responseId) return
        if (!comment[responseId]) onGetComment(responseId)
        const res = await dispatch(createComment({
            responseId: responseId,
            content: content,
            postId: props.postId as string
        }))
        setComment((preVal) => {
            return {
                ...preVal,
                [responseId]: [
                    ...preVal[responseId],
                    res.payload.data.comment as IComment
                ]
            }
        })
    }, [comment, dispatch, onGetComment, props.postId])

    useEffect(() => {
        let short = []
        switch (props.sortBy) {
            case '1':
                short = props.responses.sort((res1, res2) => res2.rate.length - res1.rate.length)
                setShortResponse(short)
                break
            case '2':
                short = props.responses.filter((response) => response.vertified)
                setShortResponse(short)
                break
            case '3':
                short = props.responses.sort((res1, res2) => (new Date(res1.updatedAt)).getTime() - (new Date(res2.updatedAt)).getTime())
                setShortResponse(short)
                break
            case '4':
                short = props.responses.sort((res1, res2) => (new Date(res2.createdAt)).getTime() - (new Date(res1.createdAt)).getTime())
                setShortResponse(short)
                break
        }
    }, [props.responses, props.sortBy])

    return <div className={` ${styles.wrapper}`}>
        {shortResponse.map((response, index) => {
            return <div className='pt-4 d-flex' key={index}>
                <div className={`${styles.options} text-center p-2`}>
                    <div className={styles.heart}>
                        {heart ? <FontAwesomeIcon className={styles.heart_icon} icon={faHeartFill}></FontAwesomeIcon> : <FontAwesomeIcon className={styles.heart_icon} icon={faHeartNormal}></FontAwesomeIcon>}
                        <div className={styles.heart_number}>{response.rate}</div>
                    </div>
                    <div className={styles.follow}>
                        {follow ? <FontAwesomeIcon className={styles.follow_icon} icon={faFlagFill}></FontAwesomeIcon> : <FontAwesomeIcon className={styles.follow_icon} icon={faFlagNormal}></FontAwesomeIcon>}
                    </div>
                    {response.vertified
                        ?
                        <div className={styles.check}>
                            <FontAwesomeIcon className={styles.check_icon} icon={faCheck}></FontAwesomeIcon>
                        </div>
                        :
                        undefined
                    }
                </div>
                <ResponseContentQuestion
                    onFollowReponse={props.onFollowReponse}
                    onUpdateResponse={props.onUpdateResponse}
                    showComment={showComment}
                    comment={comment[response._id]}
                    onGetComment={onGetComment}
                    onCreateComment={onCreateComment}
                    responseData={response}
                    classValue='ms-2 pb-3 flex-fill'
                ></ResponseContentQuestion>
            </div>
        })}

    </div >
}

export default Comment