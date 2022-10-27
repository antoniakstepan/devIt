import React from "react";
import { Routes, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Admin } from '../component/Admin'
import { Home } from "./Home";
const AppRouter = () => {
  
  return (
    <Routes>
      <Route key={uuidv4()} path={'/admin'} element={<Admin />} exact />
      <Route key={uuidv4()} path={'/'} element={<Home />}/>
    </Routes>
  )
};

export default AppRouter;