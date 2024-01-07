import { faBell, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useAppDispatch, useAppSelector } from '../../../App/hook'
import IconNotification from '../../../Component/IconNotification/IconNotification'
import Message from '../../../Component/Message/Message'
import ModalComponent from '../../../Component/Modal/ModalComponent'
import QuestionSearch, { IQuestionContent } from '../../../Component/SearchBar/QuestionSearch/QuestionSearch'
import SearchBar from '../../../Component/SearchBar/SearchBar'
import LoginPages from '../../../pages/LoginPages/LoginPages'
import { routes } from '../../../pages/pages/pages'
import styles from './Header.module.scss'
import { postsSearch } from './HeaderAPI'
import { logoutSlice } from '../../../Reducers/UserSlice'


function Header() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [login, setLogin] = useState<boolean>(false)
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [searchFocus, setSearchFocus] = useState<boolean>(false)
    const [searchVal, setSearchVal] = useState<string>('')
    const [loginShow, setLoginShow] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<IQuestionContent[]>([])
    const [postId, setPostId] = useState<string | undefined>()
    const userName = useAppSelector(store => store.user.data.account)
    const loginShowSlice = useAppSelector(store => store.user.loginShow)

    useEffect(() => {
        setLoginShow(loginShowSlice.show)
    }, [loginShowSlice])

    useEffect(() => {
        const cookies = new Cookies()
        const func = () => {
            const token = cookies.get('token') || cookies.get('refresh_token')
            if (token) {
                setLogin(true);
            } else {
                setLogin(false);
            }
        }
        func()
        cookies.addChangeListener(func)
    }, []);

    const logout = useCallback(() => {
        const cookies = new Cookies()
        cookies.remove('token')
        cookies.remove('refresh_token')
        dispatch(logoutSlice({}))
        navigate(routes.home)
    }, [dispatch, navigate])

    useEffect(() => {
        if (!searchVal) return
        const timeoutSearch = setTimeout(async () => {
            const res = await dispatch(postsSearch(searchVal))

            if (!res) {
                setSearchData([])
                return
            }

            setSearchData(res.payload.data.posts.map((post: any) => {
                return {
                    id: post._id,
                    title: post.title,
                    subTitle: post.subTitle
                }
            }))
        }, 500)

        return () => {
            clearTimeout(timeoutSearch)
        }
    }, [dispatch, searchVal])

    useEffect(() => {
        if (!searchFocus && postId) {
            navigate(routes.questionDetail.replace(':questionId', postId));
            setPostId(undefined)
        }
    }, [navigate, postId, searchFocus])

    return <div className={`container-fluid d-flex justify-content-around align-items-center ${styles.wrapper}`}>
        <img
            src="https://cdn.shopify.com/s/files/1/0438/9070/4538/files/logo.png?v=1614325954"
            className={`px-5 ${styles.logo}`}
            onClick={() => {
                navigate(routes.home)
            }}
            alt=''
        ></img>
        <SearchBar
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            setFocus={setSearchFocus}>
            {searchData.length
                ? <QuestionSearch
                    hoverId={postId}
                    setHoverId={setPostId}
                    data={searchFocus ? searchData : undefined}
                ></QuestionSearch>
                :
                undefined}
        </SearchBar>
        <div className='px-5 d-flex align-items-cente'>
            <IconNotification arlert={true} number={0}>
                <FontAwesomeIcon
                    onClick={() => {
                        if (userName) {
                            setShowMessage(!showMessage)
                        } else {
                            setLoginShow(true)
                        }
                    }}
                    className={styles.icon}
                    icon={faBell}
                ></FontAwesomeIcon>
                {showMessage
                    ?
                    <Message
                        setShowMessage={setShowMessage}
                    ></Message>
                    :
                    undefined}
            </IconNotification>
            <IconNotification arlert={false}>
                <FontAwesomeIcon
                    onClick={() => {
                        if (userName) {
                            navigate(routes.account.replace(':account', userName),)
                        } else {
                            setLoginShow(true)
                        }
                    }}
                    className={styles.icon}
                    icon={faUser}
                ></FontAwesomeIcon>
                <ModalComponent
                    header='Login Form'
                    visible={loginShow}
                    setShow={setLoginShow}
                >
                    <LoginPages setLoginShow={setLoginShow}></LoginPages>
                </ModalComponent>
            </IconNotification>
            {login
                ?
                <IconNotification arlert={false}>
                    <FontAwesomeIcon
                        onClick={logout}
                        className={styles.icon}
                        icon={faRightFromBracket}
                    ></FontAwesomeIcon>
                </IconNotification>
                :
                undefined}
        </div>
    </div>
}

export default Header