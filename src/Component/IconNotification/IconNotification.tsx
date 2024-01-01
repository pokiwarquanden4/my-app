import { ReactNode } from 'react'
import styles from './IconNotification.module.scss'

type IIconNotification = {
    arlert: boolean
    children: ReactNode
    number?: number
}

function IconNotification(props: IIconNotification) {
    return <div className={styles.wrapper}>
        {props.children}
        {props.arlert && props.number ?
            <div className={`${styles.arlert} d-flex justify-content-center align-items-center`}>
                <div>{props.number}</div>
            </div>
            :
            undefined
        }
    </div>
}

export default IconNotification