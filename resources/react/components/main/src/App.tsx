import React, { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useDispatch } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'reflexbox'

import { getState } from './actions'

import theme from 'theme'
import { debouncedImport } from 'utils'

import { Skeleton as MainSkeleton } from './views/Main'

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
        isInitialized && <Flex width="100%" justifyContent="center" sx={{ background: '#f5f5f5', minHeight: '100%' }}>
            <BrowserRouter basename={window.BASE_URL ? new URL(window.BASE_URL).pathname : '/'}>
                <Route path="" render={({ location }) =>
					<Box width="100%">
						<Switch location={location}>
							<Route path="/">
								<Box>
									<Suspense fallback={<MainSkeleton />}>
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

export const Component = () => <ThemeProvider theme={theme}><App /></ThemeProvider>

export default Component
