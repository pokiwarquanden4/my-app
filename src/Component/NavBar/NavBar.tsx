import { faCircleQuestion, faClipboardList, faTags, faUser, faRectangleAd, faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { routes } from '../../pages/pages/pages'
import styles from './NavBar.module.scss'
import NavBarComponent, { IOptionData } from './NavBarComponent/NavBarComponent'
import { useAppSelector } from '../../App/hook'

function NavBar() {
    const location = useLocation()
    const [currentOption, setCurrentOption] = useState<number[]>([])
    const currentUser = useAppSelector(store => store.user.data)
    const optionsList: IOptionData[] = useMemo(() => {
        return [
            {
                name: 'Questions',
                url: routes.questions,
                role: "User",
                icon: <FontAwesomeIcon className='pe-2' icon={faClipboardList}></FontAwesomeIcon>,
                child: [],
            },
            {
                icon: <FontAwesomeIcon className='pe-2' icon={faTags}></FontAwesomeIcon>,
                name: 'Tags',
                role: "User",
                url: routes.tags,
                child: [],
            },
            {
                icon: <FontAwesomeIcon className='pe-2' icon={faUser}></FontAwesomeIcon>,
                name: 'Users',
                role: "User",
                url: routes.users,
                child: [],
            },
            {
                icon: <FontAwesomeIcon className='pe-2' icon={faCircleQuestion}></FontAwesomeIcon>,
                name: 'Account',
                role: "User",
                url: routes.account.replace(':account', currentUser.account),
                loginRequire: true,
                child: [],
            },
            {
                icon: <FontAwesomeIcon className='pe-2' icon={faFlag}></FontAwesomeIcon>,
                name: 'Reports',
                role: "Admin",
                url: routes.reports,
                child: [],
            },
            {
                icon: <FontAwesomeIcon className='pe-2' icon={faRectangleAd}></FontAwesomeIcon>,
                name: 'Advert',
                role: "Admin",
                url: routes.advertisement,
                child: [],
            },
        ]
    }, [currentUser.account])

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
    }, [location.pathname, optionsList])

    useEffect(() => {
        const currentOptions = getCurrentOptions()
        setCurrentOption(currentOptions)
    }, [getCurrentOptions])

    return <div className={`${styles.container}`}>
        <div className={`${styles.items}`}>
            {optionsList.map((option, index) => {
                if (option.role === 'Admin' && currentUser.roleName === 'Admin') {
                    return <NavBarComponent
                        key={index}
                        index={index}
                        data={option}
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                    ></NavBarComponent>
                }
                if (option.role !== 'Admin') {
                    return <NavBarComponent
                        key={index}
                        index={index}
                        data={option}
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                    ></NavBarComponent>
                }
                return undefined
            }
            )}
        </div>
    </div >
}

export default NavBar