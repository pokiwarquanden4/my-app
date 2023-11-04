import styles from './TagsComponent.module.scss'

type ITags = {
    name: string
}

type ITagComponent = {
    data: ITags[]
}

function TagsComponent(props: ITagComponent) {
    return <div className={`d-flex ${styles.tags}`}>
        {props.data.map((item, index) => {
            return <div key={index} className={`${styles.tag}`}>{item.name}</div>
        })}
    </div>
}

export default TagsComponent