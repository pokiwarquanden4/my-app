import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Paging.module.scss'

interface IPaging {
    data: JSX.Element[]
    limit: number
}

function Paging(props: IPaging) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const totalPage = useMemo(() => {
        return Math.ceil(props.data.length / props.limit)
    }, [props.data.length, props.limit])

    const getData = useCallback(() => {
        const data = [...props.data]
        return data.splice((currentPage - 1) * 10, (currentPage * 10) - 1)
    }, [currentPage, props.data])

    useEffect(() => {
        if (!scrollRef.current || !currentPage) return
        scrollRef.current.scrollIntoView({
            behavior: "smooth"
        })
    }, [currentPage])

    return <div className={styles.wapper} ref={scrollRef}>
        {getData()}
        <div className='pt-4 d-flex justify-content-end'>
            <ul className="pagination">
                <li className="page-item"
                    onClick={() => {
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                    }}>
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
    </div>
}

export default Paging