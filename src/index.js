import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { createGlobalStyle } from 'styled-components'

// _________________
import Home from './pages/Home/Home'
import Survey from './pages/Survey/Survey'
import Header from './components/Header/Header'
import Error from './components/Error/Error'
import Freelances from './pages/Freelances/Freelances'
import Results from './pages/Results/Results'
import GlobalStyle from './utils/styles/GlobalStyle'
import { SurveyProvider, ThemeProvider } from './utils/context/context'
import Footer from './components/Footer/Footer'
import Profil from './pages/Profil/Profil'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <Router>
            <ThemeProvider>
                <SurveyProvider>
                    <GlobalStyle />
                    <Header />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/survey/:questionNumber"
                            element={<Survey />}
                        />
                        <Route path="/results" element={<Results />} />
                        <Route path="/freelances" element={<Freelances />} />
                        <Route path="/profile/:id" element={<Profil />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    <Footer />
                </SurveyProvider>
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
)
