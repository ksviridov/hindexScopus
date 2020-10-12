import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

export const uesLogin = () => {
    const history = useHistory()
    const location = useLocation()

    const [isLogin, setIsLogin] = React.useState(false)

    React.useEffect(() => {
        const refreshToken = Cookies.get('refresh_token')
        const accessToken = Cookies.get('access_token')

        if(!(refreshToken && accessToken)) {
            if (!['/login', '/register'].includes(location.pathname)) {
                history.push('/login')
            }
        } else {
            setIsLogin(true)
        }
    }, [location])

    return isLogin
}

export const isAuthorization = () => {
    const location = useLocation()

    const refreshToken = Cookies.get('refresh_token')
    const accessToken = Cookies.get('access_token')

    const [autorization, setAutorization] = React.useState(refreshToken && accessToken)

    React.useEffect(() => {
        const refreshToken = Cookies.get('refresh_token')
        const accessToken = Cookies.get('access_token')

        setAutorization(refreshToken && accessToken)
    }, [location])

    return autorization
}
