import React, { useEffect, useState } from 'react'

import { useLocalStorage } from './useLocalStorage'
import { ModeToggle } from '../components/ModeToggle'

export const useModeToggle = () => {
  const { storedValue, setValue } = useLocalStorage(
    'isDarkMode',
    typeof window !== 'undefined' ? matchMedia('(prefers-color-scheme: dark)').matches : true,
  )
  const [checked, setChecked] = useState(storedValue)
  const element = <ModeToggle checked={checked} onChange={(newChecked) => setChecked(newChecked)} />

  useEffect(() => {
    setValue(checked)
  }, [checked, setValue])

  useEffect(() => {
    if (storedValue) {
      document.body.classList.remove('lightMode')
      document.body.classList.add('darkMode')
    } else {
      document.body.classList.remove('darkMode')
      document.body.classList.add('lightMode')
    }
  }, [storedValue])

  return { element }
}
