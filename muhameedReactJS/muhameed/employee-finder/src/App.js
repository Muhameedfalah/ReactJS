import React from 'react'
import { Route, Routes } from "react-router-dom"
import EmployeeInfo from './components/EmployeeInfo'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SearchTermPage from './pages/SearchTermPage'
import WishList from './pages/WishList'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/favs" element={<WishList />} />
        <Route path="/search" element={<SearchTermPage />} />
        <Route path="/employee/:company/:index" element={<EmployeeInfo />} />
      </Routes>
    </div>
  )
}

export default App