import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import MakePayment from './pages/MakePayment';
import PayPreview from './pages/PayPreview';
import ConfirmPage from './pages/ConfirmPage';
import React from "react";
import Login from "./components/Login"; // Correct the import path
import Viewbalance from "./components/Viewbalance"; // Correct the import path
import Home from './pages/Home';
import Redeem from './components/Redeem';
import EnableDisable from './components/EnableDisable';

import ManageBlock from './components/ManageBlock';
import { AddTutorial } from "./components/AddTutorial";
import Transaction from './components/Transaction';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage/>} />
          <Route exact path='/pay' element={<MakePayment/>} />
          <Route exact path='/previewpay' element={<PayPreview/>} />
          <Route exact path='/payment-done' element={<ConfirmPage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/viewbalance" element={<Viewbalance/>} />
          <Route path='/home' element={<Home/>}/>
          <Route exact path="/redeem" element={<Redeem />}/>
          <Route exact path="/enableDisable" element={<EnableDisable />}/>
          <Route exact path="/accountBlockage" element={<ManageBlock />}/>
          <Route exact path="/transactions" element={<Transaction />} />
          <Route exact path="/add" element={<AddTutorial />} />
        {/* Add more routes for other components/pages */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;