import { usePromiseTracker } from "react-promise-tracker";

export const Loading = () => {
    const { promiseInProgress } = usePromiseTracker();

    return promiseInProgress ? <div className="position-absolute w-100 h-100 z-3 bg-secondary bg-opacity-75 d-flex align-items-center justify-content-center" >
        <div className="spinner-border text-primary" style={{ width: '7rem', height: '7rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div> : null
}