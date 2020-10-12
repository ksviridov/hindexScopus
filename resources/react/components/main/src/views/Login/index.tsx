import React from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Flex, Box } from 'reflexbox'
import { Container, Text, Input, Button, Skeleton as UISkeleton } from 'ui'

import theme from 'theme'

import { login } from '../../actions'
import { isAuthorization } from '../../helper'

export const Component: React.FC<any> = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [process, setProcess] = React.useState(false)

    const autoriazation = isAuthorization()

    const handleToMain = () => {
        history.push('/')
    }

    const handleToRegister = () => {
        history.push('/register')
    }

    const handleEnter = () => {
        if(!email) {
            toast.error('Введите почту')
            return
        }

        if(!password) {
            toast.error('Введите пароль')
            return
        }

        setProcess(true)

        dispatch(login({
            email,
            password
        }))
            .then(console.log)
            .catch((error) => {
                console.error(error)
                toast.error('Ошибка авторизации')
            })
            .finally(() => {
                setProcess(false)
            })
    }

    return (
        <Flex width="100%" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
            <Container sx={{ width: '540px', maxWidth: '100%' }}>
                <Container.Header sx={{ justifyContent: 'center' }}>
                    <Text styles={theme.text.styles.header}>Авторизация</Text>
                </Container.Header>
                <Container.Content sx={{ flexDirection: "column", px: '3rem' }}>
                    {autoriazation ? <Flex>
                        <Button styles={theme.button.styles.link} onClick={handleToMain}>На главную</Button>
                    </Flex> : null}
                    <Box mb="2rem">
                        <Input label="Почта" value={email} onChange={setEmail} />
                    </Box>
                    <Box mb="2rem">
                        <Input type="password" label="Пароль" value={password} onChange={setPassword} />
                    </Box>
                    <Box>
                        <Button onClick={handleEnter} disabled={process} isProcessing={process}>Войти</Button>
                        <Flex justifyContent="center">
                            <Button styles={theme.button.styles.link} onClick={handleToRegister}>Зарегистрироваться</Button>
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
