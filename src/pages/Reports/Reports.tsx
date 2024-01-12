import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Reports.module.scss'
import { useAppDispatch } from '../../App/hook'
import { getReports, updateReport } from './ReportsAPI'
import SearchBar from '../../Component/SearchBar/SearchBar'
import OptionsListButton from '../../Component/OptionsListButton/OptionsListButton'
import ModalComponent from '../../Component/Modal/ModalComponent'
import ReportDetails from './ReportDetails/ReportDetails'

export interface IReportsForm {
    _id: string
    reportAccount: string
    postOwner: string
    reason: string
    status: number
    reportedPost: string
}

const status: Record<number, string> = {
    0: 'UnRead',
    1: 'Reject',
    2: 'Accept',
}

const filterList = [
    {
        name: "Newest"
    },
    {
        name: "Reject"
    },
    {
        name: "Accept"
    },
]

function Reports() {
    const dispatch = useAppDispatch()
    const [reports, setReports] = useState<IReportsForm[]>([])
    const [totalReports, setTotalReports] = useState<number>(0)
    const [searchVal, setSearchVal] = useState<string>('')
    const searchValDelayRef = useRef<string>('')
    const [focus, setFocus] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [reportDetails, setReportDetails] = useState<IReportsForm>()
    const [reportDetailsShow, setReportDetailsShow] = useState<boolean>(false)

    const totalPage = useMemo(() => {
        return Math.ceil(totalReports / 10)
    }, [totalReports])

    useEffect(() => {
        const func = async () => {
            const res = await dispatch(getReports({
                currentPage: currentPage,
                type: filterList[focus].name,
                searchVal: searchVal
            }))

            if (res.payload.status === 200) {
                setReports(res.payload.data.reports)
                setTotalReports(res.payload.data.totalCount)
                setCurrentPage(1)
            }
            searchValDelayRef.current = searchVal
        }

        if (searchValDelayRef.current === searchVal) {
            func()
        } else {
            const timeout = setTimeout(func, 500)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [currentPage, dispatch, focus, searchVal])

    const onUpdateStatus = useCallback(async (reportId: string, status: number) => {
        const res = await dispatch(updateReport({
            reportId: reportId,
            status: status
        }))

        if (res.payload.status === 200) {
            setReports((preVal) => {
                const newData = preVal.map((item) => {
                    if (item._id === res.payload.data.report._id) {
                        return {
                            ...item,
                            status: res.payload.data.report.status
                        }
                    }
                    return item
                })

                return newData
            })
        }
    }, [dispatch])

    return <div className={`pb-4 ${styles.wrapper}`}>
        <div className={`h4 ${styles.header}`}>
            Report Lists
        </div>
        <div className={`${styles.searchBar} pt-4`}>
            <SearchBar
                searchVal={searchVal}
                setSearchVal={setSearchVal}
            ></SearchBar>
        </div>
        <div className='d-flex justify-content-end pt-3'>
            <OptionsListButton
                focus={focus}
                setFocus={setFocus}
                data={filterList}
            ></OptionsListButton>
        </div>
        <table className="table table-hover mt-4">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Account</th>
                    <th scope="col">Owner</th>
                    <th scope="col">status</th>
                    <th scope="col">reason</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report, index) => {
                    return <tr
                        style={{ cursor: 'pointer' }}
                        key={index}
                        onClick={() => {
                            setReportDetails(report)
                            setReportDetailsShow(true)
                        }}
                    >
                        <th scope="row">{report._id}</th>
                        <td>{report.reportAccount}</td>
                        <td>{report.postOwner}</td>
                        <td>{status[report.status]}</td>
                        <td className={styles.content}>{report.reason}</td>
                    </tr>
                })}
            </tbody>
        </table>
        <div className='d-flex justify-content-end'>
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {Array.from({ length: totalPage }, (_, i) => i + 1).map((number, index) => {
                    return <li
                        key={index}
                        className={`page-item ${currentPage === number ? 'active' : undefined}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setCurrentPage(number)
                        }}
                    >
                        <span className="page-link">{number}</span>
                    </li>
                })}
                <li className="page-item"
                    onClick={() => {
                        currentPage < totalPage && setCurrentPage(currentPage + 1)
                    }}>
                    <button className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </div>
        {reportDetails
            ?
            <ModalComponent
                header='Report Details'
                visible={reportDetailsShow}
                setShow={setReportDetailsShow}
            >
                <ReportDetails
                    onUpdateStatus={onUpdateStatus}
                    status={status}
                    setShow={setReportDetailsShow}
                    data={reportDetails}
                ></ReportDetails>
            </ModalComponent>
            :
            undefined
        }
    </div>
}

export default Reports