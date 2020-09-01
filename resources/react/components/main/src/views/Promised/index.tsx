import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Flex } from 'reflexbox'

import { ComponentInterface } from 'utils'
import Card from '../../components/card'
import { Text, Skeleton as UISkeleton } from 'ui'
import theme from 'theme'

import { getPromises } from '../../actions'
import { GET_PROMISED_BY, GET_PROMISED_FOR } from '../../actions/types'
import { Store } from '../../reducers'

export const Component: ComponentInterface<any> = () => {
    const dispatch = useDispatch()

    const promisedBy = useSelector((state: Store) => state.promised.by)
    const promisedFor = useSelector((state: Store) => state.promised.for)

    const [loadingPromisedBy, setLoadingPromisedBy] = useState(false)
    const [loadingPromisedFor, setLoadingPromisedFor] = useState(false)

    useEffect(() => {
        dispatch(getPromises({ field: 'by' }, GET_PROMISED_BY))
            .then(() => setLoadingPromisedBy(true))
            .catch(() => alert('Ошибка загрузки процитированных Вами статей'))

        dispatch(getPromises({ field: 'for' }, GET_PROMISED_FOR))
            .then(() => setLoadingPromisedFor(true))
            .catch(() => alert('Ошибка загрузки процитированных для вас статей'))
    }, [])

    return (
        <Flex justifyContent="space-around">
            <Flex width="45%">
                {!loadingPromisedBy && <Skeleton lines={2} /> ||
                    <Card title="Я" pagination={promisedBy?.length && promisedBy.length > 3}>
                        {!promisedBy?.length &&
                            <Flex>
                                <Text styles={theme.text.styles.placeholder} >Вы еще не обещали процитировать ни одной статьи</Text>
                            </Flex> ||
                            promisedBy.map(item =>
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
                {!loadingPromisedFor && <Skeleton lines={2} /> ||
                    <Card title="Мне" pagination={promisedFor?.length && promisedFor.length > 3}>
                        {!promisedFor?.length &&
                            <Flex>
                                <Text styles={theme.text.styles.placeholder} >Вам еще не обещали процитировать ни одной статьи</Text>
                            </Flex> ||
                            promisedFor.map(item =>
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