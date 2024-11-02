import React, { useState } from 'react';
import Logout from './Logout';
import AddPost from './AddPost';
import Followers from './Followers';
import Following from './Following';
import Users from './Users';
import Navbar from './Navbar';

function App() {
  const [activeComponent, setActiveComponent] = useState('logout');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'logout':
        return <Logout />;
      case 'addPost':
        return <AddPost />;
      case 'followers':
        return <Followers />;
      case 'following':
        return <Following />;
      case 'users':
        return <Users />;
      default:
        return <Logout />;
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
