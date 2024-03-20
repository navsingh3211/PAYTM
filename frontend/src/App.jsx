import {lazy,Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import ErrorPage from './components/ErrorPage';

const Dashboard = lazy(()=>import('./components/Dashboard'));
const Signup = lazy(()=>import('./components/Signup'));
const Signin = lazy(()=>import('./components/Signin'));
const SendMoney = lazy(()=>import('./components/SendMoney'));


function App() {
  return (
    <div className='text-center items-center bg-zinc-500 h-[100vh]'>
        <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/signup' element={<Suspense fallback={"loading..."}><Signup/></Suspense>}/>
            
            {/* <Route path='/signup' element={<Signup/>}/> */}

            <Route path='/signin' element={<Signin/>}/>
            <Route path='/send' element={<SendMoney/>}/>
            <Route path='/error' element={<ErrorPage/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}
export default App
