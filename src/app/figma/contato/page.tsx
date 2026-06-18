'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

export default function FigmaContatoPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !assunto || !mensagem.trim()) return;
    setSubmitting(true);
    // Simulate submission — in production, replace with a server action or API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-figma-text-muted">
        <Link href="/figma" className="hover:text-figma-red transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-figma-dark">Contato</span>
      </nav>

      <h1 className="text-3xl lg:text-4xl font-semibold text-figma-dark tracking-[0.04em]">
        Contato
      </h1>
      <p className="mt-4 text-figma-text-muted">
        Tem alguma dúvida, sugestão ou interesse em anunciar? Fale conosco!
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Contact Form */}
        <section className="lg:col-span-3 rounded-[4px] border border-figma-border bg-white p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-figma-red/10 text-figma-red">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-figma-dark">
                {submitted ? 'Mensagem enviada!' : 'Envie uma mensagem'}
              </h2>
              <p className="text-sm text-figma-text-muted">
                {submitted
                  ? 'Obrigado pelo contato. Responderemos em breve.'
                  : 'Responderemos o mais rápido possível.'}
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-figma-green/20 text-figma-green">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-figma-text-muted text-center max-w-xs">
                Sua mensagem foi recebida com sucesso. Nossa equipe analisará e
                retornará o contato em até 48 horas úteis.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setNome('');
                  setEmail('');
                  setAssunto('');
                  setMensagem('');
                }}
                className="mt-2 rounded-[4px] border border-figma-border-strong hover:border-figma-red hover:text-figma-red text-figma-dark px-6 py-2.5 text-sm font-medium transition-colors"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-figma-dark"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1.5 block w-full rounded-[4px] border border-figma-border-strong px-4 py-3 text-figma-dark placeholder:text-figma-placeholder focus:border-figma-red focus:ring-2 focus:ring-figma-red/20 focus:outline-none transition-shadow"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-figma-dark"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 block w-full rounded-[4px] border border-figma-border-strong px-4 py-3 text-figma-dark placeholder:text-figma-placeholder focus:border-figma-red focus:ring-2 focus:ring-figma-red/20 focus:outline-none transition-shadow"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="assunto"
                  className="block text-sm font-medium text-figma-dark"
                >
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  required
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  className="mt-1.5 block w-full rounded-[4px] border border-figma-border-strong px-4 py-3 text-figma-dark focus:border-figma-red focus:ring-2 focus:ring-figma-red/20 focus:outline-none transition-shadow"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida sobre produtos</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="parceria">Parceria ou publicidade</option>
                  <option value="erro">Reportar erro</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-medium text-figma-dark"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  required
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="mt-1.5 block w-full rounded-[4px] border border-figma-border-strong px-4 py-3 text-figma-dark placeholder:text-figma-placeholder focus:border-figma-red focus:ring-2 focus:ring-figma-red/20 focus:outline-none transition-shadow resize-y"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-[4px] bg-figma-red hover:bg-figma-red-hover disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 text-sm font-medium transition-colors"
              >
                {submitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          )}
        </section>

        {/* Contact Info Sidebar */}
        <aside className="lg:col-span-2 space-y-6">
          <div className="rounded-[4px] border border-figma-border bg-white p-6">
            <h3 className="text-lg font-semibold text-figma-dark mb-4">
              Informações de Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-figma-red/10 text-figma-red">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-figma-dark">Telefone</p>
                  <p className="text-sm text-figma-text-muted">
                    (11) 3000-0000
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-figma-red/10 text-figma-red">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-figma-dark">E-mail</p>
                  <p className="text-sm text-figma-text-muted">
                    contato@guiadesuprimentos.com.br
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-figma-red/10 text-figma-red">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-figma-dark">
                    Horário de Atendimento
                  </p>
                  <p className="text-sm text-figma-text-muted">
                    Seg a Sex: 08h às 18h
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-[4px] bg-figma-dark p-6">
            <h3 className="text-lg font-semibold text-figma-dark-text mb-2">
              Anuncie Conosco
            </h3>
            <p className="text-sm text-figma-dark-muted">
              Alcance donos de restaurantes e profissionais do setor de
              alimentação. Entre em contato para saber mais sobre nossas opções
              de publicidade.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
