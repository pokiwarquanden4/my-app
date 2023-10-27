import Avatar from '../../Avatar/Avatar'
import styles from './QuestionSearch.module.scss'

interface IQuestionContent {
    size: string
    name: string
    src: string
    main_content: string
    sub_content: string
}

interface IQuestionSearch {
    data?: IQuestionContent[]
}

function QuestionSearch(props: IQuestionSearch) {
    return props.data ? <div className={`position-absolute ${styles.wrapper}`}>
        <div className={`${styles.lists}`}>
            {props.data.map((item, index) => {
                return <div key={index} className={`d-flex align-items-center ${styles.list}`}>
                    <Avatar size={item.size} name={item.name} src={item.src}></Avatar>
                    <div className={`ps-3 ${styles.content}`}>
                        <div className={styles.main_content}>{item.main_content}</div>
                        <div className={styles.sub_content}>{item.sub_content}.</div>
                    </div>
                </div>
            })}
        </div>
    </div> : null
}

export default QuestionSearch