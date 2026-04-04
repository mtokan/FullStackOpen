import DiaryEntries from './components/DiaryEntries.tsx'
import { useEffect, useState } from 'react'
import { type Entry, type NewEntry } from './types.ts'
import { createDiary, getAllDiaries } from './services/diaryService.ts'
import DiaryForm from './components/DiaryForm.tsx'
import axios from 'axios'

function App() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    getAllDiaries().then(res => setEntries(res))
  }, [])

  const showMessage = (message: string) => {
    setMessage(message)
    setTimeout(() => setMessage(null), 10000)
  }

  const handleNewEntry = (newEntry: NewEntry) => {
    createDiary(newEntry)
      .then(res => setEntries(prev => [...prev, res]))
      .catch(error => {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data)
        } else {
          console.log(error)
        }
      })
  }

  return (
    <div>
      {message && <div style={{ color: 'red' }}>{message}</div>}
      <DiaryForm handleNewEntry={handleNewEntry} />
      <DiaryEntries entries={entries} />
    </div>
  )
}

export default App
