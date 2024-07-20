import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useAppDispatch } from '../../../App/hook'
import styles from './QuestionReport.module.scss'
import { createReport } from './QuestionReportAPI'

interface IQuestionReport {
    setReportShow: Dispatch<SetStateAction<boolean>>
    postId: string | undefined
}

function QuestionReport(props: IQuestionReport) {
    const dispatch = useAppDispatch()
    const [reportReason, setReportReason] = useState<string>('')

    const handleSubmit = useCallback(async (e: any) => {
        if (!props.postId) return

        const res = await dispatch(createReport({
            postId: props.postId,
            reason: reportReason,
            dispatch: dispatch
        }))

        if (res.payload.status === 200) {
            props.setReportShow(false)
        }
    }, [dispatch, props, reportReason])


    return <div>
        <div className="">
            <label htmlFor="UserName" className="form-label">Report reason</label>
            <input
                type="text"
                placeholder='Why do you want to report this post'
                className="form-control"
                id="UserName"
                required
                value={reportReason}
                onChange={(e) => {
                    setReportReason(e.target.value)
                }}
            ></input>
        </div>
        <div className="pt-4">
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit form</button>
        </div>
    </div>
}

export default QuestionReport