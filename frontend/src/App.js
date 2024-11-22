import './App.css';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostsDashboard from './components/PostDashboard';
import UserProfilePage from './pages/UserProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import CreateProfilePage from './pages/CreateProfilePage';

function App() {
  return (<Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/createPost' element={<CreatePostPage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Routes>
  </Router>
  
)
}

export default App;