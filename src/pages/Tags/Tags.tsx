import OptionsListButton from '../../Component/OptionsListButton/OptionsListButton'
import SearchBar from '../../Component/SearchBar/SearchBar'
import TagsComponent from '../../Component/TagsComponent/TagsComponent'
import styles from './Tags.module.scss'

const filterLists = [
    {
        name: "Poppular"
    },
    {
        name: "A-Z"
    },
    {
        name: "New"
    },
]


function Tags() {
    return <div className={`${styles.wrapper}`}>
        <div className={`h3 pb-2 ${styles.header}`}>Tags</div>
        <div className={`pb-4 ${styles.sub_header}`}>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</div>
        <div className={`d-flex ${styles.filer}`}>
            <SearchBar></SearchBar>
            <div className='ps-5'><OptionsListButton data={filterLists}></OptionsListButton></div>
        </div>
        <div className={`row pt-3 gy-3 ${styles.contents}`}>
            <div className={`col-6 col-lg-4 ${styles.contents_tag}`}>
                <div className={`${styles.contents_tag_wrapper} pt-2`}>
                    <TagsComponent data={[{ name: "Java" }]}></TagsComponent>
                    <div className={`pt-2 ${styles.content}`}>
                        For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java. Include all tags that are relevant…
                    </div>
                    <div className={`pt-2 d-flex ${styles.content_info}`}>
                        <div className={`${styles.number}`}>2515434 questions</div>
                        <div className={`${styles.askRecent}`}>176 asked today, 200 this week</div>
                    </div>
                </div>
            </div>
            <div className={`col-6 col-lg-4 ${styles.contents_tag}`}>
                <div className={`${styles.contents_tag_wrapper} pt-2`}>
                    <TagsComponent data={[{ name: "Java" }]}></TagsComponent>
                    <div className={`pt-2 ${styles.content}`}>
                        For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java. Include all tags that are relevant…
                    </div>
                    <div className={`pt-2 d-flex ${styles.content_info}`}>
                        <div className={`${styles.number}`}>2515434 questions</div>
                        <div className={`${styles.askRecent}`}>176 asked today, 200 this week</div>
                    </div>
                </div>
            </div>
            <div className={`col-6 col-lg-4 ${styles.contents_tag}`}>
                <div className={`${styles.contents_tag_wrapper} pt-2`}>
                    <TagsComponent data={[{ name: "Java" }]}></TagsComponent>
                    <div className={`pt-2 ${styles.content}`}>
                        For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java. Include all tags that are relevant…
                    </div>
                    <div className={`pt-2 d-flex ${styles.content_info}`}>
                        <div className={`${styles.number}`}>2515434 questions</div>
                        <div className={`${styles.askRecent}`}>176 asked today, 200 this week</div>
                    </div>
                </div>
            </div>
            <div className={`col-6 col-lg-4 ${styles.contents_tag}`}>
                <div className={`${styles.contents_tag_wrapper} pt-2`}>
                    <TagsComponent data={[{ name: "Java" }]}></TagsComponent>
                    <div className={`pt-2 ${styles.content}`}>
                        For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java. Include all tags that are relevant…
                    </div>
                    <div className={`pt-2 d-flex ${styles.content_info}`}>
                        <div className={`${styles.number}`}>2515434 questions</div>
                        <div className={`${styles.askRecent}`}>176 asked today, 200 this week</div>
                    </div>
                </div>
            </div>
            <div className={`col-6 col-lg-4 ${styles.contents_tag}`}>
                <div className={`${styles.contents_tag_wrapper} pt-2`}>
                    <TagsComponent data={[{ name: "Java" }]}></TagsComponent>
                    <div className={`pt-2 ${styles.content}`}>
                        For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java. Include all tags that are relevant…
                    </div>
                    <div className={`pt-2 d-flex ${styles.content_info}`}>
                        <div className={`${styles.number}`}>2515434 questions</div>
                        <div className={`${styles.askRecent}`}>176 asked today, 200 this week</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Tags