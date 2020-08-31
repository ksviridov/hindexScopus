import update from 'immutability-helper'
import { Article, Payload, Action } from './types'

import {
    GET_QUOTES_BY,
    GET_QUOTES_FOR,
} from '../actions/types'


export interface Store {
    by: Article[],
    for: Article[],
}

export const initialState: Store = {
    by: [],
    for: [],
}

export const reducers = {
    [GET_QUOTES_BY]: (payload: Payload) => ({ by: { $set: payload } }),
    [GET_QUOTES_FOR]: (payload: Payload) => ({ for: { $set: payload } }),
}

export default (state = initialState, action: Action) =>
    reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
