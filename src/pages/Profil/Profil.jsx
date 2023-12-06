import { useParams } from 'react-router-dom'
import { useFetch } from '../../utils/hooks/hooks'
import { styled } from 'styled-components'
import colors from '../../utils/styles/color'
import { Loader } from '../../utils/styles/Atoms'
import { useTheme } from '../../utils/hooks/hooks'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10rem;
    background: ${({ theme }) =>
        theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
    color: ${({ theme }) => theme === 'dark' && 'white'};
    margin: 4rem 2rem 0 2rem;
    padding: 1rem;
    position: relative;
    min-height: 462px;
    border-radius: 10px;
`
const RefreshButton = styled.div`
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    color: white;
    border-radius: 30px;
    background-color: #5843e4;
    padding: 0.5rem 1.5rem;
    &:hover {
        cursor: pointer;
    }
`
const ImgContainer = styled.div`
    width: 260px;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 50%;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    & section {
        display: flex;
        gap: 0.5rem;
        & div {
            font-weight: 700;
            ${({ theme }) =>
                theme === 'light'
                    ? 'border: black solid 1px'
                    : 'border: white solid 1px'};
            border-radius: 8px;
            padding: 0.3rem 0.5rem;
            font-size: 1rem;
        }
    }
`
const InfosHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 4rem;
    & div {
        font-size: 1rem;
        font-weight: 700;
        color: ${({ theme }) => (theme === 'light' ? '#8186a0' : 'white')};
    }
    & h1 {
        font-size: 31px;
        margin: 0;
    }
`
const IconeAvailability = styled.div`
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: ${(props) => (props.available ? '#57B894' : '#c95b1c8')};
`

function Profil() {
    const { id } = useParams()
    const { data, isLoading, error } = useFetch(
        `http://localhost:8000/freelance/?id=${id}`,
    )
    const freelanceData = data.freelanceData

    const { theme } = useTheme()

    if (error)
        return (
            <Container>
                <h3>Oups, il y a eu une erreur...</h3>
                <RefreshButton onClick={() => window.location.reload()}>
                    Actualiser
                </RefreshButton>
            </Container>
        )

    return isLoading ? (
        <Container theme={theme}>
            <Loader />
        </Container>
    ) : (
        <Container theme={theme}>
            <ImgContainer>
                <Img
                    src={`${freelanceData.picture}`}
                    alt={`${freelanceData.name}`}
                />
            </ImgContainer>
            <InfosContainer theme={theme}>
                <InfosHeader>
                    <h1>{freelanceData.name}</h1>
                    <div>{freelanceData.location}, France</div>
                </InfosHeader>
                <div style={{ 'font-size': '25px', 'font-weight': '600' }}>
                    {freelanceData.job}
                </div>
                <section>
                    {freelanceData.skills.map((skill) => (
                        <div>{skill}</div>
                    ))}
                </section>
                <div>
                    {freelanceData.available ? (
                        <div
                            style={{
                                display: 'flex',
                                gap: '0.8rem',
                                alignItems: 'center',
                                fontSize: '16px',
                            }}
                        >
                            <IconeAvailability
                                available={true}
                            ></IconeAvailability>
                            <div>Disponible maintenant</div>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                gap: '0.8rem',
                                alignItems: 'center',
                            }}
                        >
                            <IconeAvailability
                                available={true}
                            ></IconeAvailability>
                            <div>Indisponible</div>
                        </div>
                    )}
                </div>
                <div
                    style={{
                        fontSize: '31px',
                        fontWeight: '700',
                        marginTop: '2rem',
                    }}
                >
                    {freelanceData.tjm} € / Jour
                </div>
            </InfosContainer>
        </Container>
    )
}

export default Profil
