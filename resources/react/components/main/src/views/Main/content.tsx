import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Flex,Box } from 'reflexbox'
import _debounce from 'lodash/debounce'
import { toast } from 'react-toastify'

import { Container, Text, Search, Select, Button, Skeleton as UISkeleton } from 'ui'
import { ComponentInterface, useDebounce } from 'utils'
import theme from 'theme'

import { quoteArticle } from '../../actions'
import { SET_ACTIVE_ARTICLE } from '../../actions/types'
import { Store } from '../../reducers'

export const Component: ComponentInterface<any> = () => {
    const dispatch = useDispatch()
    const hot = useSelector((state: Store) => state.main.hot)
    const article = useSelector((state: Store) => state.main.active)
    const quotes = useSelector((state: Store) => state.quote.by)
    const promises = useSelector((state: Store) => state.promised.by)

    const [searchQuery, setSearchQuery] = useState('')
    const [searchField, setSearchField] = useState('name')
    const [searchResult, setSearchResult] = useState()
    const [progressQuoteArticle, setProgressQuoteArticle] = useState(false)

    const debounceSearching = useDebounce(searchQuery, 300)

    useEffect(() => {
        setSearchResult(null)

        debounceSearching &&
        debounceSearching.length > 2 && (
            setSearchResult(search(searchField, debounceSearching))
        )
    }, [debounceSearching, searchField])

    useEffect(() => {
        !searchQuery && setSearchResult(null)
    }, [searchQuery])

    const search = (field: string, value: string) =>
        hot?.length ? hot.filter(article => article[field].toLowerCase().includes(value.toLowerCase()))  : []

    const activeArticle = article => (
        setSearchResult(null),
        dispatch({ type: SET_ACTIVE_ARTICLE, payload: article })
    )

    const clearSelectArticle = () => dispatch({ type: SET_ACTIVE_ARTICLE, payload: undefined })

    const activeArticleIsQuote = useMemo(() =>
        article && (
            quotes?.length && quotes.some(item => item == article.articleID) ||
            promises?.length && promises.some(item => item == article.articleID)
        )
    , [article, quotes, promises])

    const quote = articleId => (
        setProgressQuoteArticle(true),
        dispatch(quoteArticle({ articleID: articleId }))
            .then(() => toast.success('Статья помечена как "Обещано к цитированию"'))
            .catch(() => toast.error('Ошибка запроса. Повторите попытку позже'))
            .finally(() => setProgressQuoteArticle(false))
    )

    return (
        <Flex width="100%">
            <Container sx={{ width: '100%' }}>
                <Container.Header sx={{ justifyContent: 'space-between' }}>
                    <Box width="70%">
                        <Search onInputChange={setSearchQuery} label="Найти статью..." sx={{ mr: '3rem' }}>
                            {searchResult && searchResult.length && searchResult.map(item =>
                                <Search.Option key={item.articleID} sx={{ maxWidth: '35rem' }} onClick={() => activeArticle(item)}>
                                    <Text styles={theme.text.styles.label} sx={{ mb: '.5rem' }}>{ item.name }</Text>
                                    <Text styles={theme.text.styles.placeholder} sx={{ textAlign: 'left' }}>{ item.title }</Text>
                                </Search.Option>  
                            ) || null}
                        </Search>
                    </Box>
                    <Box width="25%">
                        <Select selected={searchField} onSelect={setSearchField} placeholder="Поиск по..." sx={{ maxWidth: '100%' }}>
                            <Select.Option value="name">Поиск по фамилии</Select.Option>
                            <Select.Option value="title">Поиск по заголовку</Select.Option>
                            <Select.Option value="publicationName">Поиск по названию</Select.Option>
                            <Select.Option value="keyWords">Поиск по ключевым словам</Select.Option>
                            <Select.Option value="description">Поиск по описанию</Select.Option>
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
                                    {!activeArticleIsQuote &&
                                        <Button isProcessing={progressQuoteArticle} disabled={progressQuoteArticle} onClick={() => quote(article.articleID)}>Цитировать</Button> ||
                                        <Button styles={theme.button.styles.accent}>Процитировано</Button>
                                    }
                                </Flex>
                            </Flex>
                            <Box>
                                <Text styles={theme.text.styles.placeholder} sx={{ mb: '1rem' }}>ID: { article.articleID }</Text>
                            </Box>
                            {article.name ? <Text sx={{ mb: '.5rem' }}>{ article.name }</Text> : null}
                            {article.title ? <Text sx={{ mb: '.5rem' }}>{ article.title }</Text> : null}
                            {article.keyWords ? <Text sx={{ mb: '.5rem' }} styles={theme.text.styles.label}>{ article.keyWords }</Text> : null}
                            {article.publicationName ? <Text sx={{ mb: '.5rem' }}>{ article.publicationName }</Text> : null}
                            {article.description ? <Text sx={{ mb: '2rem' }}>{ article.description }</Text> : null}
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
