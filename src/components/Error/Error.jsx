import './Error.css'
import illustration from '../../assets/404.svg'
import { useTheme } from '../../utils/hooks/hooks'
import styled from 'styled-components'
import colors from '../../utils/styles/color'

const StyledContainer = styled.div`
    ${({ theme }) =>
        theme === 'dark' &&
        `
          background-color: ${colors.backgroundDark};
          & p {
            color: white;
          }
`}
`

function Error() {
    const { theme } = useTheme()

    return (
        <StyledContainer className="error_container" theme={theme}>
            <p>Oups...</p>
            <div className="error_img">
                <img src={illustration} alt="Erreur 404" />
            </div>
            <p>Il semblerait qu'il y ait un problème</p>
        </StyledContainer>
    )
}

export default Error
