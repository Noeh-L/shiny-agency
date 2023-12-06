import { createGlobalStyle } from 'styled-components'
import { ThemeContext } from '../context/context'
import { useContext } from 'react'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

    body {
        background-color: ${(props) =>
            props.isDarkMode ? '#2F2E41' : 'white'};
        transition: background ease-out 500ms;
    }
`

function GlobalStyle() {
    const { theme } = useContext(ThemeContext)
    return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle
