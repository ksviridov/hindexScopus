import React, { lazy, Suspense } from 'react'
import { useWindowWidth } from '@react-hook/window-size'

import { Flex } from 'reflexbox'

import { debouncedImport, ComponentInterface } from 'utils'
import theme from 'theme'

const HotList = lazy(() => debouncedImport(() => import('./hot')))
const Content = lazy(() => debouncedImport(() => import('./content')))

import { Skeleton as HotListSkeleton } from './hot'
import { Skeleton as ContentSkeleton } from './content'

export const Component: ComponentInterface<any> = () => {
    const weight = useWindowWidth()

    const isMobile = React.useMemo(() => weight <= parseInt(theme.size.window.laptop) , [weight]);

    return (
        <Flex justifyContent="space-around" flexDirection={isMobile && 'column' || 'initial'}>
            <Flex width={!isMobile && '40%' || '100%'} mb={isMobile && '3rem'}>
                <Suspense fallback={<HotListSkeleton />}>
                    <HotList />
                </Suspense>
            </Flex>
            <Flex width={!isMobile && '50%' || '100%'}>
                <Suspense fallback={<ContentSkeleton />}>
                    <Content />
                </Suspense>
            </Flex>
        </Flex>
    )
}

export default Component
