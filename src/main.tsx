import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ExplorationProvider } from './state/ExplorationContext'
import { installClickFeedback } from './utils/clickFeedback'
import './styles/global.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('找不到 #root')
}

// 全局点击反馈：整个项目共用这一套波纹，新增按钮无需再写动画
installClickFeedback()

createRoot(root).render(
  <StrictMode>
    <ExplorationProvider>
      <App />
    </ExplorationProvider>
  </StrictMode>,
)
