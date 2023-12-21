import SearchBar from '../../../Component/SearchBar/SearchBar'
import styles from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import IconNotification from '../../../Component/IconNotification/IconNotification'
import ModalComponent from '../../../Component/Modal/ModalComponent'
import { useCallback, useEffect, useState } from 'react'
import LoginPages from '../../../pages/LoginPages/LoginPages'
import QuestionSearch, { IQuestionContent } from '../../../Component/SearchBar/QuestionSearch/QuestionSearch'
import Message from '../../../Component/Message/Message'
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../pages/pages/pages'
import { useAppDispatch } from '../../../App/hook'
import { postsSearch } from './HeaderAPI'

// const searchData = [
//     {
//         size: '40',
//         name: 'pokiwar',
//         src: 'data:image/png;base64,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',
//         main_content: 'Why is processing a sorted array faster than processing an unsorted array?',
//         sub_content: 'Trên bờ biển đầy sóng vỗ, tôi đứng đối diện với mặt biển bao la. Những ngọn sóng cao đánh đập vào bờ cát trắng mịn, tạo ra tiếng sóng biển vang vọng khắp nơi. Bầu trời trong xanh vô tận trải rộng phía trên, và tia nắng ấm áp chiếu xuống, làm cho biển cả trở nên sáng bóng và lấp lánh. Tôi hít thở bầu không khí mặn mà của biển và cảm nhận sự tự do trong từng hơi thở. Cảm giác này khiến tôi thấy minh chứng cho sự kỳ diệu của tự nhiên và sức mạnh của biển cả vô tận.'
//     },
//     {
//         size: '40',
//         name: 'pokiwar',
//         src: 'data:image/png;base64,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',
//         main_content: 'Why is processing a sorted array faster than processing an unsorted array?',
//         sub_content: 'Trên bờ biển đầy sóng vỗ, tôi đứng đối diện với mặt biển bao la. Những ngọn sóng cao đánh đập vào bờ cát trắng mịn, tạo ra tiếng sóng biển vang vọng khắp nơi. Bầu trời trong xanh vô tận trải rộng phía trên, và tia nắng ấm áp chiếu xuống, làm cho biển cả trở nên sáng bóng và lấp lánh. Tôi hít thở bầu không khí mặn mà của biển và cảm nhận sự tự do trong từng hơi thở. Cảm giác này khiến tôi thấy minh chứng cho sự kỳ diệu của tự nhiên và sức mạnh của biển cả vô tận.'
//     }
// ]

function Header() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [login, setLogin] = useState<boolean>(false)
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [loginShow, setLoginShow] = useState<boolean>(false)
    const [searchFocus, setSearchFocus] = useState<boolean>(false)
    const [searchVal, setSearchVal] = useState<string>('')
    const [searchData, setSearchData] = useState<IQuestionContent[]>([])
    const [postId, setPostId] = useState<string | undefined>()

    useEffect(() => {
        const checkLoginStatus = () => {
            if (localStorage.getItem("token") || localStorage.getItem("refresh_token")) {
                setLogin(true);
            } else {
                setLogin(false);
            }
        };

        // Initial check when the component mounts
        checkLoginStatus();

        // Subsequent checks when localStorage changes
        window.addEventListener("storage", checkLoginStatus);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("storage", checkLoginStatus);
        };
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.dispatchEvent(new Event("storage"));
        navigate(routes.home)
    }, [navigate])

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
        }
    }, [navigate, postId, searchFocus])

    return <div className={`container-fluid d-flex justify-content-around align-items-center ${styles.wrapper}`}>
        <img
            src="https://cdn.shopify.com/s/files/1/0438/9070/4538/files/logo.png?v=1614325954"
            className={`px-5 ${styles.logo}`}
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
                        setShowMessage(!showMessage)
                    }}
                    className={styles.icon}
                    icon={faBell}
                ></FontAwesomeIcon>
                {showMessage ? <Message></Message> : undefined}
            </IconNotification>
            <IconNotification arlert={false}>
                <FontAwesomeIcon onClick={() => { setLoginShow(true) }} className={styles.icon} icon={faUser}></FontAwesomeIcon>
                <ModalComponent
                    header='Login Form'
                    confirm='Login'
                    visible={loginShow}
                    setLoginShow={setLoginShow}
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