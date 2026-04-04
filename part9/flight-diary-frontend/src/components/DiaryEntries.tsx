import type { Entry } from '../types.ts'
import DiaryEntry from './DiaryEntry.tsx'

const DiaryEntries = ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      {entries.map(entry => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default DiaryEntries
