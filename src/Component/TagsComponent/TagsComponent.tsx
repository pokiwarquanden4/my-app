import styles from './TagsComponent.module.scss'

type ITagComponent = {
    data: string[]
}

function TagsComponent(props: ITagComponent) {
    return <div className={`d-flex ${styles.tags}`}>
        {props.data.map((item, index) => {
            return <div key={index} className={`${styles.tag}`}>{item}</div>
        })}
    </div>
}

export default TagsComponent