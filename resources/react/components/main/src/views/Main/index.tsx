import React, { lazy, Suspense } from 'react'

import { Flex } from 'reflexbox'

import { debouncedImport } from 'utils'

const HotList = lazy(() => debouncedImport(() => import('./hot')))
const Content = lazy(() => debouncedImport(() => import('./content')))

import { Skeleton as HotListSkeleton } from './hot'
import { Skeleton as ContentSkeleton } from './content'

export const Component = () => {
    return (
        <Flex justifyContent="space-around">
            <Flex width="40%">
                <Suspense fallback={<HotListSkeleton />}>
                    <HotList />
                </Suspense>
            </Flex>
            <Flex width="50%">
                <Suspense fallback={<ContentSkeleton />}>
                    <Content />
                </Suspense>
            </Flex>
        </Flex>
    )
}

export default Component
