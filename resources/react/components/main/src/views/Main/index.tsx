import React from 'react'

import { Flex } from 'reflexbox'

import Header from './header'
import HotList from './hot'

export const Component = () => {
    return (
        <Flex flexDirection="column" >
            <Header />
            <Flex justifyContent="space-around">
                <Flex width="40%">
                    <HotList />
                </Flex>
                <Flex width="50%">
                    Test
                </Flex>
            </Flex>
        </Flex>
    )
}

export const Skeleton = () => (
    <Flex flexDirection="column" >
        <Header.Skeleton />
    </Flex>
)

export default Component
