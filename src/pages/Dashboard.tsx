import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';

interface Script {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  game_type: string;
}

export default function Dashboard() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScripts() {
      try {
        const { data, error } = await supabase
          .from('scripts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setScripts(data || []);
      } catch (error) {
        console.error('Error fetching scripts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchScripts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-xl">Loading scripts...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Available Scripts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {scripts.map((script) => (
          <Link
            key={script.id}
            to={`/scripts/${script.id}`}
            className="group relative overflow-hidden rounded-lg bg-gray-800/50 p-4 transition-transform hover:-translate-y-1"
          >
            <div className="aspect-video overflow-hidden rounded-md">
              <img
                src={script.image_url}
                alt={script.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold">{script.title}</h2>
            <p className="mt-2 text-gray-400">{script.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-purple-400">${script.price}</span>
              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                {script.game_type}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}