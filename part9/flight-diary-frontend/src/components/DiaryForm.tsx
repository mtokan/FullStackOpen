import styles from './DiaryForm.module.css'
import useField from '../hooks/useField.ts'
import { resetAll } from '../utils.ts'
import { type NewEntry, visibilityOptions, weatherOptions } from '../types.ts'
import { useState, type SyntheticEvent } from 'react'

const DiaryForm = ({ handleNewEntry }: { handleNewEntry: (newEntry: NewEntry) => void }) => {
  const { reset: resetDate, ...date } = useField('date')
  const [visibility, setVisibility] = useState<NewEntry['visibility']>('great')
  const [weather, setWeather] = useState<NewEntry['weather']>('sunny')
  const { reset: resetComment, type: commentType, ...comment } = useField('text')

  const submit = (event: SyntheticEvent) => {
    event.preventDefault()
    const newEntry: NewEntry = {
      date: date.value,
      visibility: visibility,
      weather: weather,
      comment: comment.value,
    }
    handleNewEntry(newEntry)
    resetAll(
      resetDate,
      () => setVisibility('great'),
      () => setWeather('sunny'),
      resetComment
    )
  }

  return (
    <form className={styles.diaryForm} onSubmit={submit}>
      <div>
        <label>
          Date
          <input {...date} />
        </label>
      </div>
      <div>
        {visibilityOptions.map(option => (
          <label key={option}>
            <input type="radio" value={option} checked={visibility === option} onChange={() => setVisibility(option)} />
            {option}
          </label>
        ))}
      </div>
      <div>
        {weatherOptions.map(option => (
          <label key={option}>
            <input type="radio" value={option} checked={weather === option} onChange={() => setWeather(option)} />
            {option}
          </label>
        ))}
      </div>
      <div>
        <label>
          Comment
          <textarea {...comment} />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default DiaryForm
