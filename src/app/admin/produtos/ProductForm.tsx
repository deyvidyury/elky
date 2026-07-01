'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { insforge } from '@/lib/insforge/client';
import { createProduct, updateProduct } from '@/lib/insforge/actions';

interface Spec {
  key: string;
  value: string;
}

interface ProductFormData {
  name: string;
  slug: string;
  category_id: string;
  price: string;
  description: string;
  supplier: string;
  featured: boolean;
  specs: Spec[];
}

interface ProductFormProps {
  mode: 'create' | 'edit';
  categories: Array<{ id: string; name: string }>;
  product?: {
    id: string;
    name: string;
    slug: string;
    category_id: string;
    price: string;
    description: string;
    image_key: string;
    image_url: string;
    specs: Record<string, string>;
    supplier: string | null;
    featured: boolean;
  };
}

export function ProductForm({ mode, categories, product }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    product?.image_url ?? '',
  );
  const formRef = useRef<ProductFormData>({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    category_id: product?.category_id ?? categories[0]?.id ?? '',
    price: product?.price ?? '',
    description: product?.description ?? '',
    supplier: product?.supplier ?? '',
    featured: product?.featured ?? false,
    specs: product?.specs
      ? Object.entries(product.specs).map(([key, value]) => ({ key, value }))
      : [{ key: '', value: '' }],
  });

  const [form, setForm] = useState<ProductFormData>(formRef.current);

  function updateField(field: keyof ProductFormData, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      formRef.current = next;
      return next;
    });
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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function updateSpec(index: number, field: 'key' | 'value', val: string) {
    const newSpecs = [...form.specs];
    newSpecs[index] = { ...newSpecs[index], [field]: val };
    setForm((prev) => {
      const next = { ...prev, specs: newSpecs };
      formRef.current = next;
      return next;
    });
  }

  function addSpec() {
    setForm((prev) => {
      const next = { ...prev, specs: [...prev.specs, { key: '', value: '' }] };
      formRef.current = next;
      return next;
    });
  }

  function removeSpec(index: number) {
    setForm((prev) => {
      const next = { ...prev, specs: prev.specs.filter((_, i) => i !== index) };
      formRef.current = next;
      return next;
    });
  }

  async function generateDescription() {
    setGenerating(true);
    try {
      // ponytail: read from ref so we always send the latest fields to AI
      const f = formRef.current;
      const categoryName =
        categories.find((c) => c.id === f.category_id)?.name ?? '';

      const specStr = f.specs
        .filter((s) => s.key.trim())
        .map((s) => `${s.key.trim()}: ${s.value.trim()}`)
        .join(', ');

      const res = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name,
          category: categoryName,
          price: f.price,
          supplier: f.supplier,
          specs: specStr,
        }),
      });

      const data = await res.json();
      if (data.description) {
        updateField('description', data.description);
      } else {
        alert(data.error ?? 'Erro ao gerar descrição.');
      }
    } catch {
      alert('Erro ao conectar com o gerador de IA.');
    } finally {
      setGenerating(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    let imageKey = product?.image_key ?? '';
    let imageUrl = product?.image_url ?? '';

    // Upload image if new file selected
    if (imageFile) {
      const ext = imageFile.name.split('.').pop() ?? 'jpg';
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { data: uploadData, error: uploadError } = await insforge.storage
        .from('product-images')
        .upload(path, imageFile);

      if (uploadError || !uploadData) {
        alert(
          'Erro ao enviar imagem: ' + (uploadError?.message ?? 'desconhecido'),
        );
        setSaving(false);
        return;
      }

      imageKey = uploadData.key;
      imageUrl = uploadData.url;
    }

    // ponytail: read from ref to avoid stale closure after AI generation
    const f = formRef.current;

    const specsObj: Record<string, string> = {};
    for (const spec of f.specs) {
      if (spec.key.trim()) {
        specsObj[spec.key.trim()] = spec.value.trim();
      }
    }

    const payload = {
      name: f.name,
      slug: f.slug,
      category_id: f.category_id,
      price: f.price,
      description: f.description,
      supplier: f.supplier || null,
      featured: f.featured,
      specs: specsObj,
      image_key: imageKey,
      image_url: imageUrl,
    };

    if (mode === 'create') {
      const result = await createProduct(payload);

      if (!result.success) {
        alert('Erro ao criar: ' + (result.error ?? 'desconhecido'));
        setSaving(false);
        return;
      }
    } else {
      const result = await updateProduct(product!.id, payload);

      if (!result.success) {
        alert('Erro ao salvar: ' + (result.error ?? 'desconhecido'));
        setSaving(false);
        return;
      }
    }

    router.push('/admin/produtos');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nome do Produto
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-shadow"
            placeholder="Ex: Papel Toalha Interfolhado 2000 Folhas"
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
            placeholder="ex: papel-toalha-interfolhado-2000-folhas"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Categoria
          </label>
          <select
            value={form.category_id}
            onChange={(e) => updateField('category_id', e.target.value)}
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-shadow bg-white"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Preço
          </label>
          <input
            type="text"
            value={form.price}
            onChange={(e) => updateField('price', e.target.value)}
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-shadow"
            placeholder="Ex: R$ 18,90"
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <button
              type="button"
              onClick={generateDescription}
              disabled={generating || !form.name}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title={
                form.name
                  ? 'Gerar descrição com IA'
                  : 'Preencha o nome do produto primeiro'
              }
            >
              {generating ? (
                <>
                  <svg
                    className="h-3.5 w-3.5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Gerando...
                </>
              ) : (
                <>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  Gerar com IA
                </>
              )}
            </button>
          </div>
          <textarea
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            required
            rows={10}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-shadow resize-none"
            placeholder="Descrição detalhada do produto..."
          />
        </div>

        {/* Supplier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Fornecedor
          </label>
          <input
            type="text"
            value={form.supplier}
            onChange={(e) => updateField('supplier', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-shadow"
            placeholder="Opcional"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={(e) => updateField('featured', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <label
            htmlFor="featured"
            className="text-sm font-medium text-gray-700"
          >
            Produto em destaque
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Imagem do Produto
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mb-3 h-40 w-full rounded-lg object-cover bg-gray-100"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
          />
          {mode === 'edit' && !imageFile && (
            <p className="mt-1 text-xs text-gray-400">
              Deixe em branco para manter a imagem atual.
            </p>
          )}
        </div>

        {/* Specs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Especificações Técnicas
            </label>
            <button
              type="button"
              onClick={addSpec}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              + Adicionar
            </button>
          </div>
          <div className="space-y-2">
            {form.specs.map((spec, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => updateSpec(i, 'key', e.target.value)}
                  placeholder="Chave (ex: Material)"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, 'value', e.target.value)}
                  placeholder="Valor (ex: Aço Inox)"
                  className="flex-[2] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(i)}
                  className="shrink-0 rounded-lg p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Remover especificação"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
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
              ? 'Criar Produto'
              : 'Salvar Alterações'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/produtos')}
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
