import { useState } from 'react'
import styles from './OptionsListButton.module.scss'

type IOptionListButton = {
    data: { name: string }[]
}

function OptionsListButton(props: IOptionListButton) {
    const [focus, setFocus] = useState<number>(0)

    return <div className={styles.wrapper}>
        {props.data.map((item, index) => {
            return <button
                onClick={() => { setFocus(index) }}
                key={index}
                type="button"
                className={`btn btn-outline-secondary ${styles.questions_filter_item} ${index === focus ? styles.focus : undefined}`}>
                {item.name}
            </button>
        })}
    </div>

}

export default OptionsListButton