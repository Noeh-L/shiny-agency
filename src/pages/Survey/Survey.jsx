import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/color'
import { Loader } from '../../utils/styles/Atoms'
import { SurveyContext } from '../../utils/context/context'
import { useFetch } from '../../utils/hooks/hooks'
import { useTheme } from '../../utils/hooks/hooks'

const SurveyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const QuestionTitle = styled.h2`
    text-decoration: underline;
    text-decoration-color: ${colors.primary};
    color: ${({ theme }) => theme === 'dark' && 'white'};
`
const QuestionContent = styled.span`
    margin: 30px;
    color: ${({ theme }) => theme === 'dark' && 'white'};
`
const LinkWrapper = styled.div`
    padding-top: 30px;
    & a {
        color: ${({ theme }) => (theme === 'dark' ? 'white' : 'black')};
    }
    & a:first-of-type {
        margin-right: 20px;
    }

    color: ${({ theme }) => theme === 'dark' && 'white'};
`
const ErrorMessage = styled.div`
    margin: auto;
    font-size: 1.2rem;
`
const ReplyBox = styled.button`
    border: none;
    height: 100px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme === 'dark' && 'white'};
    background-color: ${({ theme }) =>
        theme === 'dark' ? colors.backgroundDark : colors.backgroundLight};
    border-radius: 30px;
    cursor: pointer;
    box-shadow: ${(props) =>
        props.$isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
    &:first-child {
        margin-right: 15px;
    }
    &:last-of-type {
        margin-left: 15px;
    }
`
const ReplyWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

function Survey() {
    const { questionNumber } = useParams()
    const questionNumberInt = parseInt(questionNumber)
    const prevQuestionNumber =
        questionNumberInt === 1 ? 1 : questionNumberInt - 1
    const nextQuestionNumber = questionNumberInt + 1

    const { data, isLoading, error } = useFetch('/survey')
    const { surveyData } = data // => équivaut à const surveyData = data.surveyData

    const { answers, saveAnswers } = useContext(SurveyContext)
    const { theme } = useTheme()

    //=======CALL API avant d'avoir fait hook personalisé "useFetch"===========

    // Cette syntaxe permet aussi bien de faire des calls API.
    // Mais pour utiliser await dans une fonction, il faut que celle-ci soit async (pour asynchrone).
    // Comme la fonction passée à useEffect ne peut pas être asynchrone,
    // il faut utiliser une fonction qui est appelée dans useEffect et déclarée en dehors, comme ici 👇.
    // Essayez de commenter le code créé dans le chapitre et de décommenter fetchData pour voir.

    // async function fetchData() {
    //   try {
    //     const response = await fetch(`http://localhost:8000/survey`)
    //     const { surveyData } = await response.json()
    //     setSurveyData(surveyData)
    //   } catch (error) {
    //     console.log('===== error =====', error)
    //     setError(true)
    //   }
    // }

    // useEffect(() => {
    //   // fetchData()
    //   setDataLoading(true)
    //   fetch(`http://localhost:8000/survey`).then((response) =>
    //     response
    //       .json()
    //       .then(({ surveyData }) => {
    //         setSurveyData(surveyData)
    //         setDataLoading(false)
    //       })
    //       .catch((error) => {
    //         setError(true)
    //         console.log({ error })
    //       }),
    //   )
    // }, [])

    //===============================================

    function saveReply(answer) {
        saveAnswers({ [questionNumber]: answer })
    }

    if (error)
        return <ErrorMessage>Oups, il y a eu un problème...</ErrorMessage>

    return (
        <SurveyContainer>
            <QuestionTitle theme={theme}>
                Question {questionNumber}
            </QuestionTitle>
            {isLoading ? (
                <Loader />
            ) : (
                <QuestionContent theme={theme}>
                    {surveyData && surveyData[questionNumber]}
                </QuestionContent>
            )}

            <ReplyWrapper>
                <ReplyBox
                    onClick={() => saveReply(true)}
                    $isSelected={answers[questionNumber] === true}
                    theme={theme}
                >
                    Oui
                </ReplyBox>
                <ReplyBox
                    onClick={() => saveReply(false)}
                    $isSelected={answers[questionNumber] === false}
                    theme={theme}
                >
                    Non
                </ReplyBox>
            </ReplyWrapper>

            <LinkWrapper theme={theme}>
                <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
                {surveyData && surveyData[questionNumberInt + 1] ? (
                    <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
                ) : (
                    <Link to="/results">Résultats</Link>
                )}
            </LinkWrapper>
        </SurveyContainer>
    )
}

export default Survey
