import { css } from 'styled-components'

import { StyledProps } from './theme'

interface Props extends StyledProps {
	background: string,
	size?: string;
}

export default css`
	background: url(${(props: Props) => props.background}) 0 0 / 100% no-repeat;
	width: ${(props: Props) => props.size || '2rem'};
    height: ${(props: Props) => props.size || '2rem'};
    
	${(props: Props) => props.theme.mixin.transition}
`
