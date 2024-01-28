import { useEffect, useRef, useState } from 'react'
import Avatar from '../../Component/Avatar/Avatar'
import OptionsListButton from '../../Component/OptionsListButton/OptionsListButton'
import SearchBar from '../../Component/SearchBar/SearchBar'
import styles from './Users.module.scss'
import { useAppDispatch } from '../../App/hook'
import { getUsersPaging } from './UsersAPI'
import Paging from '../../Component/Paging/Paging'
import UserNameLink from '../../Component/UserNameLink/UserNameLink'
import { useNavigate } from 'react-router-dom'
import { routes } from '../pages/pages'
import { updateFilterTags } from '../../Reducers/DataSlice'

interface IUsersSimpleData {
    name: string,
    account: string,
    avatarURL: string,
    techTags: string[]
    postNumber: number
    totalRate: number
}

const filterLists = [
    {
        name: "Popular"
    },
    {
        name: "A-Z"
    },
    {
        name: "New"
    },
]

function Users() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [focus, setFocus] = useState<number>(0)
    const [searchVal, setSearchVal] = useState<string>('')
    const [usersSimpleData, setUsersSimpleData] = useState<IUsersSimpleData[]>([])
    const [dataLength, setDataLength] = useState<number>(0)
    const [pageData, setPageData] = useState<JSX.Element[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const searchValDelayRef = useRef<string>('')

    useEffect(() => {
        const func = async () => {
            const res = await dispatch(getUsersPaging({
                currentPage: currentPage,
                type: filterLists[focus].name,
                searchVal: searchVal
            }))
            if (res.payload.status === 200) {
                setUsersSimpleData(res.payload.data.users as IUsersSimpleData[])
                setDataLength(res.payload.data.totalUsersCount as number)
            }

            searchValDelayRef.current = searchVal
        }

        if (searchValDelayRef.current === searchVal) {
            func()
        } else {
            const timeout = setTimeout(func, 500)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [currentPage, dispatch, focus, searchVal])

    useEffect(() => {
        const newPageData = usersSimpleData.map((item, index) => {
            return <div key={index} className={`d-flex ${styles.contents_tag_wrapper} mb-4`}>
                <Avatar
                    name={item.account}
                    size='70'
                    src={item.avatarURL}
                ></Avatar>
                <div className={`ps-2 d-flex justify-content-between align-items-center w-100 ${styles.info}`}>
                    <div>
                        <UserNameLink name={item.account} styleVal='h5'></UserNameLink>
                        <div className={`${styles.subName} h6`}>{item.name}</div>
                    </div>
                    <div>
                        <div className={`${styles.tags} pb-1`}>
                            {item.techTags.map((tag, index) => {
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                return <a
                                    key={index}
                                    style={{ cursor: 'pointer' }}
                                    className={`${styles.tag}`}
                                    onClick={() => {
                                        navigate(routes.questions)
                                        dispatch(updateFilterTags([{
                                            id: '0',
                                            text: tag
                                        }]))
                                    }}
                                >{tag}</a>
                            })}
                        </div>
                        <div className={`${styles.postNumber} pb-1`}>Questions: {item.postNumber}</div>
                        <div className={styles.rateNumer}>Rate: {item.totalRate}</div>
                    </div>
                </div>
            </div>
        })

        setPageData(newPageData)
    }, [usersSimpleData])

    return <div className={`${styles.wrapper}`}>
        <div className={`h3 pb-3 ${styles.header}`}>Users</div>
        <div className={`d-flex ${styles.filter}`}>
            <SearchBar
                searchVal={searchVal}
                setSearchVal={setSearchVal}
            ></SearchBar>
            <div className='ps-5'>
                <OptionsListButton
                    focus={focus}
                    setFocus={setFocus}
                    data={filterLists}
                ></OptionsListButton>
            </div>
        </div>
        <div className={`pt-5 ${styles.contents}`}>
            <div className={`row pt-3 gy-4 ${styles.content}`}>
                <div className={`col-6 col-lg-4 w-100 ${styles.contents_tag}`}>
                    <Paging
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        data={pageData}
                        numberPerPage={10}
                        dataLength={dataLength}
                    ></Paging>
                </div>
            </div>
        </div>
    </div>
}

export default Users