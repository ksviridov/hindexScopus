import { API, DispatchFn, Dispatch } from 'utils'
import { Store } from '../reducers/index'
import {
    GET_STATE,
    GET_HOT_PUBLICATIONS,
    QUOTE_ARTICLE,
    GET_QUOTES_BY,
    GET_PROMISED_BY,
    LOGIN,
    LOGOUT,
    REGISTER
} from './types'

export type State = () => Store

export const getState = (actionType = GET_STATE) =>
    (dispatch: DispatchFn) => new API().read({ url: '/api/info', actionType, dispatch })

export const getHotPublications = (actionType = GET_HOT_PUBLICATIONS) =>
    (dispatch: DispatchFn, getState: State) => new API().read({ url: getState().app.api.hot, actionType, dispatch })

export const getAllPublications = (actionType = GET_HOT_PUBLICATIONS) =>
    (dispatch: DispatchFn, getState: State) => new API().read({ url: getState().app.api.all, actionType, dispatch })

export const quoteArticle = (payload, actionType = QUOTE_ARTICLE) =>
    (dispatch: DispatchFn, getState: State) => new API().update({ url: `${getState().app.api.citation}/${payload.articleId}`, payload, actionType, dispatch })

export const getQuotes = (searchCriteria, actionType = GET_QUOTES_BY) =>
    (dispatch: DispatchFn, getState: State) => new API().read({ url: getState().app.api.quote, searchCriteria, dispatch, actionType })

export const getPromises = (searchCriteria, actionType = GET_PROMISED_BY) =>
    (dispatch: DispatchFn, getState: State) => new API().read({ url: getState().app.api.promise, searchCriteria, dispatch, actionType })

export const login = (payload, actionType = LOGIN) =>
    (dispatch: DispatchFn) => new API().create({ url: '/api/login', payload })

export const logout = (actionType = LOGOUT) =>
    (dispatch: DispatchFn) => new API().read({ url: '/api/logout' })

export const register = (payload, actionType = REGISTER) =>
    (dispatch: DispatchFn) => new API().create({ url: '/api/register', payload })
