import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AddPost from './components/AddPost';
import Followers from './components/Followers';
import Following from './components/Following';

function App() {
  const [activeComponent, setActiveComponent] = useState('login');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'login':
        return <Login />;
      case 'addPost':
        return <AddPost />;
      case 'followers':
        return <Followers />;
      case 'following':
        return <Following />;

      default:
        return <Login />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="p-4">{renderComponent()}</div>
    </div>
  );
}

export default App;
