import { API, DispatchFn } from 'utils'
import { Store } from '../reducers/index'
import {
    GET_STATE,
    GET_HOT_PUBLICATIONS
} from './types'

export type State = () => Store

export const getState = (actionType = GET_STATE) =>
    (dispatch: DispatchFn) => new API().read({ url: '/api', actionType, dispatch })

export const getHotPublications = (actionType = GET_HOT_PUBLICATIONS) =>
    (dispatch: DispatchFn, getState: State) => new API().read({ url: getState().api.hot, actionType, dispatch })
