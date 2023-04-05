import { BrowserRouter as Router, Route , Routes } from "react-router-dom";

import ProfilePage from "./Pages/ProfilePage"
import Home from "./Pages/RegisterPage"



function App() {

  return (
    <div className="App">
  
      <Router>
      <Routes>
        <Route  index element={<Home/>}/>
        <Route  path="/profile"  element={<ProfilePage/>}/>
      </Routes>
  </Router>


    </div>
  )
}

export default App
