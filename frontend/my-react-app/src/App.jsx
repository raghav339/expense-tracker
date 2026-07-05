import {Routes,Route} from 'react-router-dom';
import './App.css'
import Homepage from './homepage.jsx';
import Signup from './signup.jsx';
import Signin from './signin.jsx';
import Logout from './logout.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/logout" element={<Logout/>} />
    </Routes>
  );
}

export default App
