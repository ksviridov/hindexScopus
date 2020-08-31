export type Payload = any

export type Action = {
    type: string,
    payload: Payload,
    requestPayload?: Payload
}

export type Article = {
    citesNeeded: number,
    name: string,
    articleID: number | string,
    title?: string
}