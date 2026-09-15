import { useState } from 'react'
import { useExploration } from '@/state/ExplorationContext'

export function AchievementList() {
  const { session, catalog } = useExploration()
  const [open, setOpen] = useState(false)
  const completed = catalog.nodes.filter(
    (node) => session.nodeStatusById[node.id] === 'completed',
  )
  const listId = 'explore-record-list'

  return (
    <aside className={`explore-record${open ? ' is-open' : ''}`} aria-label="探索记录">
      <button
        type="button"
        className="explore-record__toggle"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((next) => !next)}
      >
        <span className="explore-record__title">探索记录</span>
        <span className="explore-record__count">{completed.length}/{catalog.nodes.length}</span>
        <span className="explore-record__icon" aria-hidden="true">
          {open ? '收起' : '展开'}
        </span>
      </button>

      {open ? (
        <div id={listId} className="explore-record__body">
          {completed.length === 0 ? (
            <p>暂无发现</p>
          ) : (
            <ol>
              {completed.map((node) => (
                <li key={node.id}>{node.title}</li>
              ))}
            </ol>
          )}
        </div>
      ) : null}
    </aside>
  )
}
