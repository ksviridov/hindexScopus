import { css } from 'styled-components'
import { StructTheme, Button, StyledProps } from './theme'

interface Props extends StyledProps {}

export const container = css`
    position: relative;
    font-size: 1.1rem;
    font-weight: 400;
    text-transform: uppercase;
`

export const button = css`
    font-size: 1.1rem;
    font-weight: 400;
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    background: ${(props: Props) => props.theme.colors.bg.common};
    text-transform: uppercase;
    padding: 10px 15px;

    ${(props: Props) => props.theme.mixin.transition}

    &:hover, &:focus {
        opacity: .8;
    }

    ${(props: Props) => props.disabled && css`
        cursor: not-allowed;
        opacity: .3;
        color: ${(props: Props) => props.theme.colors.fg.light};
        &:hover, &:focus {
            opacity: .3;
        }
    `}

    ${props => props.background && css`
		padding: .75rem .75rem;
		border-radius: 0;
		background: url(${props.background}) 0 0 / 100% no-repeat;
	`}
`

export const styles: StructTheme<Button> = {
    default: {
        container,
        button
    },
    accent: {
        container,
        button: css`
            ${button}

            background: ${(props: Props) => props.theme.colors.bg.accent};

            &:hover, &:focus {
                
            }
        `
    },
    unaccent: {
        container,
        button: css`
            ${button}

            background: #fff;
            border: 1px solid #999;
            color: #222;

            &:hover, &:focus {
                border-color: ${(props: Props) => props.theme.colors.bg.common};
            }
        `
    }
}

export default styles
