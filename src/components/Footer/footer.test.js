import Footer from './Footer'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context/context'

describe('Footer', () => {
    test('Change theme', async () => {
        render(
            <ThemeProvider>
                <Footer />
            </ThemeProvider>,
        )
        const nightModeButton = screen.getByRole('button')
        expect(nightModeButton.textContent).toBe('Changer de mode : 🌙')
        fireEvent.click(nightModeButton)
        expect(nightModeButton.textContent).toBe('Changer de mode : 🌞')
    })
})
