import React from 'react'
import { ThemeProvider } from 'styled-components'

import { API } from 'utils'
import theme from 'theme'

export const App = () => {
    return (
        <h1>Hello!</h1>
    )
}

export const Component = () => <ThemeProvider theme={theme}><App /></ThemeProvider>

export default Component
