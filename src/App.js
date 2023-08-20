import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Header} from './components/Header.js';
import {Login} from './pages/Login.js';
import {Signup} from './pages/Signup.js';
import {Home} from './pages/Home.js';
import { Important } from "./pages/Important.js";
import { Completed } from "./pages/Completed.js";


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
          element={!window.localStorage.getItem("accessToken") ? <Login /> : <Home />}
        />
            <Route exact path = "/home" element={<Home/>}/>
            <Route exact path="/important" element={<Important/>} />
            <Route exact path="/completed" element={<Completed/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
