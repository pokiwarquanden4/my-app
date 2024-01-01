import { Dispatch, SetStateAction, useState } from 'react'
import Avatar from '../../Avatar/Avatar'
import styles from './QuestionSearch.module.scss'

export interface IQuestionContent {
    src: string
    id: string
    title: string
    subTitle: string
}

interface IQuestionSearch {
    hoverId: string | undefined,
    setHoverId: Dispatch<SetStateAction<string | undefined>>
    data?: IQuestionContent[]
}

function QuestionSearch(props: IQuestionSearch) {
    return props.data ? <div className={`position-absolute ${styles.wrapper}`}>
        <div className={`${styles.lists}`}>
            {props.data.map((item, index) => {
                return <div
                    onMouseEnter={() => {
                        props.setHoverId(item.id)
                    }}
                    onMouseLeave={() => {
                        props.setHoverId(undefined)
                    }}
                    key={index}
                    className={`d-flex align-items-center ${styles.list}`}>
                    <Avatar name='Quang' size={'40'} src={item.src}></Avatar>
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