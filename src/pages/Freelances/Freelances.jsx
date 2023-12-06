import './Freelances.css'
import Card from '../../components/Card/Card'
import styled from 'styled-components'
import { Loader } from '../../utils/styles/Atoms'
import { useFetch, useTheme } from '../../utils/hooks/hooks'

const CardsContainer = styled.div`
    width: 70%;
    margin: auto;
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(2, 1fr);
`
const StyledLoader = styled(Loader)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const ErrorMessage = styled.div`
    margin: auto;
    font-size: 1.2rem;
`
const StyledH1 = styled.h1`
    color: ${({ theme }) => theme === 'dark' && 'white'};
`
const StyledParagraph = styled.p`
    color: ${({ theme }) => theme === 'dark' && 'white'};
`

function Freelances() {
    const { data, isLoading, error } = useFetch(
        `http://localhost:8000/freelances`,
    )
    const { freelancersList } = data

    const { theme } = useTheme()

    if (error)
        return <ErrorMessage>Oups, il y a eu un problème...</ErrorMessage>

    return (
        <div>
            <div className="sous-header">
                <StyledH1 className="title" theme={theme}>
                    Trouvez votre prestataire
                </StyledH1>
                <StyledParagraph theme={theme}>
                    Chez Shiny nous réunissons les meilleurs profils pour vous.
                </StyledParagraph>
            </div>
            <CardsContainer>
                {isLoading ? (
                    <StyledLoader />
                ) : (
                    freelancersList.map((freelancer, index) => (
                        <Card
                            key={`${freelancer.name}-${index}`}
                            label={freelancer.job}
                            picture={freelancer.picture}
                            title={freelancer.name}
                            profilId={`../profile/${freelancer.id}`}
                        />
                    ))
                )}
            </CardsContainer>
        </div>
    )
}

export default Freelances
