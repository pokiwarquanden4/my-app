import styles from './Avatar.module.scss'

interface IAvatar {
    src: string,
    size: string
}

function Avatar(props: IAvatar) {
    return <div className={`${styles.avatar}`} style={{ width: `${props.size}px`, height: `${props.size}px`, minWidth: `${props.size}px` }}>
        <img alt={'avatar'} className={styles.account_img} src={props.src}></img>
    </div>
}

export default Avatar