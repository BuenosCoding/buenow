import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

export default function ScriptDetails() {
  const { id } = useParams<{ id: string }>();
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScript() {
      try {
        const { data, error } = await supabase
          .from('scripts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setScript(data);
      } catch (error) {
        console.error('Error fetching script:', error);
        toast.error('Error loading script details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchScript();
    }
  }, [id]);

  const handlePurchase = async () => {
    try {
      const { error } = await supabase.from('purchases').insert({
        script_id: id,
      });

      if (error) throw error;
      toast.success('Successfully purchased script!');
    } catch (error) {
      toast.error('Error purchasing script');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-xl">Loading script details...</div>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-xl">Script not found</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg bg-gray-800/50 shadow">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={script.image_url}
            alt={script.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{script.title}</h1>
            <span className="rounded-full bg-purple-500/10 px-4 py-2 text-purple-400">
              {script.game_type}
            </span>
          </div>
          <p className="mt-6 text-lg text-gray-300">{script.description}</p>
          <div className="mt-8 flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-400">
              ${script.price}
            </span>
            <Button onClick={handlePurchase} size="lg">
              Purchase Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}