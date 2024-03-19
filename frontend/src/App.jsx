import {lazy} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const Dashboard = lazy(()=>import('./components/Dashboard'));
const Signup = lazy(()=>import('./components/Signup'));
const Signin = lazy(()=>import('./components/Signin'));
const SendMoney = lazy(()=>import('./components/SendMoney'));


function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/send' element={<SendMoney/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
