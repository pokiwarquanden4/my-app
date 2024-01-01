import styles from './Avatar.module.scss'

interface IAvatar {
    name: string
    src: string | undefined,
    size?: string
    noRadius?: boolean
}

function Avatar(props: IAvatar) {
    const avatarStyle = {
        width: props.size ? `${props.size}px` : undefined,
        height: props.size ? `${props.size}px` : undefined,
        minWidth: props.size ? `${props.size}px` : undefined,
        borderRadius: props.noRadius ? '0' : '50%',
    };

    return <div
        className={`${styles.avatar}`}
        style={avatarStyle}
    >
        {props.src
            ?
            <img alt={'avatar'} className={styles.account_img} src={props.src}></img>
            :
            <div className={`${styles.account_img} position-relative`}>
                <div className={styles.account_img_content}>{props.name.charAt(0)}</div>
            </div>
        }
    </div>
}

export default Avatar