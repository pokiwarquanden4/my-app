import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import ReactTagsComponent from '../../../Component/ReactTags/ReactTagsComponent'
import styles from './EditAccount.module.scss'
import { Tag } from 'react-tag-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../App/hook'
import { validPassword } from '../../../Functions/Functions'
import { updateUserProfile } from '../AccountAPI'
import { IUserLogin } from '../../../Reducers/UserSlice'

interface IEditAccount {
    oldpassword: string
    newpassword: string
}

export interface IEditAccountError {
    oldpassword?: string
    newpassword?: string
}

interface IEditAccountProps {
    userData: IUserLogin
    setShow: Dispatch<SetStateAction<boolean>>
}


function EditAccount(props: IEditAccountProps) {
    const dispatch = useAppDispatch()
    const newPasswordRef = useRef<HTMLInputElement>(null)
    const oldPasswordRef = useRef<HTMLInputElement>(null)
    const [form, setForm] = useState<IEditAccount>({
        oldpassword: '',
        newpassword: ''
    })
    const [errors, setErrors] = useState<IEditAccountError>({})
    const [newPasswordHide, setNewPasswordHide] = useState<boolean>(false)
    const [oldPasswordHide, setOldPasswordHide] = useState<boolean>(false)

    const setField = useCallback((field: string, value: string | File | string[]) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            newpassword: field === "password" && !!prevErrors.newpassword ? "" : prevErrors.newpassword,
            oldpassword: field === "password" && !!prevErrors.oldpassword ? "" : prevErrors.oldpassword
        }));

    }, [])

    useEffect(() => {
        if (!newPasswordRef.current) return
        if (newPasswordHide) {
            newPasswordRef.current.type = 'text';
        } else {
            newPasswordRef.current.type = 'password';
        }
    }, [newPasswordHide]);

    useEffect(() => {
        if (!oldPasswordRef.current) return
        if (oldPasswordHide) {
            oldPasswordRef.current.type = 'text';
        } else {
            oldPasswordRef.current.type = 'password';
        }
    }, [oldPasswordHide]);

    const findFormErrors = useCallback(() => {
        const newErrors: IEditAccountError = {}
        // password error
        if (!form.newpassword) {
            newErrors.newpassword = "Please Enter Passord"
        } else {
            if (!validPassword(form.newpassword)) {
                newErrors.newpassword = "Password need at least 10 letter"
            }
        }

        // password error
        if (!form.oldpassword) {
            newErrors.oldpassword = "Please Enter Passord"
        } else {
            if (!validPassword(form.oldpassword)) {
                newErrors.oldpassword = "Password need at least 10 letter"
            }
        }
        return newErrors
    }, [form.newpassword, form.oldpassword])

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            const formData = new FormData();
            formData.append('oldpassword', form.oldpassword);
            formData.append('newpassword', form.newpassword);

            dispatch(updateUserProfile(formData))

            props.setShow(false)
        }
    }, [dispatch, findFormErrors, form.newpassword, form.oldpassword, props])

    return <div>
        <div className="pt-3">
            <label htmlFor="Password" className="form-label">Old Password</label>
            <div className='d-flex align-items-center'>
                <input
                    ref={oldPasswordRef}
                    type="password"
                    placeholder='Password'
                    className="form-control"
                    id="Password"
                    required
                    onChange={(e) => {
                        setField('oldpassword', e.target.value)
                    }}
                ></input>
                <div className='ms-2' onClick={() => { setOldPasswordHide(!oldPasswordHide) }} style={{ cursor: 'pointer' }}>
                    {
                        oldPasswordHide
                            ?
                            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                            :
                            <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                    }
                </div>
            </div>
            <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.oldpassword}</div>
        </div>
        <div className="pt-3">
            <label htmlFor="Password" className="form-label">New Password</label>
            <div className='d-flex align-items-center'>
                <input
                    ref={newPasswordRef}
                    type="password"
                    placeholder='Password'
                    className="form-control"
                    id="Password"
                    required
                    onChange={(e) => {
                        setField('newpassword', e.target.value)
                    }}
                ></input>
                <div className='ms-2' onClick={() => { setNewPasswordHide(!newPasswordHide) }} style={{ cursor: 'pointer' }}>
                    {
                        newPasswordHide
                            ?
                            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                            :
                            <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                    }
                </div>
            </div>
            <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.oldpassword}</div>
        </div>
        <div className="pt-4">
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
}

export default EditAccount