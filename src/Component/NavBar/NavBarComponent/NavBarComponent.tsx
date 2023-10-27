import styles from './NavBarComponent.module.scss'
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IOptionData {
    name: string;
    url: string;
    child: IOptionData[];
}

interface INaveBarComponent {
    index: number
    data: IOptionData
    currentOption: number[]
    setCurrentOption: Dispatch<SetStateAction<number[]>>
}

function NavBarComponent(props: INaveBarComponent) {
    const navigate = useNavigate()

    return <div className={`${styles.item_wrapper}`}>
        <div className='position-relative'>
            <div onClick={() => {
                props.data.url && navigate(props.data.url)
                props.setCurrentOption([props.index])
            }}
                key={props.index}
                className={`px-3 py-3 ${styles.item} ${props.currentOption.length === 1 && props.currentOption[0] === props.index ? styles.focus : undefined}`}>
                {props.data.name}
            </div>
        </div>
        {props.data.child.length ?
            <div className={styles.subNav}>
                {props.data.child.map((value, index) => {
                    const focus = props.currentOption.length === 2 && props.currentOption[0] === props.index && props.currentOption[1] === index
                    return <div
                        key={index}
                        className={`${styles.sub_item} ${focus ? styles.focus : undefined}`}
                        onClick={() => {
                            props.data.url && navigate(value.url)
                            props.setCurrentOption([props.index, index])
                        }}
                    >
                        - {value.name}
                    </div>
                })}
            </div>
            :
            undefined}
    </div>
}

export default NavBarComponent