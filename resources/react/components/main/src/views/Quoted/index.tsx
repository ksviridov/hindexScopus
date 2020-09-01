import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Flex } from 'reflexbox'

import { ComponentInterface } from 'utils'
import Card from '../../components/card'
import { Text, Skeleton as UISkeleton } from 'ui'
import theme from 'theme'

import { getQuotes } from '../../actions'
import { GET_QUOTES_BY, GET_QUOTES_FOR } from '../../actions/types'
import { Store } from '../../reducers'

export const Component: ComponentInterface<any> = () => {
    const dispatch = useDispatch()

    const quotesBy = useSelector((state: Store) => state.quote.by)
    const quotesFor = useSelector((state: Store) => state.quote.for)

    const [loadingQuotesBy, setLoadingQuotesBy] = useState(false)
    const [loadingQuotesFor, setLoadingQuotesFor] = useState(false)

    useEffect(() => {
        dispatch(getQuotes({ field: 'by' }, GET_QUOTES_BY))
            .then(() => setLoadingQuotesBy(true))
            .catch(() => alert('Ошибка загрузки процитированных Вами статей'))

        dispatch(getQuotes({ field: 'for' }, GET_QUOTES_FOR))
            .then(() => setLoadingQuotesFor(true))
            .catch(() => alert('Ошибка загрузки процитированных для вас статей'))
    }, [])

    return (
        <Flex justifyContent="space-around">
            <Flex width="45%">
                {!loadingQuotesBy && <Skeleton lines={2} /> ||
                    <Card title="Я" pagination={quotesBy?.length && quotesBy.length > 3}>
                        {!quotesBy?.length &&
                            <Flex>
                                <Text styles={theme.text.styles.placeholder} >Вы еще не процитировали ни одной статьи</Text>
                            </Flex> ||
                            quotesBy.map(item =>
                                <Flex key={item.articleID} flexDirection="column">
                                    <Text styles={theme.text.styles.placeholder} sx={{ mb: '1rem' }}>ID: { item.articleID }</Text>
                                    <Text styles={theme.text.styles.label} sx={{ mb: '.5rem' }}>{ item.name }</Text>
                                    <Text styles={theme.text.styles.placeholder}>{ item.title }</Text>
                                </Flex>
                            )
                        }
                    </Card>
                }
            </Flex>
            <Flex width="45%">
                {!loadingQuotesFor && <Skeleton lines={2} /> ||
                    <Card title="Мне" pagination={quotesFor?.length && quotesFor.length > 3}>
                        {!quotesFor?.length &&
                            <Flex>
                                <Text styles={theme.text.styles.placeholder} >Вам еще не процитировали ни одной статьи</Text>
                            </Flex> ||
                            quotesFor.map(item =>
                                <Flex key={item.articleID} flexDirection="column">
                                    <Text styles={theme.text.styles.placeholder} sx={{ mb: '1rem' }}>ID: { item.articleID }</Text>
                                    <Text styles={theme.text.styles.label} sx={{ mb: '.5rem' }}>{ item.name }</Text>
                                    <Text styles={theme.text.styles.placeholder}>{ item.title }</Text>
                                </Flex>
                            )
                        }
                    </Card>
                }
            </Flex>
        </Flex>
    )
}

export const Skeleton: ComponentInterface<{ lines?: number }> = ({ lines = 1 }) => (
    <Flex flexDirection="column" width="80%">
        <UISkeleton mb="2rem" height="2rem" width="8rem" />
        {Array.from({ length: lines }).map((_, index) =>
            <UISkeleton key={index} mb="2rem" height="7rem" />
        )}
    </Flex>
)

export default Component