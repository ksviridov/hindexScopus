import { API, DispatchFn } from 'utils'
import { Store } from '../reducers/index'
import {
    GET_STATE,
    GET_HOT_PUBLICATIONS,
    SEARCH_ARTICLES,
    QUOTE_ARTICLE
} from './types'

export type State = () => Store

export const getState = (actionType = GET_STATE) =>
    (dispatch: DispatchFn) => new API().read({ url: '/api', actionType, dispatch })

export const getHotPublications = (actionType = GET_HOT_PUBLICATIONS) =>
    (dispatch: DispatchFn, getState: State) => new API().read({ url: getState().api.hot, actionType, dispatch })

export const searchArticled = (payload, actionType = SEARCH_ARTICLES) =>
    (dispatch: DispatchFn, getState: State) => new API().read({ url: getState().api.search, actionType, payload })

export const quoteArticle = (payload, actionType = QUOTE_ARTICLE) =>
    (dispatch: DispatchFn, getState: State) => new API().update({ url: getState().api.quote, payload, actionType, dispatch })
