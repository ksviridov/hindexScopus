import {
    StructTheme,
    Button,
    Input,
    Text,
    Colors,
    Mixin,
} from './theme'

type ModuleStruct<T> = {
    styles?: StructTheme<T>,
    default: T | StructTheme<T>,
}

export const button = require<ModuleStruct<Button>>('./button')
export const input = require<ModuleStruct<Input>>('./input')
export const text = require<ModuleStruct<Text>>('./text')

export const mixin = require<ModuleStruct<Mixin>>('./mixin')
export const colors = require<{ default: Colors }>('./colors').default

export default {
    button,
    input,
    text,
    mixin,
    colors
}
