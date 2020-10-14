import React from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import { Flex, Box } from 'reflexbox'
import { Container, Text, Input, Button, Skeleton as UISkeleton } from 'ui'

import theme from 'theme'

import { register } from '../../actions'
import { useAuthorization } from '../../helper'
import { API } from 'utils'

export interface FormField {
    label: string;
    name: string;
    type: 'password' | 'text';
    required: boolean;
}

export interface FormFields {
    [key: string]: FormField
}

export interface Form {
    [key: string]: any
}

export const Component: React.FC<any> = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [process, setProcess] = React.useState(false)
    const [fields]: [FormFields, Function] = React.useState<FormFields>({
        email: { label: 'Почта', name: 'email', type: 'email', required: true },
        name: { label: 'Имя', name: 'name', type: 'text', required: true },
        scopus_id: { label: 'Scopus ID', name: 'scopus_id', type: 'text', required: true },
        password: { label: 'Пароль', name: 'password', type: 'password', required: true },
        password_confirm: { label: 'Повторите пароль', name: 'password_confirm', type: 'password', required: true },
    })
    const [form, setForm]: [Form, Function] = React.useState<Form>({})

    const handleUpdateForm = (field: string, value: any) => {
        setForm({ ...form, [field]: value })
    }

    const autoriazation = useAuthorization()

    const handleToMain = () => {
        history.push('/')
    }

    const handleToLogin = () => {
        history.push('/login')
    }

    const handleEnter = () => {
        const formFields = Object.values(fields)

        for (let i = 0; i < formFields.length; i++) {
            if (formFields[i].required && !form[formFields[i].name]) {
                toast.error(`Заполните, пожалуйста, поле "${formFields[i].label}"`);
                return;
            }
        }

        setProcess(true)

        dispatch(register(form))
            .then(({ data }) => {
                API.setToken(Cookies.get('XSRF-TOKEN'));

                handleToMain()
            })
            .catch((error) => {
                console.error(error)
                toast.error('Ошибка регистрации')
            })
            .finally(() => {
                setProcess(false)
            })
    }

    return (
        <Flex width="100%" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
            <Container sx={{ width: '540px', maxWidth: '100%' }}>
                <Container.Header sx={{ justifyContent: 'center' }}>
                    <Text styles={theme.text.styles.header}>Регистрация</Text>
                </Container.Header>
                <Container.Content sx={{ flexDirection: "column", px: '3rem' }}>
                    {autoriazation ? <Flex>
                        <Button styles={theme.button.styles.link} onClick={handleToMain}>На главную</Button>
                    </Flex> : null}
                    {Object.values(fields).map((field: FormField) =>
                        <Box mb="2rem" key={fields.name}>
                            <Text styles={theme.text.styles.label} sx={{ mb: '.5rem' }} required={field.required}>{ field.label }</Text>
                            <Input type={field.type || 'text'} value={form[field.name]} onChange={value => handleUpdateForm(field.name, value)} />
                        </Box>
                    )}
                    {/*<Box mb="2rem">
                        <Text styles={theme.text.styles.label} sx={{ mb: '.5rem' }} required>Почта</Text>
                        <Input value={form.email} onChange={value => } />
                    </Box>
                    <Box mb="2rem">
                        <Text styles={theme.text.styles.label} sx={{ mb: '.5rem' }} required>Пароль</Text>
                        <Input type="password" value={form.password} onChange={setPassword} />
                    </Box>*/}
                    <Box>
                        <Button onClick={handleEnter} disabled={process} isProcessing={process}>Войти</Button>
                        <Flex justifyContent="center">
                            <Button styles={theme.button.styles.link} onClick={handleToLogin}>Уже есть аккаунт?</Button>
                        </Flex>
                    </Box>
                </Container.Content>
            </Container>
        </Flex>
    )
}

export const Skeleton = () => (
    <Flex width="100%" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
        <Container sx={{ width: '540px', maxWidth: '100%' }}>
            <Container.Header>
                <UISkeleton height="2rem" width="80%" />
            </Container.Header>
            <Container.Content sx={{ flexDirection: "column", px: '3rem' }}>
                <UISkeleton height="2rem" width="80%" mb="2rem" />
                <UISkeleton height="2rem" width="40%" mb="2rem" />
                <UISkeleton height="2rem" width="60%" mb="2rem" />
            </Container.Content>
        </Container>
    </Flex>
)

export default Component
