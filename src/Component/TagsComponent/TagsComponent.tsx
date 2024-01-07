import { useCallback } from 'react'
import styles from './TagsComponent.module.scss'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../pages/pages/pages'

type ITagComponent = {
    type: string
    data: string[]
}

function TagsComponent(props: ITagComponent) {
    const navigate = useNavigate()

    const onMovePage = useCallback((input: string) => {
        switch (props.type) {
            case 'user':
                navigate(routes.account.replace(':account', input))
                break
        }
    }, [navigate, props.type])

    return <div className={`d-flex ${styles.tags}`}>
        {props.data.map((item, index) => {
            return <div
                key={index}
                className={`${styles.tag}`}
                onClick={() => {
                    onMovePage(item)
                }}
            >{item}</div>
        })}
    </div>
}

export default TagsComponent