import { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import styles from './NavBar.module.scss'
import { routes } from '../../pages/pages/pages'
import NavBarComponent, { IOptionData } from './NavBarComponent/NavBarComponent'
import { useLocation } from 'react-router-dom'

const optionsList: IOptionData[] = [
    {
        name: 'Questions',
        url: routes.questions,
        child: [
            {
                name: 'Ask Questions',
                url: routes.ask,
                child: [],
            }
        ],
    },
    {
        name: 'Tags',
        url: routes.tags,
        child: [],
    },
    {
        name: 'Users',
        url: routes.users,
        child: [],
    },
    {
        name: 'Account',
        url: routes.account,
        child: [
            {
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