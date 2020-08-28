import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Flex } from 'reflexbox'

import theme from 'theme'
import { Button, Input, Text, Skeleton, Container, Dropdown, Icon } from 'ui'

export const App = () => {
    return (
        <>
            <Button>text</Button>
            <Input label="test" styles={theme.input.styles.accent} />
            <Text>AAAAA</Text>
            <Skeleton />
            <Container>
                <Container.Header>HEADER</Container.Header>
                <Container.Content>
                    Content
                </Container.Content>
            </Container>
            <Dropdown label="test label">
                <Dropdown.Button>Test element</Dropdown.Button>
            </Dropdown>
            <Icon background="https://picsum.photos/200/300" />
        </>
    )
}

export const Component = () => <ThemeProvider theme={theme}><App /></ThemeProvider>

export default Component
