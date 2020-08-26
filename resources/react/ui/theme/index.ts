interface StructTheme<T> {
    [propName: string]: T,
    default: T
}

type ModuleStruct<T> = {
    styles?: StructTheme<T>,
    default: T | StructTheme<T>,
}

import {
    Colors
} from './theme'

export const colors = require<{ default: Colors }>('./colors').default

export default {
    colors
}