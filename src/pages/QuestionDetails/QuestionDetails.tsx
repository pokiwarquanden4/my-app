import styles from './QuestionDetails.module.scss'
import Comment from '../../Component/Comment/Comment';
import ContentQuestion from '../../Component/ContentQuestion/ContentQuestion';
import { useState } from 'react';

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
    const [sortBy, setSortBy] = useState<string>('1')

    return <div className={`${styles.wrapper} mb-5`}>
        <div className={`${styles.header} h4`}>How can I split keys that equal to the same value in a hash (ruby)</div>
        <div className={`d-flex ${styles.sub_header} pb-2`}>
            <div className={`${styles.time_asked}`}>Asked today</div>
            <div className={`ps-3 ${styles.time_modified}`}>Modified today</div>
            <div className={`ps-3 ${styles.time_view}`}>Viewed 4 times</div>
        </div>
        <ContentQuestion classValue='py-4'></ContentQuestion>
        <div className={`pt-4 ${styles.comment}`}>
            <div className={`d-flex justify-content-between align-items-center ${styles.comment_header}`}>
                <div className={`h6 ${styles.comment_number}`}>5 Answers</div>
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
            <Comment></Comment>
        </div>
    </div>
}

export default QuestionDetails