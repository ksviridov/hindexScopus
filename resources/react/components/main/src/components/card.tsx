import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { Flex } from 'reflexbox'
import _castArray from 'lodash/castArray'

import { ComponentInterface } from 'utils'
import { Container, Button, Text } from 'ui'
import theme from 'theme'

export interface CardInterface {
    pagination?: boolean,
    title: string,
    children?: Element | Element[] | React.ReactNode | React.ReactNode[],
    max?: number
}

export const Component: ComponentInterface<CardInterface> = props => {
    const [pageCount] = useState(props.max)
    const [currentPage, setCurrentPage] = useState(0)
    const [options, setOptions] = useState([])

    useEffect(() => {
		setOptions(_castArray(props.children))
    }, [props.children])
    
    const itemsForCurrentPage = options.slice(currentPage * pageCount, (currentPage + 1) * pageCount)

    const maxPages = useMemo(() => (!options || !options.length) ? 0 : Math.ceil(options.length / pageCount), [options, pageCount])

    return (
        <Container sx={{ width: '100%' }}>
            <Container.Header justifyContent="space-between">
                    <Text styles={theme.text.styles.header}>{ props.title }</Text>
                    {props.pagination &&
                        <Flex>
                            <Button background={theme.mixin.icons.dark.back} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 0} sx={{ mr: '1rem' }} />
                            <Button background={theme.mixin.icons.dark.next} onClick={() => setCurrentPage(currentPage + 1)} disabled={!maxPages || currentPage == maxPages - 1} />
                        </Flex>
                    || null}
                </Container.Header>
                <Container.Content>
                        {itemsForCurrentPage && React.Children.map(itemsForCurrentPage, (option, index) =>
                            <Flex key={option.props?.key ?? index} width="100%">
                                <CardItem {...option.props} />
                            </Flex>
                        )}
                </Container.Content>
        </Container>
    )
}

Component.defaultProps = {
    max: 3
}

export const CardItem = styled(Flex)`
    box-shadow: 0 0 10px #ddd;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    padding: 2rem;
    cursor: pointer;
    flex-direction: column;

    ${props => props.theme.mixin.transition}

    &:hover {
        background-color: #f9f9f9;

        .hot-item__cites-needed {
            border: 1px solid ${props => props.theme.colors.bg.common};
        }
    }
`

export default Component
