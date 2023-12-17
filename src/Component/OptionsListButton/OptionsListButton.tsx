import { Dispatch, SetStateAction } from 'react'
import styles from './OptionsListButton.module.scss'

type IOptionListButton = {
    focus: number
    setFocus: Dispatch<SetStateAction<number>>
    data: { name: string }[]
}

function OptionsListButton(props: IOptionListButton) {
    return <div className={styles.wrapper}>
        {props.data.map((item, index) => {
            return <button
                onClick={() => { props.setFocus(index) }}
                key={index}
                type="button"
                className={`btn btn-outline-secondary ${styles.questions_filter_item} ${index === props.focus ? styles.focus : undefined}`}>
                {item.name}
            </button>
        })}
    </div>

}

export default OptionsListButton