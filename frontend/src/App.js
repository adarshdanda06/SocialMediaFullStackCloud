import './App.css';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Nav from './components/Nav';
import WelcomeHome from './components/WelcomeHome';
import HomePage from './pages/HomePage';

function App() {
  return (<HomePage />)
}

export default App;