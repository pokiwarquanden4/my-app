import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styles from './Ask.module.scss'
import { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Ask() {
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );
    const [descriptionFocus, setDescriptionFocus] = useState<boolean>(false)

    return <div className={styles.wrapper}>
        <div className={`h4 ${styles.header}`}>
            Review your question
        </div>
        <div className={`pt-4 ${styles.title}`}>
            <div className="border rounded-3 px-4 py-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    <div className={`h5 ${styles.title_header}`}>Title</div>
                    <div className={`form-text ${styles.title_comment}`}>Be specific and imagine you’re asking a question to another person.</div>
                </label>
                <input type="email" placeholder='e.g. Is there an R function for finding the index of an element in a vector?' className={`form-control ${styles.title_input}`} id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            </div>
        </div>
        <div className={`border rounded-3 ${styles.description} ${descriptionFocus ? styles.focus : undefined}`}>
            <Editor
                onFocus={() => {
                    setDescriptionFocus(true)
                }}
                onBlur={() => {
                    setDescriptionFocus(false)
                }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
        </div>
        <div className={`pt-4 ${styles.Tags}`}>
            <div className="border rounded-3 px-4 py-3 mb-3">
                <label htmlFor="tagsInput" className="form-label">
                    <div className={`h5 ${styles.title_header}`}>Tags</div>
                    <div className={`form-text ${styles.title_comment}`}>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</div>
                </label>
                <input type="email" className={`form-control ${styles.title_input}`} id="tagsInput" aria-describedby="emailHelp"></input>
            </div>
        </div>
    </div>
}

export default Ask