import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Paging.module.scss'

interface IPaging {
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
    data: JSX.Element[]
    numberPerPage: number
    dataLength: number
}

function Paging(props: IPaging) {
    // const scrollRef = useRef<HTMLDivElement>(null)

    const totalPage = useMemo(() => {
        return Math.ceil(props.dataLength / props.numberPerPage)
    }, [props.dataLength, props.numberPerPage])

    // useEffect(() => {
    //     if (!scrollRef.current) return
    //     scrollRef.current.scrollIntoView({
    //         behavior: "smooth"
    //     })
    // }, [props.data])

    return <div className={styles.wapper}>
        {props.data}
        <div className='pt-4 d-flex justify-content-end'>
            {
                props.dataLength ?
                    <ul className="pagination">
                        <li className="page-item"
                            onClick={() => {
                                props.currentPage > 1 && props.setCurrentPage(props.currentPage - 1)
                            }}>
                            <button className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {Array.from({ length: totalPage }, (_, i) => i + 1).map((number, index) => {
                            return <li
                                key={index}
                                className={`page-item ${props.currentPage === number ? 'active' : undefined}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    props.setCurrentPage(number)
                                }}
                            >
                                <span className="page-link">{number}</span>
                            </li>
                        })}
                        <li className="page-item"
                            onClick={() => {
                                props.currentPage < totalPage && props.setCurrentPage(props.currentPage + 1)
                            }}>
                            <button className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                    :
                    undefined
            }

        </div>
    </div>
}

export default Paging