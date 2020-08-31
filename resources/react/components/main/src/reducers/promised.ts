import update from 'immutability-helper'
import { Article, Payload, Action } from './types'

import {
    QUOTE_ARTICLE
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
    [QUOTE_ARTICLE]: (payload: Payload) => ({ by: { $push: [payload] } }),
}

export default (state = initialState, action: Action) =>
    reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
