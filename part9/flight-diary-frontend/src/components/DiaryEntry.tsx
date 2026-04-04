import type { Entry } from '../types.ts'

const DiaryEntry = ({ entry }: { entry: Entry }) => {
  return (
    <dl>
      <dt>
        <h4>{entry.date}</h4>
      </dt>
      <dd style={{ marginLeft: 0 }}>visibility: {entry.visibility}</dd>
      <dd style={{ marginLeft: 0 }}>weather: {entry.weather}</dd>
    </dl>
  )
}

export default DiaryEntry
