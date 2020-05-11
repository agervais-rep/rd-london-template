import React from 'react'
import { ThemeOptionsProvider } from './src/context/ThemeOptions'

export const wrapRootElement = ({ element }) => (
  <ThemeOptionsProvider>{element}</ThemeOptionsProvider>
)
