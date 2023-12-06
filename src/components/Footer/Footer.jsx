import styled from 'styled-components'
import colors from '../../utils/styles/color'
import { useTheme } from '../../utils/hooks/hooks'

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
`

const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.secondary};
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 1px 1px 2px #e2e3e9;
    border-radius: 7px;
    padding: 5px 15px;
    transition: all ease 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
    ${(props) =>
        props.theme === 'dark' &&
        `background-color: ${colors.backgroundDark};
        color: white;
        box-shadow: 1px 1px 2px #272635;
        &:hover {
            cursor: pointer;
            box-shadow: 2px 2px 10px #272635;
        `}
`

function Footer() {
    const { theme, setTheme } = useTheme()
    return (
        <FooterContainer>
            <NightModeButton onClick={setTheme} theme={theme}>
                Changer de mode : {theme === 'light' ? '🌙' : '🌞'}
            </NightModeButton>
        </FooterContainer>
    )
}

export default Footer
