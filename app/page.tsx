'use client';

import { useState, useEffect } from 'react';
import { ItemInventario } from '@/types/inventario';

const TIPOS = ['Computador', 'Notebook', 'Monitor', 'Mouse', 'Teclado', 'Impressora'];
const SETORES = ['RH', 'Comercial', 'TI', 'Financeiro', 'Diretoria'];

const emptyForm = { tipo: '', modeloMarca: '', colaborador: '', setor: '' };

export default function Home() {
  const [items, setItems] = useState<ItemInventario[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function fetchItems() {
    const res = await fetch('/api/inventario');
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.tipo || !form.modeloMarca || !form.colaborador || !form.setor) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/inventario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erro ao salvar');
      setForm(emptyForm);
      setSuccess(true);
      await fetchItems();
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Erro ao cadastrar item. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header style={{ backgroundColor: '#1e3a5f' }} className="text-white shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Inventário de TI</h1>
          <p className="text-blue-200 text-sm mt-0.5">Gestão de ativos de hardware</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Formulário */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Cadastrar Equipamento</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={form.tipo}
                onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modelo / Marca</label>
              <input
                type="text"
                value={form.modeloMarca}
                onChange={e => setForm(f => ({ ...f, modeloMarca: e.target.value }))}
                placeholder="Ex: Dell Latitude 5420"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colaborador</label>
              <input
                type="text"
                value={form.colaborador}
                onChange={e => setForm(f => ({ ...f, colaborador: e.target.value }))}
                placeholder="Nome do colaborador"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
              <select
                value={form.setor}
                onChange={e => setForm(f => ({ ...f, setor: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                {SETORES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2 flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-medium px-6 py-2 rounded-lg text-sm transition-colors"
              >
                {loading ? 'Salvando...' : 'Cadastrar'}
              </button>
              {success && (
                <span className="text-green-600 text-sm font-medium">Item cadastrado com sucesso!</span>
              )}
              {error && (
                <span className="text-red-600 text-sm">{error}</span>
              )}
            </div>
          </form>
        </section>

        {/* Tabela */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Equipamentos Cadastrados
              <span className="ml-2 text-sm font-normal text-gray-500">({items.length})</span>
            </h2>
          </div>
          {items.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400 text-sm">
              Nenhum equipamento cadastrado ainda.
            </div>
          ) : (
            <>
              {/* Cards — mobile only */}
              <div className="block sm:hidden divide-y divide-gray-100">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-white px-4 py-3"
                    style={{ borderLeft: '4px solid #1e3a5f' }}
                  >
                    <p className="text-sm font-semibold text-gray-800">
                      #{item.id} · {item.tipo}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{item.modeloMarca}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-700">{item.colaborador}</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {item.setor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabela — desktop only */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: '#1e3a5f' }} className="text-white uppercase text-xs tracking-wider">
                      <th className="px-6 py-3 text-left">ID</th>
                      <th className="px-6 py-3 text-left">Tipo</th>
                      <th className="px-6 py-3 text-left">Modelo / Marca</th>
                      <th className="px-6 py-3 text-left">Colaborador</th>
                      <th className="px-6 py-3 text-left">Setor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                        <td className="px-6 py-3 text-gray-500 font-mono">#{item.id}</td>
                        <td className="px-6 py-3 text-gray-800">{item.tipo}</td>
                        <td className="px-6 py-3 text-gray-800">{item.modeloMarca}</td>
                        <td className="px-6 py-3 text-gray-800">{item.colaborador}</td>
                        <td className="px-6 py-3">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            {item.setor}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
