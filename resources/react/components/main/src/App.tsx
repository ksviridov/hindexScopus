import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from 'theme'
import { Button, Input, Text } from 'ui'

export const App = () => {
    return (
        <>
            <Button>text</Button>
            <Input label="test" styles={theme.input.styles.accent} />
            <Text>AAAAA</Text>
        </>
    )
}

export const Component = () => <ThemeProvider theme={theme}><App /></ThemeProvider>

export default Component
