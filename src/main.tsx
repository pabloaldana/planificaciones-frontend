import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DashboardCreator } from './pages/dasboardCreator/DashboardCreator.tsx'
import { LoginForm } from './components/forms/LoginForm.tsx'
import { LoginCard } from './components/auth/LoginCard.tsx'
import { LoginPage } from './pages/login/LoginPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <DashboardCreator />
    {/* <LoginPage /> */}

  </StrictMode>,
)
