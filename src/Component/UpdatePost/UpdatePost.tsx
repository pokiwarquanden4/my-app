import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import { useAppDispatch, useAppSelector } from '../../App/hook';
import { toolbarOptions } from '../../Functions/Functions';
import styles from './UpdatePost.module.scss'
import { showAlert } from '../Alert/Alert';
import { IPost } from '../../pages/QuestionDetails/QuestionDetailsAPI';

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface IUpdatePost {
    setShowUpdatePost: Dispatch<SetStateAction<boolean>>
    onUpdatePost: (title?: string, subTitle?: string, content?: string, tags?: string[], show?: Dispatch<SetStateAction<boolean>>) => void
    questionDetails: IPost
}

function UpdatePost(props: IUpdatePost) {
    const tagsSlice = useAppSelector(store => store.data.tags)
    const [content, setContent] = useState<string>(props.questionDetails.content);
    const [title, setTitle] = useState<string>(props.questionDetails.title)
    const [subTitle, setSubTitle] = useState<string>(props.questionDetails.subTitle)
    const [tags, setTags] = useState<Tag[]>(
        (tagsSlice || [])
            .filter((tag) => props.questionDetails.tags.includes(tag))
            .map((tag, index) => {
                return {
                    id: String(index),
                    text: tag
                };
            })
    )
    const [contentFocus, setContentFocus] = useState<boolean>(false)
    const suggestions: Tag[] = (tagsSlice || []).map((tag, index) => {
        return {
            id: String(index),
            text: tag
        };
    });

    const handleDelete = useCallback((i: number) => {
        setTags((prevTags) => prevTags.filter((tag, index) => index !== i));
    }, []);

    const handleAddition = useCallback((tag: Tag) => {
        if (tagsSlice.includes(tag.text)) {
            setTags((prevTags) => [...prevTags, tag])
        } else {
            showAlert("Tag do not exsit", 'warning')
        };
    }, [tagsSlice]);

    return <div className={`pb-4 px-2 ${styles.wrapper}`}>
        <div className={`pt-4 ${styles.title}`}>
            <div className="border rounded-3 px-4 py-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    <div className={`h5 ${styles.title_header}`}>Title</div>
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
        <div className={`${styles.subtitle}`}>
            <div className="border rounded-3 px-4 py-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    <div className={`h5 ${styles.title_header}`}>Sub Title</div>
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
        <div className={`border rounded-3 ${styles.description} ${contentFocus ? styles.focus : undefined}`}>
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
        <div className={`pt-4 ${styles.Tags}`}>
            <div className="border rounded-3 px-4 py-3 mb-3 position-relative">
                <label htmlFor="tagsInput" className="form-label">
                    <div className={`h5 ${styles.title_header}`}>Tags</div>
                </label>
                <ReactTags
                    autofocus={false}
                    tags={tags}
                    suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    inputFieldPosition="bottom"
                    autocomplete
                />
            </div>
        </div>
        <div className={`${styles.submit} `}>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    props.onUpdatePost(title, subTitle, content, tags.map((tag) => tag.text), props.setShowUpdatePost)
                }}
            >Confirm</button>
        </div>
    </div>
}

export default UpdatePost