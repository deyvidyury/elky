'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { insforge } from '@/lib/insforge/client';

export function DeleteCategoryButton({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const { error } = await insforge.database
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) {
      alert('Erro ao excluir: ' + error.message);
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
      >
        Excluir
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-gray-500">
        Excluir &quot;{categoryName}&quot;?
      </span>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="rounded-lg px-2 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-colors"
      >
        {deleting ? '...' : 'Sim'}
      </button>
      <button
        onClick={() => setConfirming(false)}
        disabled={deleting}
        className="rounded-lg px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors"
      >
        Não
      </button>
    </div>
  );
}
