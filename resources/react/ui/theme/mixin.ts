import { css } from 'styled-components'
import base64 from 'base-64'

export const transition = css`
    transition: .2s;
`

export const fade = css`
    ${transition}
    
    &.fade-enter {
        opacity: 0;
    }
    &.fade-enter-done {
        opacity: 1;
    }
    &.fade-exit {
        opacity: 1;
    }
    &.fade-exit-active {
        pointer-events: none;
        opacity: 0;
    }
`

export const icons = {
    dark: {
        back: `data:image/svg+xml;utf8;base64,${base64.encode(require('./icons/back.svg'))}`,
        next: `data:image/svg+xml;utf8;base64,${base64.encode(require('./icons/next.svg'))}`,
    }
}
