import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ExplorationProvider } from './state/ExplorationContext'
import { installClickFeedback } from './utils/clickFeedback'
import { scheduleImagePreload } from './services/imagePreloader'
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

// 首页渲染完成后，在浏览器空闲时后台预加载全部图片（不阻塞首页与「开始探索」）
scheduleImagePreload()
