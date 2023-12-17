import Avatar from '../../Avatar/Avatar'
import styles from './QuestionSearch.module.scss'

export interface IQuestionContent {
    src: string
    id: string
    title: string
    subTitle: string
}

interface IQuestionSearch {
    data?: IQuestionContent[]
}

function QuestionSearch(props: IQuestionSearch) {
    return props.data ? <div className={`position-absolute ${styles.wrapper}`}>
        <div className={`${styles.lists}`}>
            {props.data.map((item, index) => {
                return <div key={index} className={`d-flex align-items-center ${styles.list}`}>
                    <Avatar size={'40'} src={item.src}></Avatar>
                    <div className={`ps-3 ${styles.content}`}>
                        <div className={styles.main_content}>{item.title}</div>
                        <div className={styles.sub_content}>{item.subTitle}.</div>
                    </div>
                </div>
            })}
        </div>
    </div> : null
}

export default QuestionSearch