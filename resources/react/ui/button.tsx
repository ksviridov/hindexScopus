import React from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

import { button as buttonStyles } from 'theme'
import { Button as ButtonType, Theme } from 'theme/types'
import { Props, Context, UIElement } from './types'

interface ButtonProps extends Props<ButtonType, HTMLDivElement> {
    onClick?: (e?: React.MouseEvent) => void,
    disabled?: boolean,
    background?: string
}

interface Btn extends Props<ButtonType, HTMLButtonElement> {
    onClick?: (e?: React.MouseEvent) => void,
    disabled?: boolean,
    background?: string
}

const context: Context<ButtonType> = { styles: undefined }

export const Component: UIElement<ButtonProps> = props => {
    context.styles = props.styles || buttonStyles.styles.default

    return (
        <Container sx={props.sx}>
            <Button {...props} />
        </Container>
    )
}

export const Button = styled((props: Btn) => <button {...props} />)`${() => context.styles.button}`
export const Container = styled(Flex)`${() => context.styles.container}`

export default Component
