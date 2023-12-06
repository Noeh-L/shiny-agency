import { Link } from 'react-router-dom'
import illustration from '../../assets/home-illustration.svg'
import styled from 'styled-components'
import colors from '../../utils/styles/color'
import { useTheme } from '../../utils/hooks/hooks'

const StyledContainer = styled.div`
    background-color: ${colors.backgroundLight};
    padding: 1rem 5rem;
    margin: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    align-self: stretch;
    transition: background 200ms;
    border-radius: 10px;

    ${({ theme }) => theme === 'dark' && `background: ${colors.backgroundDark}`}
`
const StyledDiv = styled.div`
    flex: 0.8;
`
const StyledH1 = styled.h1`
    font-size: 50px;
    margin-bottom: 3.5rem;
    transition: color 500ms;

    ${({ theme }) => theme === 'dark' && `color: white`}
`
const StyledLink = styled(Link)`
    padding: 15px;
    text-decoration: none;
    font-size: 18px;
    color: white;
    border-radius: 30px;
    background-color: ${colors.primary};
    padding: 0.5rem 1.5rem;
`

function Home() {
    const { theme } = useTheme()

    return (
        <StyledContainer theme={theme}>
            <StyledDiv>
                <StyledH1 theme={theme}>
                    Reperez vos besoins, on s'occupe du reste, avec les
                    meilleurs talents
                </StyledH1>
                <StyledLink to={'/survey'}>Faire le test</StyledLink>
            </StyledDiv>
            <div>
                <img src={illustration} alt="Illustration de fiches" />
            </div>
        </StyledContainer>
    )
}

export default Home
