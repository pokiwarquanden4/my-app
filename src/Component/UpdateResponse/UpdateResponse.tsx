import { Dispatch, SetStateAction, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toolbarOptions } from '../../Functions/Functions';
import { IResponse } from '../../pages/QuestionDetails/QuestionDetailsAPI';
import styles from './UpdateResponse.module.scss';

interface IUpdateResponse {
    setShowUpdateResponse: Dispatch<SetStateAction<boolean>>
    onUpdateResponse: (responseId: string, content: string, show: Dispatch<SetStateAction<boolean>>) => void
    responseData: IResponse
}

function UpdateResponse(props: IUpdateResponse) {
    const [content, setContent] = useState<string>(props.responseData.content);
    const [contentFocus, setContentFocus] = useState<boolean>(false)

    return <div className={` px-2 ${styles.wrapper}`}>
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
        <div className={`${styles.submit} pt-4`}>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    props.onUpdateResponse(props.responseData._id, content, props.setShowUpdateResponse)
                }}
            >Confirm</button>
        </div>
    </div>
}

export default UpdateResponse