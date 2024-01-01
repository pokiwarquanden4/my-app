import { useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tag } from 'react-tag-input';
import { useAppDispatch } from '../../App/hook';
import ReactTagsComponent from '../../Component/ReactTags/ReactTagsComponent';
import { toolbarOptions } from '../../Functions/Functions';
import { createPosts } from '../Questions/QuestionsAPI';
import styles from './Ask.module.scss';

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function Ask() {
    const dispatch = useAppDispatch()
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('')
    const [subTitle, setSubTitle] = useState<string>('')
    const [tags, setTags] = useState<Tag[]>([])
    const [contentFocus, setContentFocus] = useState<boolean>(false)

    const onSubmit = useCallback(async () => {
        dispatch(createPosts({
            title: title,
            subTitle: subTitle,
            content: content,
            tags: tags.map((tag) => tag.text)
        }))
    }, [content, dispatch, subTitle, tags, title])

    return <div className={`pb-4 ${styles.wrapper}`}>
        <div className={`h4 ${styles.header}`}>
            Review your question
        </div>
        <div className={`pt-4 ${styles.title}`}>
            <div className="border rounded-3 px-4 py-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    <div className={`h5 ${styles.title_header}`}>Title</div>
                    <div className={`form-text ${styles.title_comment}`}>Be specific and imagine you’re asking a question to another person.</div>
                </label>
                <input
                    type="email"
                    placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                    className={`form-control ${styles.title_input}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                >
                </input>
            </div>
        </div>
        <div className={`${styles.subtitle} ${title ? styles.enable : styles.disable}`}>
            <div className="border rounded-3 px-4 py-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    <div className={`h5 ${styles.title_header}`}>Sub Title</div>
                    <div className={`form-text ${styles.title_comment}`}>Quick overview your problem</div>
                </label>
                <input
                    type="email"
                    placeholder='Write about your problems here'
                    className={`form-control ${styles.title_input}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={subTitle}
                    onChange={(e) => { setSubTitle(e.target.value) }}
                >
                </input>
            </div>
        </div>
        <div className={`border rounded-3 ${styles.description} ${title && subTitle ? styles.enable : styles.disable} ${contentFocus ? styles.focus : undefined}`}>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                formats={
                    ['code-block',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'code',
                        'image',
                        'header',
                        'color',
                        'background',
                        'font'
                    ]
                }
                modules={
                    {
                        toolbar: toolbarOptions
                    }
                }
                onFocus={() => { setContentFocus(true) }}
                onBlur={() => { setContentFocus(false) }}
            />
            <style>
                {`
                    .ql-container {
                        height: 300px;
                    }
                `}
            </style>
        </div>
        <div className={`pt-4 ${styles.Tags} ${title && subTitle && content && content !== '<p><br></p>' ? styles.enable : styles.disable}`}>
            <div className="border rounded-3 px-4 py-3 mb-3 position-relative">
                <label htmlFor="tagsInput" className="form-label">
                    <div className={`h5 ${styles.title_header}`}>Tags</div>
                    <div className={`form-text ${styles.title_comment}`}>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</div>
                </label>
                <ReactTagsComponent
                    tags={tags}
                    setTags={setTags}
                ></ReactTagsComponent>
            </div>
        </div>
        <div className={`${styles.submit} ${title && subTitle && content && content !== '<p><br></p>' && tags ? styles.enable : styles.disable}`}>
            <button type="button" className="btn btn-primary" onClick={onSubmit}>Confirm Your Question</button>
        </div>
    </div>
}

export default Ask