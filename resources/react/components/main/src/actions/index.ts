import { API } from 'utils'

import {
    GET_STATE,
    GET_HOT_PUBLICATIONS
} from './types'

export const getState = (actionType = GET_STATE) =>
    dispatch => new API().read({ url: '/api', actionType, dispatch })
