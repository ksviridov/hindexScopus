import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { getHotPublications } from '../../actions'

import { Flex } from 'reflexbox'
import { Container, Text, Skeleton as UISkeleton } from 'ui'
import { ComponentInterface } from 'utils'
import theme from 'theme'

import { item as itemStyles, itemCount as itemCountStyle } from './styles/hot'

export const Component: ComponentInterface<any> = () => {
    const dispatch = useDispatch()
    const hotList = useSelector(state => state.hot)

    const [isInitialized, setIsInitialized] = useState(false)

    const sortingHotList = useMemo(() =>
        (!hotList || !hotList.length) && [] || hotList.sort((item1, item2) => item1.citesNeeded - item2.citesNeeded)
    , [hotList])

    useEffect(() => {
        dispatch(getHotPublications())
            .then(() => setIsInitialized(true))
            .catch(console.error)
    })

    return (
        <Flex width="100%">
            {!isInitialized &&  <Skeleton /> || 
            <Container sx={{ width: '100%' }}>
                <Container.Header>
                    <Text styles={theme.text.styles.header}>Горячий список</Text>
                </Container.Header>
                <Container.Content>
                    {!sortingHotList.length &&
                        <Text styles={theme.text.styles.placeholder}>Список горячих авторов пуст</Text> ||
                        hotList.map(item =>
                            <Item key={item.articleID}>
                                <Flex justifyContent="space-between" width="100%" mb=".5rem">
                                    <Text styles={theme.text.styles.label}>{ item.name }</Text>
                                    <ItemCount className="hot-item__cites-needed">
                                        { item.citesNeeded }
                                    </ItemCount>
                                </Flex>
                                <Text styles={theme.text.styles.placeholder} >{ item.title }</Text>
                            </Item>    
                        )
                    }
                </Container.Content>
            </Container>}
        </Flex>
    )
}

export const Skeleton = () => (
    <Container sx={{ width: '100%' }}>
        <Container.Header>
            <UISkeleton width="5rem" />
        </Container.Header>
        <Container.Content>
            <UISkeleton width="90%" height="3rem" mb="1.5rem" />
            <UISkeleton width="90%" height="3rem" mb="1.5rem" />
            <UISkeleton width="90%" height="3rem" />
        </Container.Content>
    </Container>
)

export const Item = styled(Flex)`${() => itemStyles}`
export const ItemCount = styled(Text)`${() => itemCountStyle}`

Component.Skeleton = Skeleton

export default Component
