import { Dispatch, useCallback, useState, SetStateAction, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { routes } from '../pages/pages';
import { login } from './LoginAPI';
import { useAppDispatch } from '../../App/hook';
import { showAlert } from '../../Component/Alert/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
interface ILoginPages {
    setLoginShow: Dispatch<SetStateAction<boolean>>
}

export interface ILogin {
    account: string,
    password: string
}

interface ILoginErrors {
    account?: string,
    password?: string
}

const defaultVal = {
    account: "",
    password: ""
}

function LoginPages(props: ILoginPages) {
    const dispatch = useAppDispatch()
    const [form, setForm] = useState<ILogin>(defaultVal)
    const [errors, setErrors] = useState<ILoginErrors>({})
    const navigate = useNavigate()
    const [passwordHide, setPasswordHide] = useState<boolean>(false)

    const validPassword = useCallback((input: string): boolean => {
        const regex = /^.{11,}$/;
        return regex.test(input);
    }, [])

    const setField = useCallback((field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!(errors.password)) setErrors({
            ...errors,
            account: field === "account" && !!(errors.account) ? "" : errors.account,
            password: field === "password" && !!(errors.password) ? "" : errors.password
        })
    }, [errors, form])

    const findFormErrors = useCallback(() => {
        const newErrors: ILoginErrors = {}
        // password error
        if (!form.password) {
            newErrors.password = "Please Enter Passord"
        } else {
            if (!validPassword(form.password)) {
                newErrors.password = "Password need at least 10 letter"
            }
        }

        //Account error
        if (!form.account) {
            newErrors.account = "Please enter a account."
        }

        return newErrors
    }, [form.account, form.password, validPassword])

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault()
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            const res = await dispatch(login(form))

            switch (res.payload.status) {
                case 200:
                    showAlert(`Welcome ${res.meta.arg.account}`, 'success')
                    props.setLoginShow(false)
                    break
                case 401:
                    showAlert("Please check your account and password", 'info')
                    break
                default:
                    break
            }
        }
    }, [dispatch, findFormErrors, form, props])

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustomUsername">
                    <Form.Label>Account</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            isInvalid={!!errors.account}
                            required
                            onChange={(e) => {
                                setField('account', e.target.value)
                            }}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.account}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formPlaintextPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="passwordLabel">@</InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="Enter Your Passowrd"
                            aria-describedby="passwordLabel"
                            required
                            isInvalid={!!errors.password}
                            onChange={(e) => {
                                setField('password', e.target.value)
                            }}
                        />
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend" onClick={() => { setPasswordHide(!passwordHide) }}>
                                {passwordHide ?
                                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                                    :
                                    <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                                }
                            </InputGroup.Text>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <div className={`d-flex justify-content-between align-items-center`}>
                <div
                    onClick={() => {
                        navigate(routes.createAccount)
                        props.setLoginShow(false)
                    }}
                    style={{ cursor: 'pointer', color: '#0d6efd', fontSize: '14px' }}
                >
                    Don't have an account ?
                </div>
                <div className={`d-flex justify-content-end`}>
                    <Button variant="secondary" className={`me-2`} onClick={() => { props.setLoginShow(false) }}>Close</Button>
                    <Button variant="primary" type='submit'>Login</Button>
                </div>
            </div>
        </Form>
    );

}

export default LoginPages