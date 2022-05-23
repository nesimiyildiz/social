import "./App.css";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import React,{useContext} from "react";
import { AuthProvider,AuthContext } from "./context/auth";





function App() {

   const user=useContext(AuthContext)
  return (
    <AuthProvider>

      <Router>
        <Container>
          <MenuBar />
          <Routes>
            
                    
              <Route path="/" element={<Home />} /> 
               <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post/:postId" element={<SinglePost/>}/>
            
        
          </Routes>
        </Container>
      </Router>
    
    </AuthProvider>
  );
}

export default App;
