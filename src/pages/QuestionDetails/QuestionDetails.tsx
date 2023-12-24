import { Dispatch, Fragment, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../App/hook';
import Comment from '../../Component/Comment/Comment';
import ContentQuestion from '../../Component/ContentQuestion/ContentQuestion';
import styles from './QuestionDetails.module.scss';
import { IPost, IResponse, createResponse, getPostById, getReponseInPost, updatePost, updateReponse } from './QuestionDetailsAPI';

const sortData = [
    {
        content: 'Highest score ( default )',
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
    const params = useParams()
    const postId = useMemo(() => {
        return params.questionId
    }, [params.questionId])
    const [sortBy, setSortBy] = useState<string>('1')
    const [questionDetails, setQuestionDetails] = useState<IPost>()
    const [responses, setReponses] = useState<IResponse[]>([])

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
            const response = await dispatch(getReponseInPost(postId))
            if (response) {
                setReponses(response.payload.data.responses)
            }
            if (res) {
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

    return <div className={`${styles.wrapper} mb-5`}>
        {questionDetails
            ?
            <Fragment>
                <div className={`${styles.header} h4`}>{questionDetails.title}</div>
                <div className={`${styles.subHeader} mb-2`}>{questionDetails.subTitle}</div>
                <div className={`d-flex ${styles.header_detail} pb-2`}>
                    <div className={`${styles.time_asked}`}>Asked today</div>
                    <div className={`ps-3 ${styles.time_modified}`}>Modified today</div>
                </div>
                <ContentQuestion
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
                    <Comment onUpdateResponse={onUpdateResponse} sortBy={sortBy} postId={postId} responses={responses}></Comment>
                </div>
            </Fragment>
            :
            undefined
        }
    </div>
}

export default QuestionDetails