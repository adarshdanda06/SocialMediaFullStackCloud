import './App.css';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import CreateProfilePage from './pages/CreateProfilePage';
import ExplorePage from './pages/ExplorePage';
import NoAccessPage from './pages/NoAccessPage';
import { UserProvider } from './UserContext';



function App() {

  return (<Router>
    <UserProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/createPost' element={<CreatePostPage />} />
        <Route path='/noAccess' element={<NoAccessPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/createProfile' element={<CreateProfilePage />} />
        <Route path='/userProfile/:name' element={<UserProfilePage />} />
      </Routes>
    </ UserProvider>
  </Router>);
}

export default App;