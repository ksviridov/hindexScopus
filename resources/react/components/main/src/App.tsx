import React, { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'reflexbox'

import { getState } from './actions'

import theme from 'theme'
import { debouncedImport, API } from 'utils'

import Header from './header'

import { useLogin } from './helper'

const Main = lazy(() => debouncedImport(() => import('./views/Main')))
const Login = lazy(() => debouncedImport(() => import('./views/Login')))
const Register = lazy(() => debouncedImport(() => import('./views/Register')))
const Quote = lazy(() => debouncedImport(() => import('./views/Quoted'), 700))
const Promised = lazy(() => debouncedImport(() => import('./views/Promised'), 700))

import { Skeleton as LoginSkeleton } from './views/Login'
import { Skeleton as RegisterSkeleton } from './views/Register'

export const App = () => {
    const dispatch = useDispatch()

    const [isInitialized, setIsInitialized] = useState(false)

    const isLogin = useLogin()

    useEffect(() => {
        dispatch(getState())
            .then(() => (
                setIsInitialized(true)
            ))
            .catch(() => alert('Ошибка загрузки данных, попробуйте зайти позже'))

        const token = Cookies.get('XSRF-TOKEN')
        token && API.setToken(token);
    }, [])

    return (
        !isInitialized && <Skeleton /> || <Flex width="100%" justifyContent="center" sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
            <Route path="" render={({ location }) =>
                <Box width="100%">
                    {isLogin && !['/login', '/register'].includes(location.pathname) ? <Header /> : null}
                    <ToastContainer
                        position="top-right"
                        autoClose={3500}
                        limit={5}
                    />
                    <Switch location={location}>
                        <Route path="/login">
                            <Box>
                                <Suspense fallback={<LoginSkeleton />}>
                                    <Login />
                                </Suspense>
                            </Box>
                        </Route>
                        <Route path="/register">
                            <Box>
                                <Suspense fallback={<RegisterSkeleton />}>
                                    <Register />
                                </Suspense>
                            </Box>
                        </Route>
                        <Route path="/quote">
                            <Box>
                                <Suspense fallback={<></>}>
                                    <Quote />
                                </Suspense>
                            </Box>
                        </Route>
                        <Route path="/promised">
                            <Box>
                                <Suspense fallback={<></>}>
                                    <Promised />
                                </Suspense>
                            </Box>
                        </Route>
                        <Route path="/">
                            <Box>
                                <Suspense fallback={<></>}>
                                    <Main />
                                </Suspense>
                            </Box>
                        </Route>
                    </Switch>
                </Box>
            }></Route>
        </Flex>
    )
}

export const Skeleton = () => (
    <Flex width="100%" justifyContent="center" sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
        <Header.Skeleton />
    </Flex>
)

export const Component = () => (
    <ThemeProvider theme={theme}>
        <BrowserRouter basename={window.BASE_URL ? new URL(window.BASE_URL).pathname : '/'}>
            <App />
        </BrowserRouter>
    </ThemeProvider>)

export default Component
