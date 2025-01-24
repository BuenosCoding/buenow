import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f')] bg-cover bg-center bg-no-repeat opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="block text-purple-400">Elevate Your Game</span>
              <span className="block">with Premium Scripts</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-xl text-gray-300">
              Discover high-quality scripts for FiveM, Minecraft, and more.
              Transform your gaming experience today.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  Browse Scripts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
              <Sparkles className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">Premium Quality</h3>
            <p className="mt-2 text-gray-400">
              Handpicked scripts tested for performance and reliability.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
              <Shield className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">Secure & Safe</h3>
            <p className="mt-2 text-gray-400">
              All scripts are verified and guaranteed malware-free.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
              <Zap className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">Instant Access</h3>
            <p className="mt-2 text-gray-400">
              Download immediately after purchase, no waiting time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}