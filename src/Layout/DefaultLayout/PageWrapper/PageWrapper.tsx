import { useAppSelector } from '../../../App/hook'
import NavBar from '../../../Component/NavBar/NavBar'
import styles from './PageWrapper.module.scss'
import { ReactNode } from 'react'

type IPageWrapper = {
    children: ReactNode
}

function PageWrapper(props: IPageWrapper) {
    const adverts = useAppSelector(store => store.data.adverts)
    console.log(adverts)
    return (
        <div className={`mt-4 d-flex ${styles.container}`}>
            <NavBar></NavBar>
            <div className={`px-4 ${styles.content}`}>{props.children}</div>
            <div className={`ps-3 ${styles.advertisment}`}>
                {adverts.length
                    ?
                    <div className={styles.ad_wrapper}>
                        {adverts.map((ad, index) => {
                            return <a href={ad.url} key={index}>
                                <img className={styles.ad} src={ad.imgURL} alt='Advertisemnet'></img>
                            </a>
                        })}
                    </div>
                    :
                    undefined
                }
            </div>
        </div>
    )
}

export default PageWrapper