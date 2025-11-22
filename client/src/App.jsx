import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomeDashboard from './pages/HomeDashboard'
import WeatherRoadUpdates from './pages/WeatherRoadUpdates'
import CheckConditions from './pages/CheckConditions'
import CommunityFeed from './pages/CommunityFeed'
import CompareResorts from './pages/CompareResorts'
import MessagesGroups from './pages/MessagesGroups'
import UserProfiles from './pages/UserProfiles'
import Login from './pages/Login'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeDashboard />} />
        <Route path="weather" element={<WeatherRoadUpdates />} />
        <Route path="conditions" element={<CheckConditions />} />
        <Route path="community" element={<CommunityFeed />} />
        <Route path="compare" element={<CompareResorts />} />
        <Route path="messages" element={<MessagesGroups />} />
        <Route path="profiles" element={<UserProfiles />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
