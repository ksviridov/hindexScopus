import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowWidth } from '@react-hook/window-size'

import { Flex } from 'reflexbox'
import Card from '../../components/card'
import { Container, Text, Skeleton as UISkeleton } from 'ui'
import { ComponentInterface } from 'utils'
import theme from 'theme'

import { getHotPublications, getAllPublications } from '../../actions'
import { SET_ACTIVE_ARTICLE } from '../../actions/types'
import { Store } from '../../reducers'

export const Component: ComponentInterface<any> = () => {
    const dispatch = useDispatch()
    const hotList = useSelector((state: Store) => state.main.hot)
    const weight = useWindowWidth()

    const [isInitialized, setIsInitialized] = useState(false)
    const [filters] = useState([
        { label: '1 цитирование', value: 'hot', action: getHotPublications },
        { label: 'Все', value: 'all', action: getAllPublications },
    ])
    const [filter, setFilter] = useState(filters[0])

    const isMobile = React.useMemo(() => weight <= parseInt(theme.size.window.laptopL) , [weight]);

    const sortingHotList = useMemo(() =>
        (!hotList || !hotList.length) && [] || hotList.filter(item => item.citesNeeded).sort((item1, item2) => item1.citesNeeded - item2.citesNeeded)
    , [hotList])

    useEffect(() => {
        setIsInitialized(false)
        dispatch(filter.action())
            .then(() => setIsInitialized(true))
            .catch(() => alert('Ошибка загрузки горячего списка. Повторите попытку позже'))
    }, [filter])

    const selectActiveArticle = article => (
        dispatch({ type: SET_ACTIVE_ARTICLE, payload: article })
    )

    return (
        <Flex width="100%">
            <Card process={!isInitialized} title="Горячий список" pagination={hotList?.length && hotList.length > 3} filters={filters} filter={filter} onFilterChange={filter => setFilter(filter)}>
                {!hotList?.length &&
                    <Flex flex="1">
                        <Text styles={theme.text.styles.placeholder}>Список горячих авторов пуст</Text>
                    </Flex> ||
                    sortingHotList.map(item =>
                        <Flex flex="1" key={item.articleID} onClick={() => selectActiveArticle(item)}>
                            <Flex justifyContent="space-between" width="100%" mb=".5rem" flexDirection={isMobile && 'column' || 'initial'}>
                                <Text styles={theme.text.styles.label} sx={isMobile && { lineHeight: '2.5rem' }}>{ item.name }</Text>
                                <Text styles={theme.text.styles.box}>
                                    Нужно цитирований: { item.citesNeeded }
                                </Text>
                            </Flex>
                            <Text styles={theme.text.styles.placeholder}>{ item.title }</Text> 
                        </Flex>  
                    )}
            </Card>
        </Flex>
    )
}

export const Skeleton = () => (
    <Container sx={{ width: '100%' }}>
        <Container.Header>
            <UISkeleton width="5rem" />
        </Container.Header>
        <Container.Content>
            <Card.Skeleton />
        </Container.Content>
    </Container>
)

export default Component
