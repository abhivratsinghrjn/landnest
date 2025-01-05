import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function AuthButton() {
  return (
    <Link
      to="/signup"
      className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-md border-2 border-blue-600 hover:bg-blue-50 transition-colors"
    >
      <LogIn className="h-4 w-4 mr-2" />
      Sign Up
    </Link>
  );
}