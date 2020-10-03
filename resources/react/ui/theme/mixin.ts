import { css } from 'styled-components'
import base64 from 'base-64'
import format from 'string-template'

import { window } from './size'

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

export const device = {
    mobileS: `(min-width: ${window.mobileS})`,
    mobileM: `(min-width: ${window.mobileM})`,
    mobileL: `(min-width: ${window.mobileL})`,
    tablet: `(min-width: ${window.tablet})`,
    laptop: `(min-width: ${window.laptop})`,
    laptopL: `(min-width: ${window.laptopL})`,
    desktop: `(min-width: ${window.desktop})`,
    desktopL: `(min-width: ${window.desktop})`
  };
  

const loadIcon = (icon: string, formats) => {
    return `data:image/svg+xml;utf8;base64,${base64.encode(format(icon, formats))}`
}

export const icons = {
    dark: {
        back: loadIcon(require('./icons/back.svg'), { color: '#000' }),
        next: loadIcon(require('./icons/next.svg'), { color: '#000' }),
        spinner: loadIcon(require('./icons/spinner.svg'), { color: '#000' }),
        user: loadIcon(require('./icons/user.svg'), { color: '#000' }),
        burger: loadIcon(require('./icons/burger.svg'), { color: '#000' }),
    },
    light: {
        search: loadIcon(require('./icons/search.svg'), { color: '#999' }),
        arrow_down: loadIcon(require('./icons/down-arrow.svg'), { color: '#999' }),
        user: loadIcon(require('./icons/user.svg'), { color: '#999' }),
        burger: loadIcon(require('./icons/burger.svg'), { color: '#999' }),
    },
    red: {
        close: loadIcon(require('./icons/close.svg'), { color: '#eb340a' }),
    },
    white: {
        spinner: loadIcon(require('./icons/spinner.svg'), { color: '#fff' }),
    }
}
