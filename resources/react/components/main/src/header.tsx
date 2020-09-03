import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { HistoryProps, ComponentInterface } from 'utils'
import { Container, Skeleton as UISkeleton, Button } from 'ui'

export const Component: ComponentInterface<{}> = withRouter((props: HistoryProps) => {
    const [progress, setProgress] = useState([])

    const navigateToMain = () => props.history.push({ pathname: '/' })
    const navigateToQuoted = () => props.history.push({ pathname: '/quote' })
    const navigateToPromised = () => props.history.push({ pathname: '/promised' })

    useEffect(() => {
        //TODO: load user information
    }, [])

    return (
        <Container sx={{ mb: '5rem' }}>
            <Container.Header>
                <UISkeleton height="3rem" width="3rem" mr="5rem" style={{ borderRadius: '50%' }} />
                <Button sx={{ mr: '5rem' }} onClick={navigateToMain}>Цитировать</Button>
                <Button sx={{ mr: '5rem' }} onClick={navigateToQuoted}>Процитировано</Button>
                <Button onClick={navigateToPromised}>Обещано к цитированию</Button>
            </Container.Header>
        </Container>
    )
})

Component.Skeleton = () => (
    <Container sx={{ mb: '3rem', width: '100%' }}>
        <Container.Header>
            <UISkeleton height="3rem" width="3rem" mr="5rem" style={{ borderRadius: '50%' }} />
            <UISkeleton height="3rem" width="8rem" mr="5rem" />
            <UISkeleton height="3rem" width="8rem" mr="5rem" />
            <UISkeleton height="3rem" width="8rem" />
        </Container.Header>
    </Container>
)

export default Component
