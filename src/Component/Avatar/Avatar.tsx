import styles from './Avatar.module.scss'

interface IAvatar {
    name: string
    src: string | undefined,
    size?: string
    noRadius?: boolean
    uploadImg?: (name: string, value: string | File) => void
}

function Avatar(props: IAvatar) {
    const avatarStyle = {
        width: props.size ? `${props.size}px` : '100%',
        height: props.size ? `${props.size}px` : '100%',
        minWidth: props.size ? `${props.size}px` : undefined,
        borderRadius: props.noRadius ? '0' : '50%',
    };

    return <div
        className={`${styles.avatar}`}
        style={avatarStyle}
    >
        {props.src
            ?
            props.uploadImg
                ?
                <label className={styles.file_input_label}>
                    <img className={styles.account_img} src={props.src} alt="avatar" />
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className={styles.hidden_file_input}
                        onChange={(e) => {
                            if (e.target.files && props.uploadImg) {
                                const file = e.target.files[0]
                                props.uploadImg('imgURL', file)
                            }
                        }}
                    />
                </label>
                :
                <img className={styles.account_img} src={props.src} alt="avatar" />
            :
            <div className={`${styles.account_img} position-relative`}>
                <div className={styles.account_img_content}>{props.name.charAt(0).toUpperCase()}</div>
            </div>
        }
    </div>
}

export default Avatar