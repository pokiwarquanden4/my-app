import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import styles from './VertifiCode.module.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useAppDispatch } from '../../../App/hook';
import { vertifiOtp } from '../../LoginPages/LoginAPI';
import { showAlert } from '../../../Component/Alert/Alert';

interface IVertifiCode {
    code?: string
}

interface IVertify {
    setVertifiForm: Dispatch<SetStateAction<boolean>>
    accountName: string
}

function VertifiCode(props: IVertify) {
    const dispatch = useAppDispatch()
    const [form, setForm] = useState<IVertifiCode>({})
    const [errors, setErrors] = useState<IVertifiCode>({})

    const setField = useCallback((field: string, value: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            code: field === "code" && !!prevErrors.code ? "" : prevErrors.code,
        }));
    }, [])

    const findFormErrors = useCallback(() => {
        const newErrors: IVertifiCode = {}
        // code error
        if (!form.code) {
            newErrors.code = "Please Enter Code"
        }

        return newErrors
    }, [form.code])

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault()
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            const res = await dispatch(vertifiOtp({
                account: props.accountName,
                otp: form.code as string
            }))

            if (res.payload.status === 200) {
                props.setVertifiForm(false)
                showAlert("Please check your new password in email")
            }
        }
    }, [dispatch, findFormErrors, form.code, props])

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustomUsername">
                    <Form.Label>Check Your Email For Code</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Code"
                            aria-describedby="inputGroupPrepend"
                            required
                            isInvalid={!!errors.code}
                            onChange={(e) => {
                                setField('code', e.target.value)
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.code}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <div className={`d-flex justify-content-between align-items-center`}>
                <div
                    style={{ cursor: 'pointer', color: '#0d6efd', fontSize: '14px' }}
                >
                    Resend the code !!!
                </div>
                <div className={`d-flex justify-content-end`}>
                    <Button variant="primary" type='submit'>Confirm</Button>
                </div>
            </div>
        </Form>
    );

}

export default VertifiCode