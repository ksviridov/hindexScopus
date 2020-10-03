import { css } from 'styled-components'

import { StructTheme, Container, StyledProps } from './theme'

interface Props extends StyledProps {}

export const header = css`
    padding: 1rem 4rem;
    background: #fff;
    z-index: 1;
    box-shadow: 0 0 10px #ddd;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: ${(props: Props) => props.theme.colors.fg.main};
`

export const content = css`
    position: relative;
    flex-direction: column;
    padding: 3rem;
    background: #fff;
    box-shadow: 0 0 10px #ddd;
`

export const footer = css`
    position: relative;
    padding: 1rem 4rem;
    background: #fff;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    box-shadow: 0 0 10px #ddd;
`

export const tile = css`
`

export const styles: StructTheme<Container> = {
    default: {
        header,
        content,
        footer,
        tile: css`
            ${tile}

            padding: 2rem 4rem;
            background: #fff;
            box-shadow: 0 0 10px #ddd;
            border-radius: 1rem;
        `
    },
    accent: {
        header,
        content,
        footer,
        tile: css`
            ${tile}

            padding: 2rem 2rem;
            background: ${(props: Props) => props.theme.colors.bg.caution};
            border-radius: .5rem;
        `
    }
}

export default styles
