import update from 'immutability-helper'

import {
    GET_STATE,
} from '../actions/types'

export type Payload = any

export type Action = {
    type: string,
    payload: Payload,
    requestPayload?: Payload
}

export interface Store {
    api: {
        [propName: string]: string
    },
}

export const initialState: Store = {
    api: {
        hot: undefined,
        all: undefined,
        promise: undefined,
        search: undefined
    },
}

export const reducers = {
    [GET_STATE]: (payload: Payload) => ({ api: { $set: payload } }),
}

export default (state = initialState, action: Action) =>
    reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
