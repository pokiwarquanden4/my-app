import { ReactNode } from 'react';
import Header from '../DefaultLayout/Header/Header';
import styles from './HeaderLayout.module.scss';
import Footer from '../DefaultLayout/Footer/Footer';

function HeaderLayout({ children }: { children: ReactNode }) {
    return <div className={`h-100 d-flex flex-column ${styles.wrapper}`}>
        <Header></Header>
        <div className={`${styles.content}`}>{children}</div>
        <Footer></Footer>
    </div>
}

export default HeaderLayout