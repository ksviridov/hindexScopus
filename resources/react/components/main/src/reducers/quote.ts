import update from 'immutability-helper'
import { Article, Payload, Action } from './types'

import {
    
} from '../actions/types'


export interface Store {
    by_me: Article[],
    for_me: Article[],
}

export const initialState: Store = {
    by_me: [],
    for_me: [],
}

export const reducers = {
    
}

export default (state = initialState, action: Action) =>
    reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
