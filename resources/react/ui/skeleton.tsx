import React from 'react'
import { Flex } from 'reflexbox'
import styled from 'styled-components'

import { Skeleton as SkeletonType, Theme } from 'theme/types'
import { Props, UIElement } from './types'

interface SkeletonProps extends Props<SkeletonType, Theme> {
    height?: string,
    width?: string
}

export const Component: UIElement<SkeletonProps> = Flex

export default styled(Component)`${(props: SkeletonProps) => props.theme.skeleton.default}`
