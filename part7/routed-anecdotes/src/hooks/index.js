import {useState} from 'react'

export const useField = (type) => {
  const defaultValue = ''
  const [value, setValue] = useState(defaultValue)
  
  const onChange = (e) => {
    setValue(e.target.value)
  }
  
  const reset = () => {
    setValue(defaultValue)
  }
  
  return {
    inputs: {
      type,
      value,
      onChange
    },
    reset
  }
}