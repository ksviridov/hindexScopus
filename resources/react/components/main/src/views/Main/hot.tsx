import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { Flex } from 'reflexbox'
import { Container, Text, Button, Skeleton as UISkeleton } from 'ui'
import { ComponentInterface } from 'utils'
import theme from 'theme'

import { getHotPublications } from '../../actions'
import { SET_ACTIVE_ARTICLE } from '../../actions/types'

import { item as itemStyles, itemCount as itemCountStyle } from './styles/hot'

export const Component: ComponentInterface<any> = () => {
    const dispatch = useDispatch()
    const hotList = useSelector(state => state.hot)

    const [isInitialized, setIsInitialized] = useState(false)
    const [pageCount] = useState(3)
    const [currentPage, setCurrentPage] = useState(0)

    const sortingHotList = useMemo(() =>
        (!hotList || !hotList.length) && [] || hotList.sort((item1, item2) => item1.citesNeeded - item2.citesNeeded)
    , [hotList])

    const HotListForCurrentPage=  useMemo(() =>
        sortingHotList.slice(currentPage * pageCount, (currentPage + 1) * pageCount)
    , [sortingHotList, currentPage])

    const maxPages = useMemo(() => (!hotList || !hotList.length) ? 0 : Math.ceil(hotList.length / pageCount), [hotList, pageCount])

    useEffect(() => {
        dispatch(getHotPublications())
            .then(() => setIsInitialized(true))
            .catch(console.error)
    })

    const selectActiveArticle = article => dispatch({ type: SET_ACTIVE_ARTICLE, payload: article })

    return (
        <Flex width="100%">
            {!isInitialized &&  <Skeleton /> || 
            <Container sx={{ width: '100%' }}>
                <Container.Header justifyContent="space-between">
                    <Text styles={theme.text.styles.header}>Горячий список</Text>
                    <Flex>
                        <Button background={theme.mixin.icons.dark.back} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 0} sx={{ mr: '1rem' }} />
                        <Button background={theme.mixin.icons.dark.next} onClick={() => setCurrentPage(currentPage + 1)} disabled={!maxPages || currentPage == maxPages - 1} />
                    </Flex>
                </Container.Header>
                <Container.Content>
                    {!hotList?.length &&
                        <Text styles={theme.text.styles.placeholder}>Список горячих авторов пуст</Text> ||
                        HotListForCurrentPage.map(item =>
                            <Item key={item.articleID} onClick={() => selectActiveArticle(item)}>
                                <Flex justifyContent="space-between" width="100%" mb=".5rem">
                                    <Text styles={theme.text.styles.label}>{ item.name }</Text>
                                    <ItemCount className="hot-item__cites-needed">
                                        { item.citesNeeded }
                                    </ItemCount>
                                </Flex>
                                <Text styles={theme.text.styles.placeholder}>{ item.title }</Text>
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

export default Component
