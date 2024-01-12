import { Button } from 'react-bootstrap'
import { IReportsForm } from '../Reports'
import styles from './ReportDetails.module.scss'
import { Dispatch, SetStateAction, useState } from 'react'
import { routes } from '../../pages/pages'

interface IReportDetails {
    onUpdateStatus: (reportId: string, status: number) => void
    status: Record<number, string>
    setShow: Dispatch<SetStateAction<boolean>>
    data: IReportsForm
}

function ReportDetails(props: IReportDetails) {
    const [status, setStatus] = useState<number>(props.data.status)

    return <div>
        <div className='d-flex align-items-center pt-2'>
            <div className='h6 mb-0 pe-2'>ID:</div>
            <div>{props.data?._id}</div>
        </div>
        <div className='d-flex align-items-center pt-2'>
            <div className='h6 mb-0 pe-2'>Account:</div>
            <div>{props.data?.reportAccount}</div>
        </div>
        <div className='d-flex align-items-center pt-2'>
            <div className='h6 mb-0 pe-2'>Owner:</div>
            <div>{props.data?.postOwner}</div>
        </div>
        <div className='d-flex align-items-center pt-2'>
            <div className='h6 mb-0 pe-2'>Status:</div>
            <select
                onChange={(e) => {
                    setStatus(Number(e.target.value))
                }}
                className="form-select"
                aria-label="Default select example"
                style={{ width: '200px' }}
                value={status}
            >
                {Object.values(props.status).map((item, index) => {
                    return <option value={index}>{item}</option>
                })}
            </select>
        </div>
        <div className='pt-2'>
            <div className='h6 mb-0 pe-2'>Reason:</div>
            <div className='pt-1 ms-2'>{props.data?.reason}</div>
        </div>
        <div className={`d-flex justify-content-between pt-4`}>
            <Button
                onClick={() => {
                    window.open(routes.questionDetail.replace(':questionId', props.data.reportedPost), '_blank');
                }}
                variant="primary"
                type='submit'
            >
                Move to post
            </Button>

            <div>
                <Button variant="secondary" className={`me-2`} onClick={() => { props.setShow(false) }}>Close</Button>
                <Button
                    onClick={() => {
                        props.onUpdateStatus(props.data._id, status)
                    }}
                    variant="primary"
                    type='submit'>Save</Button>
            </div>
        </div>
    </div>
}

export default ReportDetails