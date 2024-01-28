import { Dispatch, Fragment, SetStateAction, useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../App/hook';
import { showAlert } from '../../Component/Alert/Alert';
import { routes } from '../pages/pages';
import { createOtp, login } from './LoginAPI';
import ModalComponent from '../../Component/Modal/ModalComponent';
import VertifiCode from '../CreateAccount/VertifiCode/VertifiCode';
import { validPassword } from '../../Functions/Functions';
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
    const [vertifiForm, setVertifiForm] = useState<boolean>(false)
    const [errors, setErrors] = useState<ILoginErrors>({})
    const navigate = useNavigate()

    const setField = useCallback((field: string, value: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value
        }));

        if (!!errors.password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                account: field === "account" && !!prevErrors.account ? "" : prevErrors.account,
                password: field === "password" && !!prevErrors.password ? "" : prevErrors.password
            }));
        }
    }, [errors.password])

    const findFormErrors = useCallback((ignore: string[] = []) => {
        const newErrors: ILoginErrors = {}
        // password error
        if (!ignore.includes('password')) {
            if (!form.password) {
                newErrors.password = "Please Enter Passord"
            } else {
                if (!validPassword(form.password)) {
                    newErrors.password = "Password need at least 10 letter"
                }
            }
        }

        //Account error
        if (!ignore.includes('account')) {
            if (!form.account) {
                newErrors.account = "Please enter a account."
            }
        }

        return newErrors
    }, [form.account, form.password])

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
                    navigate(routes.home)
                    break
                case 401:
                    showAlert("Please check your account and password", 'info')
                    break
                default:
                    break
            }
        }
    }, [dispatch, findFormErrors, form, navigate, props])

    const sendVertify = useCallback(async () => {
        const newErrors = findFormErrors(['password'])
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            const res = await dispatch(createOtp({
                account: form.account
            }))
            setVertifiForm(true)
        }
    }, [dispatch, findFormErrors, form.account])

    return (
        <Fragment>
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
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <div className={`d-flex justify-content-between align-items-center`}>
                    <div className='d-flex' style={{ cursor: 'pointer', color: '#0d6efd', fontSize: '14px' }}>
                        <div
                            className='pe-1'
                            onClick={() => {
                                navigate(routes.createAccount)
                                props.setLoginShow(false)
                            }}
                        >
                            Don't have an account
                        </div>
                        /
                        <div
                            className='ps-1'
                            onClick={sendVertify}
                        >
                            Forgot password
                        </div>
                    </div>

                    <div className={`d-flex justify-content-end`}>
                        <Button variant="secondary" className={`me-2`} onClick={() => { props.setLoginShow(false) }}>Close</Button>
                        <Button variant="primary" type='submit'>Login</Button>
                    </div>
                </div>
            </Form>
            <ModalComponent
                header='Vertify code'
                visible={vertifiForm}
                setShow={setVertifiForm}
            >
                <VertifiCode
                    setVertifiForm={setVertifiForm}
                    accountName={form.account}
                ></VertifiCode>
            </ModalComponent>
        </Fragment>

    );

}

export default LoginPages