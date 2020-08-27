import React from 'react'

export interface SxProps {
    [propName: string]: string
}

export interface Context<T> {
    styles: T | undefined
}

export interface Props<T, U> extends React.HTMLAttributes<HTMLDivElement> {
    styles?: T,
    theme?: U,
    sx?: SxProps,
    'data-testid'?: string
}
