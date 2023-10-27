import { useCallback, useState } from 'react'
import styles from './CreateAccount.module.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ModalComponent from '../../Component/Modal/ModalComponent';
import VertifiCode from './VertifiCode/VertifiCode';

interface ICreateAccount {
    name?: string,
    email?: string,
    account?: string,
    password?: string,
    img?: any
}

function CreateAccount(props: ICreateAccount) {
    const [validForm, setValidForm] = useState<boolean>(false)
    const [form, setForm] = useState<ICreateAccount>({})
    const [errors, setErrors] = useState<ICreateAccount>({})

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
        const newErrors: ICreateAccount = {}
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
        }
    }, [findFormErrors])

    return (
        <div className='pb-4'>
            <div className='h3 pb-3 text-center'>Create Account</div>
            <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">
                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                isInvalid={!!errors.name}
                                onChange={(e) => {
                                    setField('name', e.target.value)
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">
                                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                aria-describedby="inputGroupPrepend"
                                required
                                isInvalid={!!errors.email}
                                onChange={(e) => {
                                    setField('email', e.target.value)
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">
                        <Form.Label>Account</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Account"
                                aria-describedby="inputGroupPrepend"
                                required
                                isInvalid={!!errors.account}
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
                    <Form.Group as={Col} controlId="validationCustomUsername">
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="passwordLabel">
                                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                            </InputGroup.Text>
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
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustomUsername">
                        <Form.Label>Avatar</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="file"
                                accept='.png .jpg'
                                placeholder="Avatar"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a avatar.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <div className={`d-flex justify-content-center align-items-center pt-3`}>
                    <div className={`d-flex justify-content-end`}>
                        <Button variant="primary" type='submit'>Create Account</Button>
                    </div>
                </div>
            </Form>
            <ModalComponent
                header='Vertify code'
                confirm='Confirm'
                visible={validForm}
                setLoginShow={setValidForm}
            >
                <VertifiCode></VertifiCode>
            </ModalComponent>
        </div>
    );
}

export default CreateAccount