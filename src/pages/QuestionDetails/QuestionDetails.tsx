import { Dispatch, Fragment, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../App/hook';
import Comment from '../../Component/Comment/Comment';
import ContentQuestion from '../../Component/ContentQuestion/ContentQuestion';
import styles from './QuestionDetails.module.scss';
import { IPost, IResponse, createResponse, deletePost, getPostById, updatePost, updateReponse } from './QuestionDetailsAPI';
import { formatTimeAgo } from '../../Functions/Functions';
import { followPost, followResponse, ratePost, rateResponse, unFollowPost, unFollowResponse, unRatePost, unRateResponse } from '../Questions/QuestionsAPI';
import { faFlag, faTrash, faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartNormal } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalComponent from '../../Component/Modal/ModalComponent';
import QuestionReport from './QuestionReport/QuestionReport';
import { routes } from '../pages/pages';

const sortData = [
    {
        content: 'Highest score ( highest rate )',
        id: 1
    },
    {
        content: 'Vertified (correct answers)',
        id: 2
    },
    {
        content: 'Date modified (newest first)',
        id: 3
    },
    {
        content: 'Date created (oldest first)',
        id: 4
    },
]

function QuestionDetails() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const postId = useMemo(() => {
        return params.questionId
    }, [params.questionId])
    const responseId = useMemo(() => {
        return params.responseId
    }, [params.responseId])
    const [sortBy, setSortBy] = useState<string>('1')
    const [questionDetails, setQuestionDetails] = useState<IPost>()
    const [responses, setReponses] = useState<IResponse[]>([])
    const userDetails = useAppSelector(store => store.user.data)
    const [reportSchow, setReportShow] = useState<boolean>(false)

    const onUpdateResponse = useCallback(async (responseId: string, content: string, show: Dispatch<SetStateAction<boolean>>) => {
        const res = await dispatch(updateReponse({
            responseId: responseId,
            content: content as string
        }))

        if (res.payload.status === 200) {
            const newResponses = responses.map((response) => {
                if (response._id === responseId) {
                    return {
                        ...response,
                        content: content as string
                    }
                }
                return response
            })
            setReponses(newResponses)
            show(false)
        }

    }, [dispatch, responses])

    useEffect(() => {
        const func = async () => {
            if (!postId) return
            const res = await dispatch(getPostById(postId))

            if (res.payload.status === 200) {
                setReponses(
                    res.payload.data.post.responses as IResponse[]
                )
                setQuestionDetails(res.payload.data.post as IPost)
            }
        }

        func()
    }, [dispatch, postId])

    const onCreateResponse = useCallback(async (content: string) => {
        if (!content) return
        const res = await dispatch(createResponse({
            content: content,
            postId: postId as string
        }))
        setReponses((preVal) => {
            return [
                ...preVal,
                res.payload.data.response as IResponse
            ]
        })
    }, [dispatch, postId])

    const onUpdatePost = useCallback(async (title?: string, subTitle?: string, content?: string, tags?: string[], show?: Dispatch<SetStateAction<boolean>>) => {
        if (!title && !subTitle && !content) return
        const res = await dispatch(updatePost({
            postId: postId as string,
            title: title,
            subTitle: subTitle,
            content: content,
            tags: tags
        }))

        if (res.payload.status === 200) {
            setQuestionDetails((preVal) => {
                if (preVal)
                    return {
                        ...preVal,
                        title: res.meta.arg.title as string,
                        subTitle: res.meta.arg.subTitle as string,
                        content: res.meta.arg.content as string,
                        tags: res.meta.arg.tags as string[],
                    }
            })

            show && show(false)
        }
    }, [dispatch, postId])

    const onFollowPost = useCallback(async (follow: boolean) => {
        if (!questionDetails?._id) return
        if (follow) {
            await dispatch(followPost({
                postId: questionDetails._id
            }))
        } else {
            await dispatch(unFollowPost({
                postId: questionDetails._id
            }))
        }

    }, [dispatch, questionDetails])

    const onFollowReponse = useCallback(async (responseId: string, follow: boolean) => {
        if (!questionDetails?._id || !responseId) return
        if (follow) {
            await dispatch(followResponse({
                responseId: responseId
            }))
        } else {
            await dispatch(unFollowResponse({
                responseId: responseId
            }))
        }

    }, [dispatch, questionDetails])

    const onRatePost = useCallback(async (follow: boolean) => {
        if (!postId) return
        if (follow) {
            const res = await dispatch(ratePost({
                postId: postId
            }))

            if (res.payload.status === 200) {
                setQuestionDetails((preVal) => {
                    if (preVal)
                        return {
                            ...preVal,
                            rate: [...preVal.rate, res.payload.data.account]
                        }
                })
            }
        } else {
            const res = await dispatch(unRatePost({
                postId: postId
            }))

            if (res.payload.status === 200) {
                setQuestionDetails((preVal) => {
                    if (preVal) {
                        return {
                            ...preVal,
                            rate: preVal.rate.filter(userName => userName !== res.payload.data.account),
                        };
                    }
                });
            }
        }
    }, [dispatch, postId])

    const onRateReponse = useCallback(async (responseId: string, follow: boolean) => {
        if (!questionDetails?._id || !responseId) return
        if (follow) {
            const res = await dispatch(rateResponse({
                responseId: responseId
            }))

            if (res.payload.status !== 200) return
            setReponses((preVal) => {
                return preVal.map((item) => {
                    if (item._id === responseId) {
                        if (!item.rate.includes(userDetails.account)) {
                            return {
                                ...item,
                                rate: [...item.rate, res.payload.data.account]
                            }
                        }
                    }
                    return item
                })
            })
        } else {
            const res = await dispatch(unRateResponse({
                responseId: responseId
            }))

            if (res.payload.status !== 200) return
            setReponses((preVal) => {
                return preVal.map((item) => {
                    if (item._id === responseId) {
                        if (item.rate.includes(res.payload.data.account)) {
                            item.rate.splice(item.rate.indexOf(res.payload.data.account), 1)
                            return item
                        }
                    }
                    return item
                })
            })
        }

    }, [dispatch, questionDetails?._id, userDetails.account])

    const onDeletePost = useCallback((e: any) => {
        if (!postId) return
        e.stopPropagation();
        if (window.confirm('Are sure want to delete?')) {
            dispatch(deletePost({
                postId: postId
            }))
            navigate(routes.home)
        }
    }, [dispatch, navigate, postId])

    return <div className={`${styles.wrapper} mb-5`}>
        {questionDetails
            ?
            <Fragment>
                <div className={`${styles.header} h4 d-flex justify-content-between align-items-center`}>
                    {questionDetails.title}
                    {userDetails.account !== questionDetails.userId.account
                        ?
                        userDetails.roleName !== "Admin"
                            ?
                            <div>
                                <FontAwesomeIcon
                                    style={{ cursor: 'pointer', fontSize: '15px' }}
                                    onClick={() => {
                                        setReportShow(true)
                                    }}
                                    icon={faFlag}
                                ></FontAwesomeIcon>
                            </div>
                            :
                            <FontAwesomeIcon
                                onClick={onDeletePost}
                                className='ps-3'
                                style={{ cursor: 'pointer', fontSize: '15px' }}
                                icon={faTrash}
                            ></FontAwesomeIcon>
                        :
                        <FontAwesomeIcon
                            onClick={onDeletePost}
                            className='ps-3'
                            style={{ cursor: 'pointer', fontSize: '15px' }}
                            icon={faTrash}
                        ></FontAwesomeIcon>
                    }
                </div>
                <div className={`${styles.subHeader} mb-2`}>{questionDetails.subTitle}</div>
                <div className={`d-flex ${styles.header_detail} pb-2 justify-content-between`}>
                    <div className='d-flex'>
                        <div className={`${styles.time_asked}`}>Asked: {formatTimeAgo(new Date(questionDetails.createdAt))}</div>
                        <div className={`ps-4 ${styles.time_modified}`}>Modified: {formatTimeAgo(new Date(questionDetails.updatedAt))}</div>
                    </div>
                    <div style={{ cursor: 'pointer' }}>
                        {questionDetails.rate.includes(userDetails._id)
                            ?
                            <FontAwesomeIcon
                                onClick={() => {
                                    onRatePost(false)
                                }}
                                className={styles.heart_icon}
                                icon={faHeartFill}
                            ></FontAwesomeIcon>
                            :
                            <FontAwesomeIcon
                                onClick={() => {
                                    onRatePost(true)
                                }}
                                className={styles.heart_icon}
                                icon={faHeartNormal}
                            ></FontAwesomeIcon>
                        }
                    </div>
                </div>
                <ContentQuestion
                    onFollowPost={onFollowPost}
                    onCreateResponse={onCreateResponse}
                    questionDetails={questionDetails}
                    onUpdatePost={onUpdatePost}
                    classValue='py-4'
                ></ContentQuestion>
                <div className={`pt-4 ${styles.comment}`}>
                    <div className={`d-flex justify-content-between align-items-center ${styles.comment_header}`}>
                        <div className={`h6 ${styles.comment_number}`}>{responses.length} Answers</div>
                        <div className={styles.commnet_sort}>
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Sort</label>
                                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value) }} className="form-select" id="inputGroupSelect01">
                                    {sortData.map((data, index) => {
                                        return <option key={index} value={data.id}>{data.content}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <Comment
                        responseId={responseId === ':responseId' ? undefined : responseId}
                        questionOwner={questionDetails.userId.account}
                        onRateReponse={onRateReponse}
                        onFollowReponse={onFollowReponse}
                        onUpdateResponse={onUpdateResponse}
                        sortBy={sortBy} postId={postId}
                        responses={responses}
                        setReponses={setReponses}
                    ></Comment>
                </div>
                <ModalComponent
                    header='Report Form'
                    visible={reportSchow}
                    setShow={setReportShow}
                >
                    <QuestionReport
                        setReportShow={setReportShow}
                        postId={postId}
                    ></QuestionReport>
                </ModalComponent>
            </Fragment>
            :
            <div className='h4 text-center pt-4'>Post does not exist</div>
        }
    </div>
}

export default QuestionDetails