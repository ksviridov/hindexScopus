import React, { useState, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'

import { Flex } from 'reflexbox'
import { Popup, Button, Text } from 'ui'

import { ComponentInterface } from 'utils'
import { Article } from '../reducers/types'

interface BibliograptyInterface {
    article: Article,
    onExit?: () => void
}

const getText = (article: Article) =>
    `text`

const getBibTex = (article: Article) => {
    const articleName = `${article.name.match(/\S+/)[0]}${article.title.match(/\S+/)[0]}`.toLowerCase()
    const BibtexField = (field, value) => value ? ` ${field} = ${+value ? `{${value}}` : `"${value}"`},\n` : ''

    return `@article{${articleName}\n` +
        BibtexField('author', article.name) +
        BibtexField('title', article.title) +
        '}'
}

export const Component: ComponentInterface<BibliograptyInterface> = props => {
    const [formats] = useState([
        { field: 'text', label: 'Текст', method: getText },
        { field: 'bibtex', label: 'BibTex', method: getBibTex },
    ])
    const [actionFormat, setActionFormat] = useState(formats[0])

    const text = useMemo(() => actionFormat.method(props.article), [actionFormat])

    useEffect(() => {
        navigator.clipboard.writeText(text)
            .then(() => toast.info('Текст скопирован в буффер обмена!'))
            .catch(error => {
                console.error(error)
                toast.error('Ошибка сохранения в буффер обмена')
            })
    }, [text])

    const close = () => props.onExit && props.onExit()

    return (
        <Popup sx={{ width: '720px' }}>
            <Popup.Header sx={{ justifyContent: 'space-between' }}>
                <Popup.Label>Текст для вставки в литературу</Popup.Label>
                <Button onClick={close}>Закрыть</Button>
            </Popup.Header>
            <Popup.Content>
                <Flex mb="2rem">
                    {formats.map((format, index) =>
                        <Button key={index} sx={{ mr: '1rem' }} disabled={actionFormat == format} onClick={() => setActionFormat(format)}>{ format.label }</Button>
                    )}
                </Flex>
                <Text as="p">
                    {actionFormat.field == 'bibtex' &&
                        <pre>
                            { text }
                        </pre>
                    || text}
                </Text>
            </Popup.Content>
        </Popup>
    )
}

export default Component
