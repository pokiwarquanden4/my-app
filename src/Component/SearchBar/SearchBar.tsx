import styles from './SearchBar.module.scss'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface ISearchBar {
    searchVal: string
    setSearchVal: Dispatch<SetStateAction<string>>
    children?: ReactNode
    setFocus?: Dispatch<SetStateAction<boolean>>
}

function SearchBar(props: ISearchBar) {
    return <div className={`${styles.container} flex-fill`}>
        <div>
            <div className="">
                <input type="text"
                    onFocus={() => {
                        props.setFocus && props.setFocus(true)
                    }}
                    onBlur={() => {
                        props.setFocus && props.setFocus(false)
                    }}
                    value={props.searchVal}
                    className="form-control"
                    placeholder="Search Here..."
                    aria-label="Search Here..."
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                        props.setSearchVal(e.target.value)
                    }}
                ></input>
            </div>
        </div>
        {props.children ? <div className={`position-relative ${styles.content}`}>{props.children}</div> : undefined}
    </div>
}

export default SearchBar