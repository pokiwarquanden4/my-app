import { Dispatch, useCallback, useState, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { routes } from '../pages/pages';

interface ILoginPages {
    setLoginShow: Dispatch<SetStateAction<boolean>>
}

interface ILogin {
    password?: string
}

function LoginPages(props: ILoginPages) {
    const [form, setForm] = useState<ILogin>({})
    const [errors, setErrors] = useState<ILogin>({})
    const navigate = useNavigate()

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
            password: ""
        })
    }, [errors, form])

    const findFormErrors = useCallback(() => {
        const newErrors: ILogin = {}
        // password error
        if (!form.password) {
            newErrors.password = "Please Enter Passord"
        } else {
            if (!validPassword(form.password)) {
                newErrors.password = "Password need at least 10 letter"
            }
        }

        return newErrors
    }, [form.password, validPassword])

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
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please Enter Your Account Name
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustomUsername">
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
                            Password need at least 10 letter
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