import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { formatTimeAgo, toolBarSmallOptions } from '../../Functions/Functions';
import { IComment, IResponse } from '../../pages/QuestionDetails/QuestionDetailsAPI';
import Avatar from '../Avatar/Avatar';
import styles from './ContentQuestion.module.scss';
import TagsComponent from '../TagsComponent/TagsComponent';
import ModalComponent from '../Modal/ModalComponent';
import UpdateResponse from '../UpdateResponse/UpdateResponse';
import { useAppSelector } from '../../App/hook';
import UserNameLink from '../UserNameLink/UserNameLink';
import parse from 'html-react-parser';

interface IContentQuestion {
    onFollowReponse: (responseId: string, follow: boolean) => void
    onUpdateResponse: (responseId: string, content: string, show: Dispatch<SetStateAction<boolean>>) => void
    comment: IComment[] | undefined
    onGetComment: (responseId: string, setShowComment: Dispatch<SetStateAction<boolean>>) => void
    onCreateComment: (responseId: string, content: string, setShowComment: Dispatch<SetStateAction<boolean>>) => void
    responseData: IResponse
    classValue?: string
}

function ResponseContentQuestion(props: IContentQuestion) {
    const [content, setContent] = useState<string>('');
    const [showComment, setShowComment] = useState<boolean>(false)
    const [commentContent, setCommentContent] = useState<string>();
    const [smallComment, setSmallComment] = useState<boolean>(false)
    const [showUpdateResponse, setShowUpdateResponse] = useState<boolean>(false)
    const userDetails = useAppSelector(store => store.user.data)

    useEffect(() => {
        setContent(props.responseData.content)
    }, [props.responseData.content])

    return <div className={`${styles.content} ${props.classValue}`}>
        <ReactQuill
            readOnly
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
                    toolbar: null
                }
            }
        />
        <style>
            {`
            .ql-container {
                min-height: 200px;
            }
            .ql-container.ql-snow { 
                border: none !important;
            }
        `}
        </style>
        <div className={`${styles.content_info} d-flex justify-content-between align-items-center mb-3`}>
            <div className={`${styles.options} d-flex`}>
                {
                    props.responseData.userId.account === userDetails.account
                        ?
                        <div
                            className={styles.options_content}
                            onClick={() => {
                                setShowUpdateResponse(true)
                            }}
                        >Edit</div>
                        :
                        !userDetails.followResponse.includes(props.responseData._id)
                            ?
                            <div
                                onClick={() => {
                                    props.onFollowReponse(props.responseData._id, true)
                                }}
                                className={styles.options_content}
                            >Follow</div>
                            :
                            <div
                                onClick={() => {
                                    props.onFollowReponse(props.responseData._id, false)
                                }}
                                className={styles.options_content}
                            >UnFollow</div>
                }
                {props.responseData.comment.length
                    ?
                    <div
                        className={`${styles.options_content} ${showComment ? styles.options_content_focus : undefined}`}
                        onClick={() => {
                            props.onGetComment(props.responseData._id, setShowComment)
                        }}
                    >Comments</div>
                    :
                    undefined
                }
            </div>
            <div className={`pt-2 d-flex justify-content-end ${styles.content_footer}`}>
                <div className={`d-flex align-items-center ${styles.account}`}>
                    <Avatar name='Quang' size='30' src={props.responseData.userId.avatarURL}></Avatar>
                    <UserNameLink name={props.responseData.userId.account} styleVal='' fontSize='13px'></UserNameLink>
                </div>
                <div className={`ms-1 d-flex align-items-center ${styles.time}`}>
                    {formatTimeAgo(new Date(props.responseData.createdAt))}
                </div>
            </div>
        </div>
        <span
            className={`${styles.addComment} ${smallComment ? styles.addComment_focus : undefined}`}
            onClick={() => {
                setSmallComment(!smallComment)
                setCommentContent('')
            }}
        >
            Add a comment
        </span>
        {smallComment ?
            <div className='mt-3'>
                <div className={`border rounded-3 ${styles.description}`}>
                    <ReactQuill
                        theme="snow"
                        value={commentContent}
                        onChange={setCommentContent}
                        formats={
                            [
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'header',
                                'color',
                                'font'
                            ]
                        }
                        modules={
                            {
                                toolbar: toolBarSmallOptions
                            }
                        }
                    />
                    <style>
                        {`
                        .ql-container {
                            height: 300px;
                        }
                        .ql-toolbar + .ql-container .ql-editor {
                            padding: 20px;
                        } 
                        `}
                    </style>
                </div>
                <div className='d-flex justify-content-end mt-2'>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            props.onCreateComment(props.responseData._id, commentContent as string, setShowComment)
                            setSmallComment(!smallComment)
                        }}>
                        Submit
                    </button>
                </div>
            </div>
            :
            undefined
        }

        {props.comment && showComment ?
            <div className={`${styles.answers} mt-3`}>
                {props.comment.map((answer, index) => {
                    return <div key={index} className={`ps-4 d-flex align-items-center ${styles.answer} py-2`}>
                        <div className={`${styles.answer_content} pe-2`}>{parse(answer.content)}</div>
                        <TagsComponent type='user' data={[answer.userId.account]}></TagsComponent>
                    </div>
                })}
            </div>
            :
            undefined
        }

        <ModalComponent
            header='Update Form'
            visible={showUpdateResponse}
            setShow={setShowUpdateResponse}
        >
            <UpdateResponse
                setShowUpdateResponse={setShowUpdateResponse}
                onUpdateResponse={props.onUpdateResponse}
                responseData={props.responseData}
            ></UpdateResponse>
        </ModalComponent>

    </div>
}

export default ResponseContentQuestion