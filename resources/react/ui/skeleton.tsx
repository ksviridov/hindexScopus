import React from 'react'
import { Flex } from 'reflexbox'
import styled from 'styled-components'

import { Skeleton as SkeletonType, Theme } from 'theme/types'
import { Props, UIElement } from './types'

interface SkeletonProps extends Props<SkeletonType, Theme> {
    height?: string,
    width?: string,
    mr?: string,
    ml?: string,
    m?: string,
    mx?: string,
    my?: string
}

export const Component: UIElement<SkeletonProps> = props => <Skeleton {...props} />

export const Skeleton = styled(Flex)`${(props: SkeletonProps) => props.theme.skeleton.default}`

export default Component
