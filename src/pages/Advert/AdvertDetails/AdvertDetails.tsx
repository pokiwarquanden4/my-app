import { Button } from 'react-bootstrap';
import { IAdverts } from '../Advert'
import styles from './AdvertDetails.module.scss'
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface IAdvertsDetails {
    data: IAdverts
    setAdvertDetailsShow: Dispatch<SetStateAction<boolean>>
    handleUpdate: (form: FormData) => void
}

interface IUpdateAdvert {
    _id: string
    endTimeA: string,
    startTimeA: string,
    name: string
    url: string
    img?: File
    imgURL: string
}

interface IUpdateAdvertError {
    endTimeA?: string,
    startTimeA?: string,
    name?: string
    url?: string
    img?: string
}

function AdvertDetails(props: IAdvertsDetails) {

    const [form, setForm] = useState<IUpdateAdvert>({
        _id: props.data._id,
        endTimeA: props.data.endTimeA,
        startTimeA: props.data.startTimeA,
        name: props.data.name,
        url: props.data.url,
        imgURL: props.data.imgURL
    })
    const [errors, setErrors] = useState<IUpdateAdvertError>({})

    const convertToDatetimeLocalFormat = (dateTimeString: string) => {
        // Create a Date object from the input string in local time
        const date = new Date(dateTimeString);

        // Get the local date and time components
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // Format the date and time in the desired format
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

        return formattedDateTime;
    }

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
        const newErrors: IUpdateAdvertError = {}
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
        if (!form.url) {
            newErrors.url = "Please Enter Url"
        } else {
            if (!isValidURL(form.url)) {
                newErrors.url = "Please Enter Valid Url"
            }
        }
        return newErrors
    }, [form.endTimeA, form.name, form.startTimeA, form.url])

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
            formData.append('advertId', form._id);
            formData.append('startTimeA', form.startTimeA);
            formData.append('name', form.name);
            formData.append('url', form.url);
            form.img && formData.append('img', form.img);

            props.handleUpdate(formData)

            props.setAdvertDetailsShow(false)
        }
    }, [findFormErrors, form._id, form.endTimeA, form.img, form.name, form.startTimeA, form.url, props])



    return <div>
        <div className="pt-3">
            <label htmlFor="Password" className="form-label">Name</label>
            <div className='d-flex align-items-center'>
                <input
                    type="text"
                    placeholder='Please enter advert name'
                    className="form-control"
                    required
                    value={form.name}
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
                    value={convertToDatetimeLocalFormat(form.startTimeA)}
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
                    value={convertToDatetimeLocalFormat(form.endTimeA)}
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
                    value={form.url}
                    onChange={(e) => {
                        setField('url', e.target.value)
                    }}
                ></input>
            </div>
            <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.url}</div>
        </div>
        <div className="pt-3">
            <label htmlFor="File" className="form-label">Picture</label>
            <div className='d-flex align-items-center'>
                <img src={form.imgURL} style={{ width: '100px' }} alt='img'></img>
                <input
                    type="file"
                    style={{ height: '40px' }}
                    className="form-control ms-3"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                        e.target.files && setField('img', e.target.files[0])
                    }}
                />
            </div>
        </div>
        <div className={`d-flex justify-content-between pt-4`}>
            <Button
                onClick={() => {
                    window.open(props.data.url);
                }}
                variant="primary"
            >
                Link
            </Button>
            <Button
                onClick={handleSubmit}
                variant="primary"
            >
                Save
            </Button>
        </div>
    </div>
}

export default AdvertDetails