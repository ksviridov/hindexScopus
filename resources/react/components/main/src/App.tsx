import React, { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'reflexbox'

import { getState } from './actions'

import theme from 'theme'
import { debouncedImport } from 'utils'

import Header from './header'

const Main = lazy(() => debouncedImport(() => import('./views/Main')))
const Quote = lazy(() => debouncedImport(() => import('./views/Quoted'), 700))

export const App = () => {
    const dispatch = useDispatch()

    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        dispatch(getState())
            .then(() => (
                setIsInitialized(true)
            ))
            .catch(() => alert('Ошибка загрузки данных, попробуйте зайти позже'))
    }, [])
    return (
        !isInitialized && <Skeleton /> || <Flex width="100%" justifyContent="center" sx={{ background: '#f9f9f9', minHeight: '100%' }}>
            <BrowserRouter basename={window.BASE_URL ? new URL(window.BASE_URL).pathname : '/'}>
                <Route path="" render={({ location }) =>
                    location.pathname === '/' &&
					<Redirect exact from="/" to="/home" /> ||
					<Box width="100%">
                        <Header />
                        <ToastContainer
                            position="top-right"
                            autoClose={3500}
                            limit={5}
                        />
						<Switch location={location}>
							<Route path="/home">
								<Box>
									<Suspense fallback={<></>}>
										<Main />
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
						</Switch>
					</Box>
				}></Route>
            </BrowserRouter>
        </Flex>
    )
}

export const Skeleton = () => (
    <Flex width="100%" justifyContent="center" sx={{ background: '#f9f9f9', minHeight: '100%' }}>
        <Header.Skeleton />
    </Flex>
)

export const Component = () => <ThemeProvider theme={theme}><App /></ThemeProvider>

export default Component
