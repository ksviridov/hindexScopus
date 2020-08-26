interface TextField {
    [propName: string]: string
}

export type Colors = {
    fg: TextField,
    bg: TextField
}

export type Theme = {
    Colors: Colors
}
