import styles from './QuestionDetails.module.scss'
import Comment from '../../Component/Comment/Comment';
import ContentQuestion from '../../Component/ContentQuestion/ContentQuestion';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../App/hook';
import { IPost, createResponse, getPostById } from './QuestionDetailsAPI';

const sortData = [
    {
        content: 'Highest score (default)',
        id: 1
    },
    {
        content: 'Date modified (newest first)',
        id: 2
    },
    {
        content: 'Date created (oldest first)',
        id: 3
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

    useEffect(() => {
        const func = async () => {
            if (!postId) return
            const res = await dispatch(getPostById(postId))
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
        console.log(res)
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
                    <div className={`ps-3 ${styles.time_view}`}>Viewed {questionDetails.view.length} times</div>
                </div>
                <ContentQuestion onCreateResponse={onCreateResponse} questionDetails={questionDetails} classValue='py-4'></ContentQuestion>
                <div className={`pt-4 ${styles.comment}`}>
                    <div className={`d-flex justify-content-between align-items-center ${styles.comment_header}`}>
                        <div className={`h6 ${styles.comment_number}`}>{questionDetails.responses.length} Answers</div>
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
                    <Comment questionDetails={questionDetails}></Comment>
                </div>
            </Fragment>
            :
            undefined
        }
    </div>
}

export default QuestionDetails