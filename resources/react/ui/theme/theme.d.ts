interface TextField {
    [propName: string]: string
}

export interface StructTheme<T> {
    [propName: string]: T,
    default: T
}

type ModuleStruct<T> = {
    styles?: StructTheme<T>,
    default: T | StructTheme<T>,
}

export type Style = string[]

export type StyledProps = {
    theme: Theme,
    disabled?: boolean
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

export type Text = {
    label: Style,
    accent: Style,
    header: Style,
    placeholder: Style,
    p: Style,
    required: Style,
    box: Style
}

export type Skeleton = Style

export type Container = {
    header: Style,
    content: Style,
    footer: Style,
    tile: Style
}

export type Dropdown = {
    container: Style,
    toggle: Style,
    dropdown: Style,
    button: Style
}

export type Icon = Style

export type Colors = {
    fg: TextField,
    bg: TextField
}

export interface MixinIcons {
    [propName: string]: {
        [propName: string]: string
    }
}

export type Mixin = {
    transition: Style,
    fade: Style,
    icons: MixinIcons
}

export type Theme = {
    button: ModuleStruct<Button>,
    input: ModuleStruct<Input>,
    text: ModuleStruct<Text>,
    skeleton: ModuleStruct<Skeleton>,
    container: ModuleStruct<Container>,
    dropdown: ModuleStruct<Dropdown>,
    icon: ModuleStruct<Icon>,
    colors: Colors,
    mixin: Mixin
}
