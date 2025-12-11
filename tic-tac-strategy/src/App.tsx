import type { JSX } from 'react'
import { GameShell } from './features/tic-tac-strategy/components/GameShell'
import { Page } from './shared/components/layout/Page'
import { ThemeProvider } from './shared/theme/ThemeProvider'

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <Page>
        <GameShell />
      </Page>
    </ThemeProvider>
  )
}

export default App
