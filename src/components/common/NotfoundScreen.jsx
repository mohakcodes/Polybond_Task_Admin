import React from 'react';
import { Link } from 'react-router-dom';

function NotfoundScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex items-center justify-center">

        <div>
          <img
            src="/assets/images/404.png" // Replace with the path to your image
            alt="Rocket"
            className="h-96 w-96"
          />
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
        Oops! Page Not Found
      </h1>
      <p className="text-center text-gray-500 max-w-md mb-6">
        It looks like you've taken a wrong turn. Don’t worry, it happens to the best of us.
        The page you’re looking for might have been moved, deleted, or possibly never existed.
      </p>
      <Link
        className="bg-red-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-600 transition-colors mt-10"
        to="/"
      >
        Take me back to Home
      </Link>
    </div>
  );
}

export default NotfoundScreen;