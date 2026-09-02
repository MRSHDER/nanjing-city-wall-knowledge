import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ExplorationProvider } from './state/ExplorationContext'
import './styles/global.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('找不到 #root')
}

createRoot(root).render(
  <StrictMode>
    <ExplorationProvider>
      <App />
    </ExplorationProvider>
  </StrictMode>,
)
