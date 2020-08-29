import { css } from 'styled-components'

export const item = css`
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

export const itemCount = css`
    display: flex;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    justify-content: center;
    align-items: center;

    ${props => props.theme.mixin.transition}
`

export default {
    item,
    itemCount
}