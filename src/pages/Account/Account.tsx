import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faPen, faLock, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from '../../App/hook'
import Avatar from '../../Component/Avatar/Avatar'
import styles from './Account.module.scss'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { IPost, IResponse } from '../QuestionDetails/QuestionDetailsAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserProfile, updateUserProfile } from './AccountAPI'
import TagsComponent from '../../Component/TagsComponent/TagsComponent'
import OptionsListButton from '../../Component/OptionsListButton/OptionsListButton'
import { formatTimeAgo } from '../../Functions/Functions'
import { routes } from '../pages/pages'
import parse from 'html-react-parser';
import ModalComponent from '../../Component/Modal/ModalComponent'
import EditAccount from './EditAccount/EditAccount'
import { showAlert } from '../../Component/Alert/Alert'

interface IUserProfile {
    account: string;
    avatarURL: string;
    name: string;
    email: string;
    techTags: string[],
    heartNumber: number;
    userPost: IPost[];
    userResponse: IResponse[]
}

const filterLists = [
    {
        number: 0,
        name: "Top Post"
    },
    {
        number: 1,
        name: "Top Response"
    },
]

const iconResponse = () => {
    return <svg className="svg-icon iconAnswer" width="18" height="18" viewBox="0 0 18 18">
        <title>answer</title>
        <path d="M14 15H3c-1.09 0-2-.91-2-2V4c0-1.1.9-2 2-2h12c1.09 0 2 .91 2 2v14l-3-3Zm-1.02-3L9.82 4H8.14l-3.06 8h1.68l.65-1.79h3.15l.69 1.79h1.73Zm-2.93-3.12H7.9l1.06-2.92 1.09 2.92Z"></path>
    </svg>
}

const iconPost = () => {
    return <svg
        className="svg-icon iconQuestion"
        width="18" height="18" viewBox="0 0 18 18">
        <title>question</title>
        <path d="m4 15-3 3V4c0-1.1.9-2 2-2h12c1.09 0 2 .91 2 2v9c0 1.09-.91 2-2 2H4Zm7.75-3.97c.72-.83.98-1.86.98-2.94 0-1.65-.7-3.22-2.3-3.83a4.41 4.41 0 0 0-3.02 0 3.8 3.8 0 0 0-2.32 3.83c0 1.29.35 2.29 1.03 3a3.8 3.8 0 0 0 2.85 1.07c.62 0 1.2-.11 1.71-.34.65.44 1 .68 1.06.7.23.13.46.23.7.3l.59-1.13a5.2 5.2 0 0 1-1.28-.66Zm-1.27-.9a5.4 5.4 0 0 0-1.5-.8l-.45.9c.33.12.66.29.98.5-.2.07-.42.11-.65.11-.61 0-1.12-.23-1.52-.68-.86-1-.86-3.12 0-4.11.8-.9 2.35-.9 3.15 0 .9 1.01.86 3.03-.01 4.08Z"></path>
    </svg>
}

function Account() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [focus, setFocus] = useState<number>(0)
    const params = useParams()
    const accountName = useMemo(() => {
        return params.account
    }, [params.account])
    const [currentUserData, setCurrentUserData] = useState<IUserProfile>()
    const userData = useAppSelector(store => store.user.data)
    const [updateForm, setUpdateForm] = useState<boolean>(false)
    const [changeName, setChangeName] = useState<string | undefined>(undefined)

    useEffect(() => {
        const func = async (account: string) => {
            const res = await dispatch(getUserProfile(account))

            if (res.payload.status === 200) {
                const data = res.payload.data.user as IUserProfile
                setCurrentUserData(data)
            }
        }

        if (accountName) {
            func(accountName)
        }
    }, [accountName, dispatch])

    const handleSubmit = useCallback(async (name: string, value: string) => {

        // Conditional logic:
        const formData = new FormData();
        formData.append(name, value);

        const res = await dispatch(updateUserProfile(formData))
        if (res.payload.status === 200) {
            setCurrentUserData((preData) => {
                if (!preData) return
                return {
                    ...preData,
                    name: res.payload.data.name,
                    avatarURL: res.payload.data.avatarURL
                }
            })
        }

    }, [dispatch])

    return <div className={styles.wrapper}>
        {currentUserData
            ?
            <Fragment>
                <div className={`${styles.header} d-flex justify-content-between`}>
                    <div className={`d-flex align-items-center ${styles.info}`}>
                        <div className={`${styles.avatar} border rounded-3 position-relative`} style={{ cursor: 'pointer' }}>
                            <Avatar
                                name={currentUserData.account}
                                src={currentUserData.avatarURL}
                                noRadius={true}
                            ></Avatar>
                        </div>
                        <div className={`ps-3 ${styles.user_info}`}>
                            <div className={`h2 ${styles.name} d-flex align-items-center`}>
                                {
                                    userData.account === accountName
                                        ?
                                        changeName === undefined
                                            ?
                                            <Fragment>
                                                {currentUserData.name}
                                                <FontAwesomeIcon
                                                    className='ps-3 h5'
                                                    style={{ marginBottom: '0px', cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setChangeName(currentUserData.name)
                                                    }}
                                                    icon={faPen}
                                                ></FontAwesomeIcon>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <input
                                                    type='text'
                                                    value={changeName}
                                                    onChange={(e) => {
                                                        setChangeName(e.target.value)
                                                    }}
                                                    onBlur={() => {
                                                        setChangeName(undefined)
                                                    }}
                                                ></input>
                                                <FontAwesomeIcon
                                                    className='ps-3 h5'
                                                    style={{ marginBottom: '0px', cursor: 'pointer' }}
                                                    onClick={(e) => {
                                                        if (changeName) {
                                                            setChangeName(undefined)
                                                            handleSubmit('name', changeName)
                                                        } else {
                                                            showAlert('Name can not be blank', 'info')
                                                        }

                                                    }}
                                                    icon={faSave}
                                                ></FontAwesomeIcon>
                                            </Fragment>
                                        :
                                        currentUserData.name


                                }

                            </div>
                            <div className={`${styles.detail} d-flex align-items-center`}>
                                <div className={`${styles.heart_number} d-flex align-items-center`}>
                                    <FontAwesomeIcon className={styles.heart_number_icon} icon={faHeart}></FontAwesomeIcon>
                                    <div className={`${styles.heart_number_content} ps-1`}>{currentUserData.heartNumber} contribution</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        userData.account === accountName
                            ?
                            <div className={styles.edit}>
                                <button
                                    type="button"
                                    className={`btn btn-outline-secondary d-flex align-items-center`}
                                    onClick={() => {
                                        setUpdateForm(true)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                    <div className='ps-2'>Change Password</div>
                                </button>
                            </div>
                            :
                            undefined
                    }
                </div>
                <div className={`${styles.content} mt-4 d-flex`}>
                    <div className={`${styles.stats}`}>
                        <div className='h6'>Stats</div>
                        <div className={`${styles.stats_content} d-flex`}>
                            <div className='border rounded-3 p-3'>
                                <div className={`${styles.stats_data} mb-2`}>
                                    Post number: <span className={`${styles.stats_value} ms-2`}>{currentUserData.userPost.length}</span>
                                </div>
                                <div className={`${styles.stats_data} mb-2`}>
                                    Response number:<span className={`${styles.stats_value} ms-2`}>{currentUserData.userResponse.length}</span>
                                </div>
                                <div className={`${styles.stats_data} mb-2`}>
                                    Total heart: <span className={`${styles.stats_value} ms-2`}>{currentUserData.heartNumber}</span>
                                </div>
                                <div className={`${styles.stats_data} mb-2`}>
                                    <div className='mb-2'>Technology:</div>
                                    <TagsComponent type='tags' data={currentUserData.techTags}></TagsComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.stats} ms-4 flex-fill`}>
                        <div className='d-flex justify-content-between mb-3'>
                            <div className='h6'>Tags</div>
                            <OptionsListButton
                                focus={focus}
                                setFocus={setFocus}
                                data={filterLists}
                            ></OptionsListButton>
                        </div>
                        <div>
                            {focus === 0
                                ?
                                currentUserData.userPost.length ?
                                    currentUserData.userPost.map((item, index) => {
                                        return <div
                                            key={index}
                                            className={`${styles.item} border rounded-1 p-2 d-flex align-items-center justify-content-between`}
                                            onClick={() => {
                                                navigate(routes.questionDetail.replace(':questionId', item._id));
                                            }}
                                        >
                                            <div className='d-flex align-items-center'>
                                                {iconPost()}
                                                <div className={`border rounded-2 p-1 ms-2 text-center ${styles.number}`}>{item.rate.length}</div>
                                                <div className='ms-2 text-primary'>{item.title}</div>
                                            </div>
                                            <div><small className='d-flex align-items-center'>{formatTimeAgo(new Date(item.createdAt))}</small></div>
                                        </div>
                                    })
                                    :
                                    <div className='text-center pt-3' style={{ fontSize: '18px', color: "lightgray" }}>User do not have any post</div>
                                :
                                undefined
                            }
                            {focus === 1
                                ?
                                currentUserData.userResponse.length ?
                                    currentUserData.userResponse.map((item, index) => {
                                        return <div
                                            key={index}
                                            className={`${styles.item} border rounded-1 p-2 d-flex align-items-center justify-content-between`}
                                            onClick={() => {
                                                navigate(routes.questionDetail.replace(':questionId', item.post).replace(':responseId', item._id));
                                            }}
                                        >
                                            <div className='d-flex align-items-center'>
                                                {iconResponse()}
                                                <div className={`border rounded-2 p-1 ms-2 text-center ${styles.number}`}>{item.rate.length}</div>
                                                <div className='ms-2 text-primary'>{parse(item.content)}</div>
                                            </div>
                                            <div><small className='d-flex align-items-center'>{formatTimeAgo(new Date(item.createdAt))}</small></div>
                                        </div>
                                    })
                                    :
                                    <div className='text-center pt-3' style={{ fontSize: '18px', color: "lightgray" }}>User do not have any response</div>
                                :
                                undefined
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
            :
            undefined
        }

        <ModalComponent
            header='Change Password'
            visible={updateForm}
            setShow={setUpdateForm}
        >
            <EditAccount
                setShow={setUpdateForm}
                userData={userData}
            ></EditAccount>
        </ModalComponent>
    </div>
}

export default Account

