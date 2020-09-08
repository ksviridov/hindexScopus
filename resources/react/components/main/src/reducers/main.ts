import update from 'immutability-helper'
import { Article, Payload, Action } from './types'

import {
    GET_HOT_PUBLICATIONS,
    SET_ACTIVE_ARTICLE,
} from '../actions/types'

export interface Store {
    hot: Article[],
    active: Article | undefined
}

export const initialState: Store = {
    hot: [],
    active: undefined,
}

export const reducers = {
    [GET_HOT_PUBLICATIONS]: (payload: Payload) => ({ hot: { $set: payload || [] } }),
    [SET_ACTIVE_ARTICLE]: (payload: Payload) => ({ active: { $set: payload } }),
}

export default (state = initialState, action: Action) =>
    reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
