import styles from './Comment.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartFill, faFlag as faFlagFill, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartNormal, faFlag as faFlagNormal } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'
import ContentQuestion from '../ContentQuestion/ContentQuestion'

const fakeCommentData = [
    {
        id: 1,
        content: "where do I add the code: File(\"...\").setReadOnly()?",
        userName: "Wei Wen",
        date: new Date()
    },
    {
        id: 2,
        content: "before where you use DexClassLoader or just at Application / Activity onCreate.",
        userName: "Bibibla",
        date: new Date()
    }
]

function Comment() {
    const [heart, setHeart] = useState<boolean>(false)
    const [follow, setFollow] = useState<boolean>(false)

    return <div className={`pt-4 ${styles.wrapper} d-flex`}>
        <div className={`${styles.options} text-center p-2`}>
            <div className={styles.heart}>
                {heart ? <FontAwesomeIcon className={styles.heart_icon} icon={faHeartFill}></FontAwesomeIcon> : <FontAwesomeIcon className={styles.heart_icon} icon={faHeartNormal}></FontAwesomeIcon>}
                <div className={styles.heart_number}>20</div>
            </div>
            <div className={styles.follow}>
                {follow ? <FontAwesomeIcon className={styles.follow_icon} icon={faFlagFill}></FontAwesomeIcon> : <FontAwesomeIcon className={styles.follow_icon} icon={faFlagNormal}></FontAwesomeIcon>}
            </div>
            <div className={styles.check}>
                <FontAwesomeIcon className={styles.check_icon} icon={faCheck}></FontAwesomeIcon>
            </div>
        </div>
        <ContentQuestion
            isSubQuestions={true}
            answerData={fakeCommentData}
            classValue='ms-2 pb-3 flex-fill'
        ></ContentQuestion>
    </div >
}

export default Comment