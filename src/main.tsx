import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { DashboardCreator } from './pages/dashboard/creator/DashboardCreator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <DashboardCreator />
    {/* <LoginPage /> */}

  </StrictMode>,
)
