import update from 'immutable-helpers'

import {
    GET_STATE,
    GET_HOT_PUBLICATIONS
} from '../actions/types'

export type Payload = any

export type Action = {
    type: string,
    payload: Payload,
    requestPayload?: Payload
}

export const initialState = {
    api: {
        hot: undefined,
        promise: undefined,
        search: undefined
    },
    hot: []
}

export const reducers = {
    [GET_STATE]: (payload: Payload) => ({ $merge: payload }),
    [GET_HOT_PUBLICATIONS]: (payload: Payload) => ({ hot: { $set: payload } }),
}

export default (state = initialState, action: Action) =>
  reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
