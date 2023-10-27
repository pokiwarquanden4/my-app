import styles from './QuestionDetails.module.scss'

function QuestionDetails() {
    return <div className={`${styles.wrapper}`}>
        <div className={`${styles.header} h4`}>How can I split keys that equal to the same value in a hash (ruby)</div>
        <div className={`d-flex ${styles.sub_header}`}>
            <div className={`${styles.time_asked}`}>Asked today</div>
            <div className={`ps-3 ${styles.time_modified}`}>Modified today</div>
            <div className={`ps-3 ${styles.time_view}`}>Viewed 4 times</div>
        </div>
    </div>
}

export default QuestionDetails