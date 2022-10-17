import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './styles/global.css'

const rootElement = document.getElementById('root')
// @ts-expect-error
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
