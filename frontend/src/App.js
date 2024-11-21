import './App.css';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostsDashboard from './components/PostDashboard';


function App() {
  return (<ProfilePage />)
}

export default App;