import React from "react";

function Nav() {
    const headers = ['Home', 'Explore', 'Post', 'Profile', 'Logout'];
    var link;
  
    return (
        <nav className="bg-black text-white fixed top-0 left-0 w-full h-24 shadow-xl z-50">
            <div className="max-w-2xl mx-auto px-4 h-full">
            <div className="flex items-center justify-between h-full">
                {headers.map(item => {
                    link = "/" + item.toLowerCase();
                    return (<a href={link} className='hover:text-gray-500 transition duration-300 hover:-translate-y-1'>
                    {item}
                    </a>)
                })}
            </div>
            </div>
        </nav>
    );
}

export default Nav;
