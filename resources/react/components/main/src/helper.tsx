import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

export const useLogin = () => {
    const history = useHistory()
    const location = useLocation()

    const [isLogin, setIsLogin] = React.useState(false)

    React.useEffect(() => {
        const Token = Cookies.get('XSRF-TOKEN')

        if(!Token) {
            if (!['/login', '/register'].includes(location.pathname)) {
                setIsLogin(false)
                history.push('/login')
            }
        } else {
            setIsLogin(true)
        }
    }, [location])

    return isLogin
}

export const useAuthorization = () => {
    const location = useLocation()

    const Token = Cookies.get('XSRF-TOKEN')

    const [autorization, setAutorization] = React.useState(Token)

    React.useEffect(() => {
        const Token = Cookies.get('XSRF-TOKEN')

        setAutorization(Boolean(Token))
    }, [location])

    return autorization
}
