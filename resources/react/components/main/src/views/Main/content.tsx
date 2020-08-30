import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Flex,Box } from 'reflexbox'
import _debounce from 'lodash/debounce'

import { Container, Text, Search, Select, Button, Skeleton as UISkeleton } from 'ui'
import { ComponentInterface, useDebounce } from 'utils'
import theme from 'theme'

import { searchArticled } from '../../actions'
import { SET_ACTIVE_ARTICLE } from '../../actions/types'

export const Component: ComponentInterface<any> = () => {
    const dispatch = useDispatch()
    const article = useSelector(state => state.active)

    const [searchQuery, setSearchQuery] = useState('')
    const [searchField, setSearchField] = useState('name')
    const [searchResult, setSearchResult] = useState()
    const [searchProgress, setSearchProgress] = useState(false)

    const debounceSearching = useDebounce(searchQuery, 300)

    useEffect(() => {
        setSearchResult(null)

        debounceSearching &&
        debounceSearching.length > 2 && (
            setSearchProgress(true),
            dispatch(searchArticled({ field: searchField, value: debounceSearching }))
                .then(({ data }) => setSearchResult(data))
                .catch(console.error)
                .finally(() => setSearchProgress(false))
        )
    }, [debounceSearching, searchField])

    const activeArticle = article => (
        setSearchResult(null),
        dispatch({ type: SET_ACTIVE_ARTICLE, payload: article })
    )

    const clearSelectArticle = () => dispatch({ type: SET_ACTIVE_ARTICLE, payload: undefined })

    return (
        <Flex width="100%">
            <Container sx={{ width: '100%' }}>
                <Container.Header sx={{ justifyContent: 'space-between' }}>
                    <Box width="70%">
                        <Search isProcessing={searchProgress} onInputChange={setSearchQuery} label="Найти статью..." sx={{ mr: '3rem' }}>
                            {searchResult && searchResult.length && searchResult.map(item =>
                                <Search.Option key={item.articleID} sx={{ maxWidth: '35rem' }} onClick={() => activeArticle(item)}>
                                    <Text styles={theme.text.styles.label} sx={{ mb: '.5rem' }}>{ item.name }</Text>
                                    <Text styles={theme.text.styles.placeholder} sx={{ textAlign: 'left' }}>{ item.title }</Text>
                                </Search.Option>  
                            )}
                        </Search>
                    </Box>
                    <Box width="25%">
                        <Select selected={searchField} onSelect={setSearchField} placeholder="Поиск по..." sx={{ maxWidth: '100%' }}>
                            <Select.Option value="surname">Поиск по фамилии</Select.Option>
                            <Select.Option value="name">Поиск по названию</Select.Option>
                            <Select.Option value="annotation">Поиск по аннтоации</Select.Option>
                            <Select.Option value="keywords">Поиск по ключевым словам</Select.Option>
                        </Select>
                    </Box>
                </Container.Header>
                <Container.Content>
                    {!article &&
                        <Text styles={theme.text.styles.placeholder}>Статья не выбрана</Text> ||
                        <Flex flexDirection="column">
                            <Flex justifyContent="space-between" alignItems="flex-start">
                                <Button styles={theme.button.styles.unaccent} onClick={clearSelectArticle}>Назад</Button>
                                <Flex flexDirection="column" sx={{ placeItems: 'flex-end' }}>
                                    <Text styles={theme.text.styles.placeholder} sx={{ mb: '1rem' }}>Необходимо цитирований: { article.citesNeeded }</Text>
                                    <Button>Цитировать</Button>
                                </Flex>
                            </Flex>
                            <Box mb=".5rem">
                                <Text styles={theme.text.styles.placeholder} sx={{ mb: '1rem' }}>ID: { article.articleID }</Text>
                            </Box>
                            <Box mb="2rem">
                                <Text styles={theme.text.styles.header} sx={{ mb: '1rem' }}>Автор:</Text>
                                <Text>{ article.name }</Text>
                            </Box>
                            <Box mb="2rem">
                                <Text styles={theme.text.styles.header} sx={{ mb: '1rem' }}>Описание:</Text>
                                <Text>{ article.title }</Text>
                            </Box>
                            <Box mb="2rem">
                                <Text styles={theme.text.styles.header} sx={{ mb: '1rem' }}>Публикация:</Text>
                                <Text>{ article.publicationName }</Text>
                            </Box>
                        </Flex>
                    }
                </Container.Content>
            </Container>
        </Flex>
    )
}

export const Skeleton = () => (
    <Flex width="100%">
        <Container sx={{ width: '100%' }}>
            <Container.Header>
                <UISkeleton width="60%" mr="2rem" />
                <UISkeleton width="15%" />
            </Container.Header>
            <Container.Content>
                <UISkeleton width="80%" mb="2rem" />
                <UISkeleton width="50%" mb="2rem" />
                <UISkeleton width="65%" mb="2rem" />
            </Container.Content>
        </Container>
    </Flex>
)

export default Component
