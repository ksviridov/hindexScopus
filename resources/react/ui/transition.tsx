import React from 'react'
import { CSSTransition } from 'react-transition-group'

import { Theme } from 'theme/types'
import { Props, UIElement } from './types'

interface TransitionProps extends Props<any, Theme> {
    in: boolean,
    classNames?: string,
    delayed?: number,
}

export const Transition: UIElement<TransitionProps> = props => <CSSTransition timeout={props.delayed ? 200 : 0} unmountOnExit {...props} />

export default Transition
