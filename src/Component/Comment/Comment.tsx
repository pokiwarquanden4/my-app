import styles from './Comment.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartFill, faFlag as faFlagFill, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartNormal, faFlag as faFlagNormal } from '@fortawesome/free-regular-svg-icons'
import { Fragment, useState } from 'react'
import ResponseContentQuestion from '../ContentQuestion/ResponseContentQuestion'
import { IPost } from '../../pages/QuestionDetails/QuestionDetailsAPI'

interface IComment {
    questionDetails: IPost
}

function Comment(props: IComment) {
    const [heart, setHeart] = useState<boolean>(false)
    const [follow, setFollow] = useState<boolean>(false)

    return <div className={`pt-4 ${styles.wrapper} d-flex`}>
        {props.questionDetails.responses.map((response) => {
            return <Fragment>
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
                    questionDetails={response}
                    classValue='ms-2 pb-3 flex-fill'
                ></ResponseContentQuestion>
            </Fragment>
        })}

    </div >
}

export default Comment