import RichText from './RichText'

// Renders one content section's blocks: paragraphs, bullets, numbered steps,
// a table and trailing paragraphs. Shared by money pages and articles.
export default function Blocks({ block }) {
  return (
    <>
      {block.paragraphs?.map((p, i) => <p key={i}><RichText text={p} /></p>)}
      {block.bullets?.length > 0 && (
        <ul className="bp-mp-list">{block.bullets.map((b, i) => <li key={i}><RichText text={b} /></li>)}</ul>
      )}
      {block.steps?.length > 0 && (
        <ol className="bp-mp-steps">
          {block.steps.map((s, i) => (
            <li key={i}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><div><strong>{s.title}</strong><p><RichText text={s.text} /></p></div></li>
          ))}
        </ol>
      )}
      {block.table && (
        <div className="bp-mp-table">
          <table>
            <thead><tr>{block.table.headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{block.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><RichText text={c} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
      {block.after?.map((p, i) => <p key={`a${i}`}><RichText text={p} /></p>)}
    </>
  )
}
