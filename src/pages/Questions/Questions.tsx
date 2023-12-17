import styles from './Questions.module.scss'
import { useEffect, useLayoutEffect, useState } from 'react';
import OptionsListButton from '../../Component/OptionsListButton/OptionsListButton';
import TagsComponent from '../../Component/TagsComponent/TagsComponent';
import Avatar from '../../Component/Avatar/Avatar';
import { formatTimeAgo } from '../../Functions/Functions';
import Paging from '../../Component/Paging/Paging';
import SearchBar from '../../Component/SearchBar/SearchBar';
import { useAppDispatch } from '../../App/hook';
import { IPosts, IPostsResponse, getPosts } from './QuestionsAPI';

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
    const dispatch = useAppDispatch()
    const [focus, setFocus] = useState<number>(0)
    const [data, setData] = useState<IPosts[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageData, sePageData] = useState<JSX.Element[]>([])
    const [dataLength, setDataLength] = useState<number>(0)
    const [searchVal, setSearchVal] = useState<string>('')

    useLayoutEffect(() => {
        const newPageData = data.map((item, index) => {
            return <div
                key={index}
                className={`pb-4 pt-3 d-flex ${styles.content_list}`}
            >
                <div className={`pe-3 d-flex flex-column justify-content-between ${styles.content_list_info}`}>
                    <div className={`${styles.rate}`}>{item.rate} rates</div>
                    <div className={`${styles.answere}`}>{item.answer} answeres</div>
                    <div className={`${styles.vertified}`}>{item.verified} vertified</div>
                </div>
                <div className={`ps-4 flex-fill ${styles.content_list_data}`}>
                    <div className={`${styles.content_wrapper}  flex-fill`}>
                        <div className={styles.header}>{item.title}</div>
                        <div className={`${styles.sumary} mb-3`}>{item.subTitle}</div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <TagsComponent data={item.tags}></TagsComponent>
                        <div className={`pt-2 d-flex justify-content-end ${styles.content_footer}`}>
                            <div className={`d-flex align-items-center ${styles.account}`}>
                                <Avatar size='30' src={''}></Avatar>
                                <div className={styles.account_name}>{item.userId}</div>
                            </div>
                            <div className={`ms-1 d-flex align-items-center ${styles.time}`}>
                                {formatTimeAgo(new Date(item.updatedAt))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        })
        sePageData(newPageData)
    }, [data])

    useEffect(() => {
        if (!((focus || focus === 0) && currentPage)) return
        const func = async () => {
            const res = await dispatch(getPosts({
                number: currentPage,
                type: filterList[focus].name
            }))
            const payload = res.payload as IPostsResponse

            setData(payload.data.posts || [])
            setDataLength(payload.data.totalCount || 0)
        }

        func()
    }, [currentPage, dispatch, focus])

    return <div className={`${styles.content}`}>
        <div className={`d-flex justify-content-between align-items-center ${styles.content_header}`}>
            <div className={`h4 mb-0 ${styles.content_header_content}`}>All Questions</div>
            <input className="btn btn-primary" type="button" value="Ask Questions"></input>
        </div>
        <div className={`${styles.searchBar} pt-5`}>
            <SearchBar
                searchVal={searchVal}
                setSearchVal={setSearchVal}
            ></SearchBar>
        </div>
        <div className={`d-flex pb-3 align-items-center justify-content-between pt-3 ${styles.content_filter}`}>
            <div className={`${styles.questions_number}`}>23,938,061 questions</div>
            <div className={`${styles.questions_filter_items}`}>
                <OptionsListButton
                    focus={focus}
                    setFocus={setFocus}
                    data={filterList}
                ></OptionsListButton>
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