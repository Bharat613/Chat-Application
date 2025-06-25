import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router";
import Join from './components/Join/Join.js';
import Chat from './components/Chat/Chat.js';

const App = () => {
  return (
    <Router>
      <Routes>
<Route path="/" exact element={<Join/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
        
    </Router>
  )
}

export default App