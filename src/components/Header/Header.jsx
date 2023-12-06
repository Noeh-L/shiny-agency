import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/color'
import logoLight from '../../assets/dark-logo.png'
import logoDark from '../../assets/light-logo.png'
import { useTheme } from '../../utils/hooks/hooks'

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    margin: 0 2rem;
`
const StyledLogo = styled.div`
    width: 190px;
`
const StyledImg = styled.img`
    width: 100%;
`
const StyledNav = styled.nav`
    display: flex;
    gap: 1.5rem;
    align-items: center;
`
const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    ${(props) =>
        props.$isFullLink &&
        `
    color: white; 
    border-radius: 30px; 
    background-color: ${colors.primary};
    padding: 0.5rem 1.5rem;
    `}
    ${({ theme }) =>
        theme === 'dark' &&
        `
    color: white;
    `}
`

function Header() {
    const { theme } = useTheme()

    return (
        <StyledHeader>
            <StyledLogo>
                {theme === 'dark' ? (
                    <StyledImg src={logoDark} alt="Logo Shiny Agency" />
                ) : (
                    <StyledImg src={logoLight} alt="Logo Shiny Agency" />
                )}
            </StyledLogo>
            <StyledNav>
                <StyledLink to="/" theme={theme}>
                    Accueil
                </StyledLink>
                <StyledLink to="/freelances" theme={theme}>
                    Profils
                </StyledLink>
                <StyledLink to={`/survey/1`} $isFullLink theme={theme}>
                    Faire le test
                </StyledLink>
            </StyledNav>
        </StyledHeader>
    )
}

export default Header
