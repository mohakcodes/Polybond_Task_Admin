import React from 'react';
import { Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

function Header({ isCollapsed, setIsCollapsed }) {
  const handleToggle = () => {
    console.log(isCollapsed)
    setIsCollapsed(!isCollapsed);
  };

  const user = useSelector((state) => state.user.staff_name);

  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Left Side - Menu Icon */}
      <div className="flex items-center space-x-4">
        <Menu className="w-6 h-6 cursor-pointer" onClick={handleToggle} />
        <Link to="/">
          <img className="w-28 h-18 cursor-pointer" src="assets/images/polybond_logo.png" alt="Login" />
        </Link>

      </div>

      {/* Middle - Search Bar */}
      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search something..."
            className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 text-gray-700"
          />
          <Search className="absolute right-3 text-gray-400" />
        </div>
      </div>

      {/* Right Side - Welcome Message and Profile Icon */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 font-semibold">Welcome, {user}</span>
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="assets/images/user.png" alt="Login" />
        </div>
      </div>
    </header>
  );
}

export default Header;
