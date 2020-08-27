interface TextField {
    [propName: string]: string
}

export interface StructTheme<T> {
    [propName: string]: T,
    default: T
}

export type Style = string[]

export type StyledProps = {
    theme: Theme,
    disabled: boolean
}

export type Button = {
    container: Style,
    button: Style
}

export type Input = {
    label: Style,
    container: Style,
    input: Style
}

export type Colors = {
    fg: TextField,
    bg: TextField
}

export type Mixin = {
    transition: Style,
    fade: Style
}

export type Theme = {
    button: Button,
    input: Input,
    colors: Colors,
    mixin: Mixin
}
