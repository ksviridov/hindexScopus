import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Flex } from 'reflexbox'

import theme from 'theme'
import { Container, Skeleton as UISkeleton } from 'ui'

export const App = () => {
    return (
        <Skeleton />
    )
}

export const Skeleton = () => (
    <Flex flexDirection="column">
        <Container sx={{ mb: '3rem' }}>
            <Container.Header>
                    <UISkeleton height="3rem" width="3rem" mr="5rem" style={{ borderRadius: '50%' }} />
                    <UISkeleton height="3rem" width="8rem" mr="5rem" />
                    <UISkeleton height="3rem" width="8rem" />
            </Container.Header>
        </Container>
    </Flex>
)

export const Component = () => <ThemeProvider theme={theme}><App /></ThemeProvider>

export default Component
