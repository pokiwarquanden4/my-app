import styles from './Questions.module.scss'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import OptionsListButton from '../../Component/OptionsListButton/OptionsListButton';
import TagsComponent from '../../Component/TagsComponent/TagsComponent';
import Avatar from '../../Component/Avatar/Avatar';
import { formatTimeAgo } from '../../Functions/Functions';
import Paging from '../../Component/Paging/Paging';
import SearchBar from '../../Component/SearchBar/SearchBar';
import { useAppDispatch, useAppSelector } from '../../App/hook';
import { IPosts, IPostsResponse, getPosts } from './QuestionsAPI';
import { useNavigate } from 'react-router-dom';
import { routes } from '../pages/pages';
import { loginShow } from '../../Reducers/UserSlice';
import UserNameLink from '../../Component/UserNameLink/UserNameLink';
import { Tag } from 'react-tag-input';
import ReactTagsComponent from '../../Component/ReactTags/ReactTagsComponent';
import { updateFilterTags } from '../../Reducers/DataSlice';

const filterList = [
    {
        name: "Newest"
    },
    {
        name: "Active"
    },
    {
        name: "Unanswered"
    },
    {
        name: "Star"
    },
    {
        name: "Answered"
    },
]

function Questions() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [focus, setFocus] = useState<number>(0)
    const [data, setData] = useState<IPosts[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageData, setPageData] = useState<JSX.Element[]>([])
    const [dataLength, setDataLength] = useState<number>(0)
    const [searchVal, setSearchVal] = useState<string>('')
    const searchValDelayRef = useRef<string>('')
    const userName = useAppSelector(store => store.user.data.account)
    const [showFilterByTags, setShowFilterByTags] = useState<boolean>(false)
    const filterTags = useAppSelector(store => store.data.filterTags)
    const [tags, setTags] = useState<Tag[]>(filterTags)

    useLayoutEffect(() => {
        const newPageData = data.map((item, index) => {
            return <div
                key={index}
                className={`pb-4 pt-3 d-flex ${styles.content_list}`}
            >
                <div className={`pe-3 d-flex flex-column justify-content-between ${styles.content_list_info}`}>
                    <div className={`${styles.rate}`}>{item.rate} rates</div>
                    <div className={`${styles.answere}`}>{item.answer} answeres</div>
                    <div className={`${styles.vertified}`}>{item.responses.filter(item => item.vertified === true).length} vertified</div>
                </div>
                <div className={`ps-4 flex-fill ${styles.content_list_data}`}>
                    <div className={`${styles.content_wrapper}  flex-fill`}>
                        <div
                            onClick={() => {
                                navigate(routes.questionDetail.replace(':questionId', item._id));
                            }}
                            className={styles.header}
                        >{item.title}</div>
                        <div className={`${styles.sumary} mb-3`}>{item.subTitle}</div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <TagsComponent type='tags' data={item.tags}></TagsComponent>
                        <div className={`pt-2 d-flex justify-content-end ${styles.content_footer}`}>
                            <div className={`d-flex align-items-center ${styles.account}`}>
                                <Avatar name='Quang' size='30' src={''}></Avatar>
                                <UserNameLink name={item.userId} styleVal='' fontSize='13px'></UserNameLink>
                            </div>
                            <div className={`ms-1 d-flex align-items-center ${styles.time}`}>
                                {formatTimeAgo(new Date(item.updatedAt))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        })
        setPageData(newPageData)
    }, [data, navigate])

    useEffect(() => {
        if (!((focus || focus === 0) && currentPage)) return
        const func = async () => {
            const res = await dispatch(getPosts({
                number: currentPage,
                type: filterList[focus].name,
                searchVal: searchVal,
                tags: filterTags.map((tag) => tag.text)
            }))
            const payload = res.payload as IPostsResponse

            setData(payload.data.posts || [])
            setDataLength(payload.data.totalCount || 0)

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
    }, [currentPage, dispatch, filterTags, focus, searchVal])

    const onFilterTags = useCallback(() => {
        dispatch(updateFilterTags(tags))
        setShowFilterByTags(false)
    }, [dispatch, tags])


    useEffect(() => {
        return () => {
            dispatch(updateFilterTags([]))
        }
    }, [dispatch])

    return <div className={`${styles.content}`}>
        <div className={`d-flex justify-content-between align-items-center ${styles.content_header}`}>
            <div className={`h4 mb-0 ${styles.content_header_content}`}>All Questions</div>
            <input
                onClick={() => {
                    if (userName) {
                        navigate(routes.ask)
                    } else {
                        dispatch(loginShow(true))
                    }
                }}
                className="btn btn-primary"
                type="button"
                value="Ask Questions"
            ></input>
        </div>
        <div className={`${styles.searchBar} pt-5`}>
            <SearchBar
                searchVal={searchVal}
                setSearchVal={setSearchVal}
            ></SearchBar>
        </div>
        <div className={`pb-3 pt-3 ${styles.content_filter}`}>
            <div className='d-flex align-items-center justify-content-between'>
                <div className={`${styles.questions_number}`}>{dataLength} questions</div>
                <div className={`${styles.questions_filter_items} d-flex flex-wrap`}>
                    <OptionsListButton
                        focus={focus}
                        setFocus={setFocus}
                        data={filterList}
                    ></OptionsListButton>
                    <button
                        onClick={() => {
                            if (!showFilterByTags) setTags(filterTags)
                            setShowFilterByTags(!showFilterByTags)
                        }}
                        type="button"
                        className={`btn btn-outline-secondary ms-1`}>
                        Filter
                    </button>
                </div>
            </div>
            <div className={`${styles.filter_tags} ${showFilterByTags ? styles.filter_tags_show : styles.filter_tags_hide}`}>
                <div className='pt-3'>
                    <label htmlFor="tagsInput" className="form-label">
                        <div className={`h6 ${styles.title_header}`}>Filter By Tags</div>
                    </label>
                    <ReactTagsComponent
                        tags={tags}
                        setTags={setTags}
                    ></ReactTagsComponent>
                </div>
                <div className={`${styles.submit} pt-4`}>
                    <button type="button" className="btn btn-primary" onClick={onFilterTags}>Apply Filter</button>
                </div>
            </div>
        </div>
        <div className={`${styles.content_lists}`}>
            <Paging
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                data={pageData}
                numberPerPage={10}
                dataLength={dataLength}
            ></Paging>
        </div>
    </div>
}

export default Questions