import {
    ModuleStruct,
    Button,
    Input,
    Skeleton,
    Text,
    Container,
    Dropdown,
    Icon,
    Colors,
    Mixin,
    Theme
} from './theme'

export const button = require<ModuleStruct<Button>>('./button')
export const input = require<ModuleStruct<Input>>('./input')
export const text = require<ModuleStruct<Text>>('./text')
export const skeleton = require<ModuleStruct<Skeleton>>('./skeleton')
export const container = require<ModuleStruct<Container>>('./container')
export const dropdown = require<ModuleStruct<Dropdown>>('./dropdown')
export const icon = require<ModuleStruct<Icon>>('./icon')

export const mixin = require<Mixin>('./mixin')
export const colors = require<{ default: Colors }>('./colors').default

export const theme: Theme = {
    button,
    input,
    text,
    skeleton,
    container,
    dropdown,
    icon,
    mixin,
    colors
}

export default theme
