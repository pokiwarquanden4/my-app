import { faCircleQuestion, faClipboardList, faTags, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { routes } from '../../pages/pages/pages'
import styles from './NavBar.module.scss'
import NavBarComponent, { IOptionData } from './NavBarComponent/NavBarComponent'

const optionsList: IOptionData[] = [
    {
        name: 'Questions',
        url: routes.questions,
        icon: <FontAwesomeIcon className='pe-2' icon={faClipboardList}></FontAwesomeIcon>,
        child: [
            {
                name: 'Ask Questions',
                icon: <FontAwesomeIcon className='pe-2' icon={faCircleQuestion}></FontAwesomeIcon>,
                url: routes.ask,
                child: [],
            }
        ],
    },
    {
        icon: <FontAwesomeIcon className='pe-2' icon={faTags}></FontAwesomeIcon>,
        name: 'Tags',
        url: routes.tags,
        child: [],
    },
    {
        icon: <FontAwesomeIcon className='pe-2' icon={faUser}></FontAwesomeIcon>,
        name: 'Users',
        url: routes.users,
        child: [],
    },
    {
        icon: <FontAwesomeIcon className='pe-2' icon={faCircleQuestion}></FontAwesomeIcon>,
        name: 'Account',
        url: routes.account,
        child: [
            {
                icon: <FontAwesomeIcon className='pe-2' icon={faCircleQuestion}></FontAwesomeIcon>,
                name: 'Create Account',
                url: routes.createAccount,
                child: [],
            }
        ],
    },
]

function NavBar() {
    const location = useLocation()
    const [currentOption, setCurrentOption] = useState<number[]>([])

    const getCurrentOptions = useCallback((): number[] => {
        const path = location.pathname
        for (let i = 0; i < optionsList.length; i++) {
            if (optionsList[i].url === path) {
                return [i]
            } else {
                for (let j = 0; j < optionsList[i].child.length; j++) {
                    if (optionsList[i].child[j].url === path) {
                        return [i, j]
                    }
                }
            }
        }
        return []
    }, [location.pathname])

    useEffect(() => {
        const currentOptions = getCurrentOptions()
        setCurrentOption(currentOptions)
    }, [getCurrentOptions])

    return <div className={`${styles.container}`}>
        <div className={`${styles.items}`}>
            {optionsList.map((option, index) => {
                return <NavBarComponent
                    key={index}
                    index={index}
                    data={option}
                    currentOption={currentOption}
                    setCurrentOption={setCurrentOption}
                ></NavBarComponent>
            }
            )}
        </div>
    </div >
}

export default NavBar