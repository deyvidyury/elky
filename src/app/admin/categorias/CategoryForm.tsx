'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { insforge } from '@/lib/insforge/client';

const EMOJI_OPTIONS = [
  '🧹',
  '🍳',
  '❄️',
  '🚿',
  '🔪',
  '📦',
  '🍽️',
  '🥘',
  '☕',
  '🧊',
  '🔥',
  '⚡',
  '🛒',
  '🏪',
  '⭐',
];

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface CategoryFormProps {
  mode: 'create' | 'edit';
  category?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
  };
}

export function CategoryForm({ mode, category }: CategoryFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CategoryFormData>({
    name: category?.name ?? '',
    slug: category?.slug ?? '',
    description: category?.description ?? '',
    icon: category?.icon ?? '📦',
  });

  function updateField(field: keyof CategoryFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function handleNameChange(value: string) {
    updateField('name', value);
    if (mode === 'create' && !form.slug) {
      updateField('slug', generateSlug(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (mode === 'create') {
      const { error } = await insforge.database.from('categories').insert({
        name: form.name,
        slug: form.slug,
        description: form.description,
        icon: form.icon,
      });

      if (error) {
        alert('Erro ao criar: ' + error.message);
        setSaving(false);
        return;
      }
      router.push('/admin/categorias');
    } else {
      const { error } = await insforge.database
        .from('categories')
        .update({
          name: form.name,
          slug: form.slug,
          description: form.description,
          icon: form.icon,
        })
        .eq('id', category!.id);

      if (error) {
        alert('Erro ao salvar: ' + error.message);
        setSaving(false);
        return;
      }
      router.push('/admin/categorias');
    }

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nome
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-shadow"
            placeholder="Ex: Limpeza"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Slug
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-shadow"
            placeholder="ex: limpeza"
          />
          <p className="mt-1 text-xs text-gray-400">
            Usado na URL: /categorias/{form.slug || '...'}
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Descrição
          </label>
          <textarea
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            required
            rows={3}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-shadow resize-none"
            placeholder="Breve descrição da categoria..."
          />
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Ícone (emoji)
          </label>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">{form.icon}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => updateField('icon', emoji)}
                className={`h-10 w-10 flex items-center justify-center rounded-lg text-xl transition-all ${
                  form.icon === emoji
                    ? 'bg-brand-100 ring-2 ring-brand-500 scale-110'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {saving
            ? 'Salvando...'
            : mode === 'create'
              ? 'Criar Categoria'
              : 'Salvar Alterações'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/categorias')}
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
