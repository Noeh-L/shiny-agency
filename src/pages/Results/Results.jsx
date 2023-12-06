import { useContext } from 'react'
import { SurveyContext } from '../../utils/context/context'
import styled from 'styled-components'
import colors from '../../utils/styles/color'
import { useFetch } from '../../utils/hooks/hooks'
import { StyledLink, Loader } from '../../utils/styles/Atoms'
import { ThemeContext } from '../../utils/context/context'

const ResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60px 90px;
    padding: 30px;
    background-color: ${({ theme }) =>
        theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
    font-weight: bold;
    font-size: 28px;
    max-width: 60%;
    text-align: center;
    & > span {
        padding-left: 10px;
    }
`

const DescriptionWrapper = styled.div`
    padding: 60px;
`

const JobTitle = styled.span`
    color: ${({ theme }) => (theme === 'light' ? colors.primary : '#8e7fff')};
    text-transform: capitalize;
    font-weight: bold;
`

const JobDescription = styled.div`
    font-size: 18px;
    & > p {
        color: ${({ theme }) =>
            theme === 'light' ? colors.secondary : '#ffffff'};
        margin-block-start: 5px;
    }
    & > span {
        font-size: 20px;
    }
`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

export function formatFetchParams(answers) {
    const answerNumbers = Object.keys(answers)

    return answerNumbers.reduce((previousParams, answerNumber, index) => {
        const isFirstParam = index === 0
        const separator = isFirstParam ? '' : '&'
        return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
    }, '')
}

// Mets une virgule entre les titres des jobs
export function formatJobList(title, listLength, index) {
    if (index === listLength - 1) {
        return title
    }
    return `${title},`
}

function Results() {
    const { theme } = useContext(ThemeContext)
    const { answers } = useContext(SurveyContext)
    const fetchParams = formatFetchParams(answers)

    const { data, isLoading, error } = useFetch(
        `http://localhost:8000/results?${fetchParams}`,
    )

    if (error) {
        return <span>Il y a un problème</span>
    }

    const resultsData = data?.resultsData

    return isLoading ? (
        <LoaderWrapper>
            <Loader />
        </LoaderWrapper>
    ) : (
        <ResultsContainer theme={theme}>
            <ResultsTitle theme={theme}>
                Les compétences dont vous avez besoin :<br />
                {resultsData.length === 0 ? (
                    <h6>Vous n'avez besoin d'aucune compétence...</h6>
                ) : (
                    resultsData.map((result, index) => (
                        <JobTitle
                            key={`result-title-${index}-${result.title}`}
                            theme={theme}
                        >
                            {formatJobList(
                                result.title,
                                resultsData.length,
                                index,
                            )}
                        </JobTitle>
                    ))
                )}
            </ResultsTitle>
            <StyledLink $isFullLink to="/freelances">
                Découvrez nos profils
            </StyledLink>
            <DescriptionWrapper>
                {resultsData &&
                    resultsData.map((result, index) => (
                        <JobDescription
                            theme={theme}
                            key={`result-detail-${index}-${result.title}`}
                        >
                            <JobTitle theme={theme}>{result.title}</JobTitle>
                            <p>{result.description}</p>
                        </JobDescription>
                    ))}
            </DescriptionWrapper>
        </ResultsContainer>
    )
}

export default Results