import { useState, type ChangeEvent } from 'react'

const useField = (type: string) => {
  const [value, setValue] = useState('')
  const reset = () => setValue('')
  return {
    type,
    value,
    reset,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(event.target.value),
  }
}

export default useField
