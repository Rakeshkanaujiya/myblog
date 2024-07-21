import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from 'react';
import Context from './context/Context';
import ForgetPassword from './pages/forgetpassword/ForgetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SinglePost from './components/singlePost/SinglePost';


function App() {
 const {user} = useContext(Context);
  return (
    <>
      <Router>
        <TopBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Login />} />
          <Route path="/settings" element={user ? <Settings /> : <Login />} />
          <Route path="/post/:postId" element={<SinglePost/>} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:id" element={ <ResetPassword/> }></Route>
        </Routes>
      </Router>
    </>
  );
  
}

export default App
