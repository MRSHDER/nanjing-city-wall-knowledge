import { useExploration } from '@/state/ExplorationContext'

export function AchievementList() {
  const { session, catalog } = useExploration()
  const completed = catalog.nodes.filter(
    (node) => session.nodeStatusById[node.id] === 'completed',
  )

  return (
    <aside className="explore-record" aria-label="探索记录">
      <div className="explore-record__title">探索记录</div>
      {completed.length === 0 ? (
        <p>暂无发现</p>
      ) : (
        <ol>
          {completed.map((node) => (
            <li key={node.id}>{node.title}</li>
          ))}
        </ol>
      )}
    </aside>
  )
}
