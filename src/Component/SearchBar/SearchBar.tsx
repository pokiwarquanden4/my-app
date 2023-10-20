import styles from './SearchBar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
    return <div className={`${styles.container} flex-fill`}>
        <div className="input-group">
            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
        </div>
    </div>
}

export default SearchBar