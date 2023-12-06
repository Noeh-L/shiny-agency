import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/styles/color'
import DefaultPicture from '../../assets/profile.png'
import { useTheme } from '../../utils/hooks/hooks'
import { Link } from 'react-router-dom'

const CardLabel = styled.span`
    color: ${({ theme }) => (theme === 'dark' ? 'white' : '#5843e4')};
    font-size: 22px;
    font-weight: normal;
    text-align: center;
`

const CardTitle = styled.span`
    font-size: 22px;
    font-weight: normal;
    align-self: center;
`

const CardImage = styled.img`
    height: 150px;
    width: 150px;
    align-self: center;
    border-radius: 50%;
`

const CardWrapper = styled(Link)`
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: ${({ theme }) =>
        theme === 'dark' ? colors.backgroundDark : colors.backgroundLight};
    color: ${({ theme }) => theme === 'dark' && 'white'};
    border-radius: 30px;
    width: 100%;
    height: 300px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
    &:visited {
        color: unset;
    }
    ${({ theme }) =>
        theme === 'dark' &&
        `box-shadow: 1px 1px 2px #121219;
        &:hover {
            cursor: pointer;
            box-shadow: 2px 2px 10px #121219;}`}
`

function Card({ label, title, picture, profilId }) {
    const { theme } = useTheme()

    return (
        <CardWrapper to={profilId} theme={theme}>
            <CardLabel theme={theme}>{label}</CardLabel>
            <CardImage src={picture} alt="freelance" />
            <CardTitle theme={theme}>{title}</CardTitle>
        </CardWrapper>
    )
}

Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
}

Card.defaultProps = {
    label: '',
    title: '',
    picture: DefaultPicture,
}

export default Card
