import React from 'react'
import axios, { AxiosPromise } from 'axios'
import _max from 'lodash/max'
import { withRouter } from 'react-router-dom'

import { Theme } from 'theme/types'

export interface HistoryProps {
    history: Array<any>,
    location: { pathname: string, search: string, hash: string, state: any }
}

export interface ComponentInterface<T> {
    (props: T): React.FC,
    Skeleton?: React.FC
}

export interface CRUD<T> {
    create(props: T): Promise<any>,
    read(props: T): Promise<any>,
    update(props: T): Promise<any>,
    delete(props: T): Promise<any>,
}

export interface SearchCriteria {
    [propName: string]: string;
}

export type Dispatch = {
    type: string,
    payload: any,
    requestPayload: any
}

export type DispatchFn = (props: Dispatch) => any

export type ApiProps = {
    url: string,
    searchCriteria?: SearchCriteria,
    payload?: any,
    actionType?: string,
    dispatch?: DispatchFn
}

export type Import = () => Promise<any>

export const DELAY = 1000

export const debouncedImport = (action: Import, delay = DELAY) => new Promise(resolve =>
	(start => action().then(response => setTimeout(() => resolve(response), _max([Date.now() - start, delay]))))(Date.now())
)

export class API implements CRUD<ApiProps> {
    create({ url, actionType, dispatch }: ApiProps) {
        return this.handleResponse(axios.post(
            url
        ), actionType, dispatch)
    }

    read({ url, searchCriteria, actionType, dispatch, payload }: ApiProps) {
        return this.handleResponse(axios.get(
            searchCriteria ? this.applySearchCriteria(url, searchCriteria) : url
        ), actionType, dispatch, payload)
    }

    update({ url, actionType, dispatch, payload }: ApiProps) {
        return this.handleResponse(axios.put(
            url
        ), actionType, dispatch, payload)
    }

    delete({ url, actionType, dispatch, payload }: ApiProps) {
        return this.handleResponse(axios.delete(
            url
        ), actionType, dispatch, payload)
    }

    applySearchCriteria(url: string, searchCriteria: SearchCriteria) {
		return url.concat('?' +
			Object.entries(searchCriteria)
				.map(([criteria, value]) => `${criteria}=${value}&`))
	}

    handleResponse(request: AxiosPromise, actionType: string, dispatch: DispatchFn, payload?: any): Promise<any> {
        return actionType && dispatch ?
            request.then(response => dispatch({ type: actionType, payload: response.data, requestPayload: payload })) :
            request
    }

    static setToken(token) {
        axios.defaults.headers.common['Authorization'] = token
    }

    static setTokenUpdateInterceptor(getTokenUrl) {
        axios.interceptors.response.use(
            null,
            error => (
                console.error(error),
                error.response.status === 401 ?
                axios.get(getTokenUrl)
                    .then(({ data: token }) => (
                        error.config.headers.Authorization = axios.defaults.headers.common['Authorization'] = token,
                        axios.request(error.config)
                    ))
                : Promise.reject(error)
            )
        )
    }
}
