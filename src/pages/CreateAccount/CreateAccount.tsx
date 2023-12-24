import { useCallback, useState } from 'react'
import styles from './CreateAccount.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ModalComponent from '../../Component/Modal/ModalComponent';
import VertifiCode from './VertifiCode/VertifiCode';
import { useAppDispatch } from '../../App/hook';
import { createAccount } from './CreateAccountAPI';
import LoginPages from '../LoginPages/LoginPages';

export interface ICreateAccount {
    name: string,
    email: string,
    account: string,
    password: string,
    img?: any
}

export interface ICreateAccountErrors {
    name?: string,
    email?: string,
    account?: string,
    password?: string,
    img?: any
}

const defaultVal: ICreateAccount = {
    name: "",
    email: "",
    account: "",
    password: ""
}

function CreateAccount() {
    const dispatch = useAppDispatch()
    const [validForm, setValidForm] = useState<boolean>(false)
    const [form, setForm] = useState<ICreateAccount>(defaultVal)
    const [errors, setErrors] = useState<ICreateAccountErrors>({})

    const validPassword = useCallback((input: string): boolean => {
        const regex = /^.{11,}$/;
        return regex.test(input);
    }, [])

    const isValidEmail = useCallback((email: string) => {
        var emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
    }, [])

    const setField = useCallback((field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        setErrors({
            ...errors,
            name: field === "name" && !!(errors.name) ? "" : errors.name,
            email: field === "email" && !!(errors.email) ? "" : errors.email,
            account: field === "account" && !!(errors.account) ? "" : errors.account,
            password: field === "password" && !!(errors.password) ? "" : errors.password
        })
    }, [errors, form])

    const findFormErrors = useCallback(() => {
        const newErrors: ICreateAccountErrors = {}
        //User name error
        if (!form.name) {
            newErrors.name = "Please choose a username."
        }
        //Email error
        if (!form.email) {
            newErrors.email = "Please Enter Your Email."
        } else {
            if (!isValidEmail(form.email)) {
                newErrors.email = "Please Enter Correct Email"
            }
        }
        //Account error
        if (!form.account) {
            newErrors.account = "Please choose a account."
        }
        // password error
        if (!form.password) {
            newErrors.password = "Please Enter Passord"
        } else {
            if (!validPassword(form.password)) {
                newErrors.password = "Password need at least 10 letter"
            }
        }

        if (Object.keys(newErrors).length === 0) {
            setValidForm(true)
        } else {
            setValidForm(false)
        }
        return newErrors
    }, [form.account, form.email, form.name, form.password, isValidEmail, validPassword])

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            const res = dispatch(createAccount(form))
            res.then((results) => {
                console.log(results)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [dispatch, findFormErrors, form])

    return (
        <div className='pb-4'>
            <div className='h3 pb-3 text-center'>Create Account</div>
            <form className="">
                <div className="">
                    <label htmlFor="UserName" className="form-label">Username</label>
                    <input
                        type="text"
                        placeholder='Username'
                        className="form-control"
                        id="UserName"
                        required
                        onChange={(e) => {
                            setField('name', e.target.value)
                        }}
                    ></input>
                    <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.name}</div>
                </div>
                <div className="pt-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input
                        type="text"
                        placeholder='Email'
                        className="form-control"
                        id="Email"
                        required
                        onChange={(e) => {
                            setField('email', e.target.value)
                        }}
                    ></input>
                    <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.email}</div>
                </div>
                <div className="pt-3">
                    <label htmlFor="Account" className="form-label">Account</label>
                    <input
                        type="text"
                        placeholder='Account'
                        className="form-control"
                        id="Account"
                        required
                        onChange={(e) => {
                            setField('account', e.target.value)
                        }}
                    ></input>
                    <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.account}</div>
                </div>
                <div className="pt-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input
                        type="text"
                        placeholder='Password'
                        className="form-control"
                        id="Password"
                        required
                        onChange={(e) => {
                            setField('password', e.target.value)
                        }}
                    ></input>
                    <div className={`${styles.invalid} pt-1`} style={{ color: 'red', fontSize: '14px' }}>{errors.password}</div>
                </div>
                <div className="pt-3">
                    <label htmlFor="Password" className="form-label">Avatar</label>
                    <input type="file" accept='.png .jpg' className="form-control" id="inputGroupFile02"></input>
                </div>
                <div className="pt-4">
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit form</button>
                </div>
            </form>
            {/* <ModalComponent
                header='Vertify code'
                confirm='Confirm'
                visible={validForm}
                setLoginShow={setValidForm}
            > */}
            {/* <VertifiCode></VertifiCode> */}
            {/* </ModalComponent> */}
            <ModalComponent
                header='Login Form'
                visible={validForm}
                setShow={setValidForm}
            >
                <LoginPages setLoginShow={setValidForm}></LoginPages>
            </ModalComponent>
        </div>
    );
}

export default CreateAccount