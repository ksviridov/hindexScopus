import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useWindowWidth } from '@react-hook/window-size'
import Cookies from 'js-cookie'

import { HistoryProps, ComponentInterface } from 'utils'
import { Flex, Box } from 'reflexbox'
import { Container, Skeleton as UISkeleton, Button, Dropdown, Icon } from 'ui'
import theme from 'theme'

import { useAuthorization } from './helper'

import { logout } from './actions'

export const Component: ComponentInterface<{}> = withRouter((props: HistoryProps) => {
    const dispatch = useDispatch()
    const weight = useWindowWidth()
    const [progress, setProgress] = useState([])

    const authrization = useAuthorization()

    const isMobile = React.useMemo(() => weight <= parseInt(theme.size.window.tablet) , [weight]);

    const [activeMenu, setActiveMenu] = React.useState(false)

    const showMenu = React.useMemo(() => !isMobile || activeMenu, [isMobile, activeMenu])

    const handleLogout = () => {
        Cookies.remove('XSRF-TOKEN')

        dispatch(logout())
            .finally(() => window.location.reload())
    }

    useEffect(() => {
        //TODO: load user information
    }, [])

    return (
        <Container sx={{ mb: '5rem', zIndex: '20', position: 'relative' }}>
            <Container.Header style={{ borderRadius: '0' }} flexDirection={isMobile ? 'column': 'initial'}>
                {!isMobile && <Dropdown toggle={
                    <Icon background={theme.mixin.icons.light.user} size="3rem" sx={{ mr: '5rem' }}/>
                }>
                    {!authrization ? <Dropdown.Button onClick={() => props.history.push('/login')}>Войти</Dropdown.Button> : null}
                    {authrization ? <Dropdown.Button onClick={handleLogout}>Выйти</Dropdown.Button> : null}
                    <Dropdown.Button onClick={() => props.history.push('/register')}>Регистрация</Dropdown.Button>
                </Dropdown> || null}
                { isMobile && <Button background={theme.mixin.icons.light.burger} sx={{ width: '3rem', height: '3rem' }} onClick={() => setActiveMenu(!activeMenu)} /> }
                {showMenu && <Flex alignItems="center" flexDirection={isMobile ? 'column': 'initial'} sx={isMobile && { width: '100%' }}>
                    <Button styles={props.location.pathname == '/' ? theme.button.styles.unaccent : null} sx={!isMobile && { mr: '5rem' } || { width: '100%' }} onClick={() => props.history.push({ pathname: '/' })}>Цитировать</Button>
                    <Button styles={props.location.pathname == '/quote' ? theme.button.styles.unaccent : null} sx={!isMobile && { mr: '5rem' } || { width: '100%' }} onClick={() => props.history.push({ pathname: '/quote' })}>Процитировано</Button>
                    <Button styles={props.location.pathname == '/promised' ? theme.button.styles.unaccent : null} sx={{ width: '100%' }} onClick={() => props.history.push({ pathname: '/promised' })}>Обещано к цитированию</Button>
                </Flex> || null}
            </Container.Header>
        </Container>
    )
})

Component.Skeleton = () => (
    <Container sx={{ mb: '3rem', width: '100%' }}>
        <Container.Header style={{ borderRadius: '0' }}>
            <UISkeleton height="3rem" width="3rem" mr="5rem" style={{ borderRadius: '50%' }} />
            <UISkeleton height="3rem" width="6rem" mr="2rem" />
            <UISkeleton height="3rem" width="6rem" />
        </Container.Header>
    </Container>
)

export default Component
