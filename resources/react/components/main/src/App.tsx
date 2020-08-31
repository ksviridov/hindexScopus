import React, { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useDispatch } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'reflexbox'

import { getState } from './actions'

import theme from 'theme'
import { debouncedImport } from 'utils'

import Header from './header'

const Main = lazy(() => debouncedImport(() => import('./views/Main')))

export const App = () => {
    const dispatch = useDispatch()

    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        dispatch(getState())
            .then(() => (
                setIsInitialized(true)
            ))
            .catch(console.error)
    }, [])
    return (
        !isInitialized && <Skeleton /> || <Flex width="100%" justifyContent="center" sx={{ background: '#f9f9f9', minHeight: '100%' }}>
            <BrowserRouter basename={window.BASE_URL ? new URL(window.BASE_URL).pathname : '/'}>
                <Route path="" render={({ location }) =>
					<Box width="100%">
                        <Header />
						<Switch location={location}>
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
