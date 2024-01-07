import { useEffect, useState } from 'react'
import OptionsListButton from '../../Component/OptionsListButton/OptionsListButton'
import SearchBar from '../../Component/SearchBar/SearchBar'
import TagsComponent from '../../Component/TagsComponent/TagsComponent'
import styles from './Tags.module.scss'
import { useAppSelector } from '../../App/hook'
import { ITags } from '../../Reducers/DataSlice'

const filterLists = [
    {
        number: 0,
        name: "A-Z"
    },
    {
        number: 1,
        name: "Popular"
    },
]


function Tags() {
    const [focus, setFocus] = useState<number>(0)
    const [searchVal, setSearchVal] = useState<string>('')
    const tagsDetails = useAppSelector(store => store.data.tagsDetails)
    const [tagsShort, setTagsShort] = useState<ITags[]>([])

    useEffect(() => {
        let sortedTagsList
        switch (focus) {
            case 0:
                sortedTagsList = [...tagsDetails].sort((a, b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase())).filter(item => item.value.toLowerCase().includes(searchVal.toLowerCase()));
                setTagsShort(sortedTagsList)
                break
            case 1:
                sortedTagsList = [...tagsDetails].sort((a, b) => b.popular - a.popular).filter(item => item.value.toLowerCase().includes(searchVal.toLowerCase()));
                setTagsShort(sortedTagsList)
                break
        }
    }, [focus, searchVal, tagsDetails])

    return <div className={`${styles.wrapper}`}>
        <div className={`h3 pb-2 ${styles.header}`}>Tags</div>
        <div className={`pb-4 ${styles.sub_header}`}>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</div>
        <div className={`d-flex ${styles.filer}`}>
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
        <div className={`row pt-3 gy-3 ${styles.contents}`}>
            {tagsShort.map((tag, index) => {
                return <div key={index} className={`col-6 col-lg-4 ${styles.contents_tag}`}>
                    <div className={`${styles.contents_tag_wrapper} pt-2`}>
                        <TagsComponent type='tags' data={[tag.value]}></TagsComponent>
                        <div className={`pt-2 ${styles.content} mb-2`}>{tag.description}</div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default Tags