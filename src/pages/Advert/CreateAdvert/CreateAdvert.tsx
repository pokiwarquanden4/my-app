import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { useAppDispatch } from "../../../App/hook"
import styles from './CreateAdvert.module.scss'

interface ICreateAdvert {
    endTimeA: string,
    startTimeA: string,
    name: string
    url: string
    img?: File
}

interface ICreateAdvertError {
    endTimeA?: string,
    startTimeA?: string,
    name?: string
    url?: string
    img?: string
}

interface ICreate {
    handleCreate: (form: FormData) => void
    setAdvertShow: Dispatch<SetStateAction<boolean>>
}

function CreateAdvert(props: ICreate) {
    const dispatch = useAppDispatch()
    const [form, setForm] = useState<ICreateAdvert>({
        endTimeA: '',
        startTimeA: '',
        name: '',
        url: ''
    })
    const [errors, setErrors] = useState<ICreateAdvertError>({})

    const isValidURL = (url: string) => {
        // Regular expression for a basic URL validation
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        // Test the URL against the regex
        return urlRegex.test(url);
    }

    const setField = useCallback((field: string, value: string | File | string[]) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            startTimeA: field === "startTimeA" && !!prevErrors.startTimeA ? "" : prevErrors.startTimeA,
            endTimeA: field === "endTimeA" && !!prevErrors.endTimeA ? "" : prevErrors.endTimeA,
            name: field === "name" && !!prevErrors.name ? "" : prevErrors.name,
            url: field === "url" && !!prevErrors.url ? "" : prevErrors.url
        }));

    }, [])

    const findFormErrors = useCallback(() => {
        const newErrors: ICreateAdvertError = {}
        // start time error
        if (!form.startTimeA) {
            newErrors.startTimeA = "Please Enter Start Time"
        }
        if (!form.endTimeA) {
            newErrors.endTimeA = "Please Enter End Time"
        }
        if (!form.name) {
            newErrors.name = "Please Enter Name"
        }
        if (!form.img) {
            newErrors.img = "Please Enter Img"
        }
        if (!form.url) {
            newErrors.url = "Please Enter Url"
        } else {
            if (!isValidURL(form.url)) {
                newErrors.url = "Please Enter Valid Url"
            }
        }
        return newErrors
    }, [form.endTimeA, form.img, form.name, form.startTimeA, form.url])

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            const formData = new FormData();
            formData.append('endTimeA', form.endTimeA);
            formData.append('startTimeA', form.startTimeA);
            formData.append('name', form.name);
            formData.append('url', form.url);
            form.img && formData.append('img', form.img);

            props.handleCreate(formData)

            props.setAdvertShow(false)
        }
    }, [findFormErrors, form.endTimeA, form.img, form.name, form.startTimeA, form.url, props])


    return <div>
        <div className="pt-3">
            <label htmlFor="Password" className="form-label">Name</label>
            <div className='d-flex align-items-center'>
                <input
                    type="text"
                    placeholder='Please enter advert name'
                    className="form-control"
                    required
                    onChange={(e) => {
                        setField('name', e.target.value)
                    }}
                ></input>
            </div>
            <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.name}</div>
        </div>
        <div className="pt-3">
            <label htmlFor="Password" className="form-label">Start time</label>
            <div className='d-flex align-items-center'>
                <input
                    type="datetime-local"
                    placeholder='Please enter start date'
                    className="form-control"
                    required
                    onChange={(e) => {
                        setField('startTimeA', e.target.value)
                    }}
                ></input>
            </div>
            <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.startTimeA}</div>
        </div>
        <div className="pt-3">
            <label htmlFor="Password" className="form-label">End time</label>
            <div className='d-flex align-items-center'>
                <input
                    type="datetime-local"
                    placeholder='Please enter end date'
                    className="form-control"
                    required
                    onChange={(e) => {
                        setField('endTimeA', e.target.value)
                    }}
                ></input>
            </div>
            <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.endTimeA}</div>
        </div>
        <div className="pt-3">
            <label htmlFor="Password" className="form-label">Url</label>
            <div className='d-flex align-items-center'>
                <input
                    type="text"
                    placeholder='Please advert Url'
                    className="form-control"
                    required
                    onChange={(e) => {
                        setField('url', e.target.value)
                    }}
                ></input>
            </div>
            <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.url}</div>
        </div>
        <div className="pt-3">
            <label htmlFor="File" className="form-label">Picture</label>
            <input
                type="file"
                className="form-control"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    e.target.files && setField('img', e.target.files[0])
                }}
            />
        </div>
        <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.img}</div>
        <div className="pt-4">
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
}

export default CreateAdvert