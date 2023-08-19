import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Header} from './components/Header.js';
import {Login} from './pages/Login.js';
import {Signup} from './pages/Signup.js';
import {Home} from './pages/Home.js';
import { First} from './pages/First.js';
function App() {
  return (
    <div className="attributes">
      <Router>
        <Header />
        <Routes>
          <Route exact path = "user/signup" element={<Signup />}/>
          <Route exact path = "user/login" element={<Login />}/>
          <Route
          exact path="/"
          element={<First/>}/>
          <Route exact path = "/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
