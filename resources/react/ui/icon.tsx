import React from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

import { Icon as IconType, Theme } from 'theme/types'
import { Props, UIElement } from './types'

interface IconProps extends Props<IconType, Theme> {
    background: string
}

export const Component: UIElement<IconProps> = props =>
	<Icon {...props} />

export const Icon = styled((props: IconProps) => <Flex flexDirection="column" {...props}></Flex>)`${(props: IconProps) => props.theme.icon.default}`

export default Component
