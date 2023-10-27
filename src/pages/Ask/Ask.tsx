import styles from './Ask.module.scss'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['code-block', 'image'],

    [{ 'header': [] }],               // custom button values

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
];

function Ask() {
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('')
    const [tags, setTags] = useState<string>('')
    const [contentFocus, setContentFocus] = useState<boolean>(false)
    console.log(content)
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
        <div className={`border rounded-3 ${styles.description} ${title ? styles.enable : styles.disable} ${contentFocus ? styles.focus : undefined}`}>
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
        <div className={`pt-4 ${styles.Tags} ${title && content ? styles.enable : styles.disable}`}>
            <div className="border rounded-3 px-4 py-3 mb-3">
                <label htmlFor="tagsInput" className="form-label">
                    <div className={`h5 ${styles.title_header}`}>Tags</div>
                    <div className={`form-text ${styles.title_comment}`}>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</div>
                </label>
                <input
                    type="email"
                    className={`form-control ${styles.title_input}`}
                    id="tagsInput"
                    aria-describedby="emailHelp"
                    onChange={(e) => { setTags(e.target.value) }}
                    value={tags}
                >
                </input>
            </div>
        </div>
        <div className={`${styles.submit} ${title && content && tags ? styles.enable : styles.disable}`}>
            <button type="button" className="btn btn-primary">Confirm Your Question</button>
        </div>
    </div>
}

export default Ask