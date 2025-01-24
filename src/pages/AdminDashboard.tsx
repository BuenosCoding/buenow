import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Script {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  game_type: string;
}

export default function AdminDashboard() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScripts();
  }, []);

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
      toast.error('Error loading scripts');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('scripts').delete().eq('id', id);
      if (error) throw error;
      
      toast.success('Script deleted successfully');
      fetchScripts();
    } catch (error) {
      toast.error('Error deleting script');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-xl">Loading scripts...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Scripts</h1>
        <Button>Add New Script</Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg bg-gray-800/50">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Game</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {scripts.map((script) => (
              <tr key={script.id}>
                <td className="whitespace-nowrap px-6 py-4">{script.title}</td>
                <td className="whitespace-nowrap px-6 py-4">{script.game_type}</td>
                <td className="whitespace-nowrap px-6 py-4">${script.price}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(script.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}