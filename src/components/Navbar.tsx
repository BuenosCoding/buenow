import { Link } from 'react-router-dom';
import { Gamepad2, User } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Gamepad2 className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold">ScriptVerse</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost">Browse Scripts</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            <div className="ml-4 flex items-center">
              <Link to="/login">
                <Button variant="outline" size="sm" className="mr-2">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Button
                variant="default"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}