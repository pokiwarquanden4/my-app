import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ModalComponent from '../../Component/Modal/ModalComponent'
import SearchBar from '../../Component/SearchBar/SearchBar'
import styles from './Advert.module.scss'
import OptionsListButton from '../../Component/OptionsListButton/OptionsListButton'
import { createAdvert, getAdverts, updateAdvert } from './AdvertAPI'
import { useAppDispatch } from '../../App/hook'
import CreateAdvert from './CreateAdvert/CreateAdvert'
import AdvertDetails from './AdvertDetails/AdvertDetails'

const filterList = [
    {
        name: "Newest"
    },
    {
        name: "Expired"
    },
    {
        name: "Active"
    },
]

export interface IAdverts {
    _id: string
    endTimeA: string
    startTimeA: string
    url: string
    name: string
    imgURL: string
}

function Advert() {
    const dispatch = useAppDispatch()
    const [searchVal, setSearchVal] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalAdverts, setTotalAdverts] = useState<number>(0)
    const [focus, setFocus] = useState<number>(0)
    const searchValDelayRef = useRef<string>('')
    const [adverts, setAdverts] = useState<IAdverts[]>([])
    const [createAdvertShow, setCreateAdvertShow] = useState<boolean>(false)
    const [advertDetails, setAdvertDetails] = useState<IAdverts>()
    const [advertDetailsShow, setAdvertDetailsShow] = useState<boolean>(false)

    const totalPage = useMemo(() => {
        return Math.ceil(totalAdverts / 10)
    }, [totalAdverts])

    useEffect(() => {
        const func = async () => {
            const res = await dispatch(getAdverts({
                currentPage: currentPage,
                type: filterList[focus].name,
                searchVal: searchVal
            }))

            if (res.payload.status === 200) {
                setAdverts(res.payload.data.advert)
                setTotalAdverts(res.payload.data.totalCount)
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

    const handleUpdate = useCallback(async (form: FormData) => {
        const res = await dispatch(updateAdvert(form))

        if (res.payload.status === 200) {
            const newData = res.payload.data.advert as IAdverts
            setAdverts((preVal) => {
                return preVal.map((item) => {
                    if (item._id === newData._id) {
                        return newData
                    }
                    return item
                })
            })
        }
    }, [dispatch])

    const handleCreate = useCallback(async (form: FormData) => {
        const res = await dispatch(createAdvert(form))

        if (res.payload.status === 200) {
            const newData = res.payload.data.advert as IAdverts
            setAdverts((preVal) => {
                return [...preVal, newData]
            })
            setFocus(0)
        }
    }, [dispatch])


    return <div className={`pb-4 ${styles.wrapper}`}>
        <div className={`h4 d-flex justify-content-between ${styles.header}`}>
            Advertisement
            <input
                onClick={() => {
                    setCreateAdvertShow(true)
                }}
                className="btn btn-primary"
                type="button"
                value="Add Advertise"
            ></input>
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
                    <th scope="col">Name</th>
                    <th scope="col">Start time</th>
                    <th scope="col">End time</th>
                    <th scope="col">Url</th>
                </tr>
            </thead>
            <tbody>
                {adverts.map((advert, index) => {
                    return <tr
                        style={{ cursor: 'pointer' }}
                        key={index}
                        onClick={() => {
                            setAdvertDetails(advert)
                            setAdvertDetailsShow(true)
                        }}
                    >
                        <td>{advert.name}</td>
                        <td>{(new Date(advert.startTimeA)).toLocaleString()}</td>
                        <td>{(new Date(advert.endTimeA)).toLocaleString()}</td>
                        <td style={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '100px' }}>{advert.url}</td>
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
        <ModalComponent
            header='Create Advertisement'
            visible={createAdvertShow}
            setShow={setCreateAdvertShow}
        >
            <CreateAdvert
                handleCreate={handleCreate}
                setAdvertShow={setCreateAdvertShow}
            ></CreateAdvert>
        </ModalComponent>
        {advertDetails
            ?
            <ModalComponent
                header='Advert Details'
                visible={advertDetailsShow}
                setShow={setAdvertDetailsShow}
            >
                <AdvertDetails
                    handleUpdate={handleUpdate}
                    setAdvertDetailsShow={setAdvertDetailsShow}
                    data={advertDetails}
                ></AdvertDetails>
            </ModalComponent>
            :
            undefined
        }

    </div>
}

export default Advert
