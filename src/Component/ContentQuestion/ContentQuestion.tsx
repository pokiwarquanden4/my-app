import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { formatTimeAgo, toolBarSmallOptions, toolbarOptions } from '../../Functions/Functions';
import { IPost } from '../../pages/QuestionDetails/QuestionDetailsAPI';
import Avatar from '../Avatar/Avatar';
import TagsComponent from '../TagsComponent/TagsComponent';
import styles from './ContentQuestion.module.scss';
import ModalComponent from '../Modal/ModalComponent';
import UpdatePost from '../UpdatePost/UpdatePost';
import { useAppSelector } from '../../App/hook';
import UserNameLink from '../UserNameLink/UserNameLink';

interface IContentQuestion {
    onFollowPost: (follow: boolean) => void
    onUpdatePost: (title?: string, subTitle?: string, content?: string, tags?: string[], show?: Dispatch<SetStateAction<boolean>>) => void
    onCreateResponse: (content: string) => void
    questionDetails: IPost
    classValue?: string
}

function ContentQuestion(props: IContentQuestion) {
    const [content, setContent] = useState<string>('');
    const [commentContent, setCommentContent] = useState<string>();
    const [commentVisible, setCommentVisible] = useState<boolean>(false)
    const [showUpdatePost, setShowUpdatePost] = useState<boolean>(false)
    const userDetails = useAppSelector(store => store.user.data)

    useEffect(() => {
        setContent(props.questionDetails.content)
    }, [props.questionDetails.content])

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
        <div className={`mb-2 mt-5 ${styles.content_tags}`}>
            <TagsComponent type='tags' data={props.questionDetails.tags}></TagsComponent>
        </div>
        <div className={`${styles.content_info} d-flex justify-content-between align-items-center mb-3`}>
            <div className={`${styles.options} d-flex`}>
                {
                    userDetails.account === props.questionDetails.userId
                        ?
                        <div
                            className={styles.options_content}
                            onClick={() => {
                                setShowUpdatePost(!showUpdatePost)
                            }}
                        >Edit</div>
                        :
                        !userDetails.followPost.includes(props.questionDetails._id)
                            ?
                            <div
                                onClick={() => {
                                    props.onFollowPost(true)
                                }}
                                className={styles.options_content}
                            >Follow</div>
                            :
                            <div
                                onClick={() => {
                                    props.onFollowPost(false)
                                }}
                                className={styles.options_content}
                            >UnFollow</div>

                }
            </div>
            <div className={`pt-2 d-flex justify-content-end ${styles.content_footer}`}>
                <div className={`d-flex align-items-center ${styles.account}`}>
                    <Avatar name='Quang' size='30' src={props.questionDetails.avatarURL}></Avatar>
                    <UserNameLink name={props.questionDetails.userId} styleVal='' fontSize='13px'></UserNameLink>
                </div>
                <div className={`ms-1 d-flex align-items-center ${styles.time}`}>
                    {formatTimeAgo(new Date(props.questionDetails.updatedAt))}
                </div>
            </div>
        </div>
        <span
            className={`${styles.addComment} ${commentVisible ? styles.addComment_focus : undefined}`}
            onClick={() => {
                setCommentVisible(!commentVisible)
            }
            }
        >
            Add a comment
        </span>
        {
            commentVisible ?
                <div className='mt-3'>
                    <div className={`border rounded-3 ${styles.description}`}>
                        <ReactQuill
                            theme="snow"
                            value={commentContent}
                            onChange={setCommentContent}
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
                        />
                        <style>
                            {`
                        .ql-container {
                            height: 300px;
                        }
                        `}
                        </style>
                    </div>
                    <div className='d-flex justify-content-end mt-2'>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                props.onCreateResponse(commentContent as string)
                                setCommentVisible(!commentVisible)
                            }}>
                            Submit
                        </button>
                    </div>
                </div>
                :
                undefined
        }
        <ModalComponent
            header='Update Form'
            visible={showUpdatePost}
            setShow={setShowUpdatePost}
        >
            <UpdatePost
                setShowUpdatePost={setShowUpdatePost}
                onUpdatePost={props.onUpdatePost}
                questionDetails={props.questionDetails}
            ></UpdatePost>
        </ModalComponent>
    </div >
}

export default ContentQuestion