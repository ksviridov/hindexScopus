import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { Flex } from 'reflexbox'
import Card from '../../components/card'
import { Container, Text, Button, Skeleton as UISkeleton } from 'ui'
import { ComponentInterface } from 'utils'
import theme from 'theme'

import { getHotPublications } from '../../actions'
import { SET_ACTIVE_ARTICLE } from '../../actions/types'
import { Store } from '../../reducers'

export const Component: ComponentInterface<any> = () => {
    const dispatch = useDispatch()
    const hotList = useSelector((state: Store) => state.main.hot)

    const [isInitialized, setIsInitialized] = useState(false)

    const sortingHotList = useMemo(() =>
        (!hotList || !hotList.length) && [] || hotList.sort((item1, item2) => item1.citesNeeded - item2.citesNeeded)
    , [hotList])

    useEffect(() => {
        dispatch(getHotPublications())
            .then(() => setIsInitialized(true))
            .catch(() => alert('Ошибка загрузки горячего списка. Повторите попытку позже'))
    }, [])

    const selectActiveArticle = article => dispatch({ type: SET_ACTIVE_ARTICLE, payload: article })

    return (
        <Flex width="100%">
            {!isInitialized &&  <Skeleton /> ||
            <Card title="Горячий список" pagination={hotList?.length && hotList.length > 3}>
                {!hotList?.length &&
                    <Flex flex="1">
                        <Text styles={theme.text.styles.placeholder}>Список горячих авторов пуст</Text>
                    </Flex> ||
                    sortingHotList.map(item =>
                        <Flex flex="1" key={item.articleID} onClick={() => selectActiveArticle(item)}>
                            <Flex justifyContent="space-between" width="100%" mb=".5rem">
                                <Text styles={theme.text.styles.label}>{ item.name }</Text>
                                <ItemCount className="hot-item__cites-needed">
                                    { item.citesNeeded }
                                </ItemCount>
                            </Flex>
                            <Text styles={theme.text.styles.placeholder}>{ item.title }</Text> 
                        </Flex>  
                    )}
            </Card>}
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

export const ItemCount = styled(Text)`
    display: flex;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 3rem;
    justify-content: center;
    align-items: center;

    ${props => props.theme.mixin.transition}
`

export default Component
