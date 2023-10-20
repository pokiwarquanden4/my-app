import NavBar from '../../../Component/NavBar/NavBar'
import styles from './PageWrapper.module.scss'
import { ReactNode } from 'react'

type IPageWrapper = {
    children: ReactNode
}

function PageWrapper(props: IPageWrapper) {
    return (
        <div className={`container mt-4 d-flex ${styles.container}`}>
            <NavBar></NavBar>
            <div className={`px-4 ${styles.content}`}>{props.children}</div>
            <div className={`ps-3 ${styles.advertisment}`}>
                <div className={styles.ad_wrapper}>
                    <a href='https://stackoverflow.com/'>
                        <img className={styles.ad} src='https://cf.shopee.vn/file/13d5c3f78afff865c549e337977f89bf' alt='Advertisemnet'></img>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PageWrapper