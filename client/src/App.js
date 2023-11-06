
import {  BrowserRouter as Router,Routes,Route } from "react-router-dom"; 
import './App.css';
import Home from './pages/Student/Home';
import AdminLogin from "./pages/Admin/Login";
import StudentLogin from "./pages/Student/Login";
import PostMember from "./pages/Admin/PostMember";
import Members from "./pages/Student/Members";
import PostEvents from "./pages/Admin/PostEvents";
import Register from "./pages/Student/Register";
import Event from "./pages/Student/Event";
import EventDetailed from "./pages/Student/EventDetailed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/members" element={<Members/>} />
        <Route path="/student/register" element={<Register/>}/>
        <Route path="/student/login" element={<StudentLogin/>}/>
        <Route path="/events" element={<Event/>}/>
        <Route path="/events/:id" element={<EventDetailed/>}/>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/postmember" element={<PostMember/>}/>
        <Route path="/admin/postevents" element={<PostEvents/>}/>
        {/* Universal Route */}
        <Route path="*" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
