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

export const rotateZ = css`
    animation: rotate 1.5s 0s infinite;
    
    @keyframes rotate {
        0% {
            transform: rotateZ(0deg);
        }
        50% {
            transform: rotateZ(180deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
`

export const icons = {
    dark: {
        back: `data:image/svg+xml;utf8;base64,${base64.encode(require('./icons/back.svg'))}`,
        next: `data:image/svg+xml;utf8;base64,${base64.encode(require('./icons/next.svg'))}`,
        spinner: `data:image/svg+xml;utf8;base64,${base64.encode(require('./icons/spinner.svg'))}`,
    },
    light: {
        search: `data:image/svg+xml;utf8;base64,${base64.encode(require('./icons/search.svg'))}`,
        arrow_down: `data:image/svg+xml;utf8;base64,${base64.encode(require('./icons/down-arrow.svg'))}`,
    },
    red: {
        close: `data:image/svg+xml;utf8;base64,${base64.encode(require('./icons/close.svg'))}`,
    },
    white: {
        spinner: `data:image/svg+xml;utf8;base64,${base64.encode(require('./icons/spinner_white.svg'))}`,
    }
}
