import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Flex } from 'reflexbox'
import _debounce from 'lodash/debounce'

import { Container, Text, Search, Select, Skeleton as UISkeleton } from 'ui'
import { ComponentInterface, useDebounce } from 'utils'
import theme from 'theme'

import { searchArticled } from '../../actions'

export const Component: ComponentInterface<any> = () => {
    const dispatch = useDispatch()

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

    return (
        <Flex width="100%">
            <Container sx={{ width: '100%' }}>
                <Container.Header>
                    <Search isProcessing={searchProgress} onInputChange={setSearchQuery} label="Найти статью..." width="30rem" sx={{ mr: '3rem' }}>
                        {searchResult && searchResult.length && searchResult.map(item =>
                            <Search.Option key={item.articleID} sx={{ maxWidth: '35rem' }}>
                                <Text styles={theme.text.styles.label} sx={{ mb: '.5rem' }}>{ item.name }</Text>
                                <Text styles={theme.text.styles.placeholder} sx={{ textAlign: 'left' }}>{ item.title }</Text>
                            </Search.Option>  
                        )}
                    </Search>
                    <Select selected={searchField} onSelect={setSearchField} placeholder="Поиск по..." sx={{ maxWidth: '20rem' }}>
                        <Select.Option value="surname">Поиск по фамилии</Select.Option>
                        <Select.Option value="name">Поиск по названию</Select.Option>
                        <Select.Option value="annotation">Поиск по аннтоации</Select.Option>
                        <Select.Option value="keywords">Поиск по ключевым словам</Select.Option>
                    </Select>
                </Container.Header>
                <Container.Content>
                    <Text styles={theme.text.styles.placeholder}>Статья не выбрана</Text>
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
