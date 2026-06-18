import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Política de Privacidade do Guia de Suprimentos para Restaurantes. Saiba como seus dados são tratados, incluindo cookies e anúncios do Google AdSense.',
};

export default function FigmaPrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-[rgba(0,0,0,0.5)]">
        <Link href="/figma" className="hover:text-[#db4444] transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-[#2f2e30]">
          Política de Privacidade
        </span>
      </nav>

      <h1 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
        Política de Privacidade
      </h1>
      <p className="mt-3 text-sm text-[rgba(0,0,0,0.5)]">
        Última atualização: Junho de 2026
      </p>

      <div className="mt-8 space-y-8 leading-relaxed text-[rgba(0,0,0,0.6)]">
        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            1. Introdução
          </h2>
          <p className="mt-2">
            Esta Política de Privacidade descreve como o Guia de Suprimentos
            para Restaurantes (&ldquo;Site&rdquo;, &ldquo;nós&rdquo;,
            &ldquo;nosso&rdquo;) coleta, usa e protege as informações dos
            visitantes. Respeitamos sua privacidade e estamos comprometidos com
            a transparência no tratamento de dados, em conformidade com a Lei
            Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            2. Informações que Coletamos
          </h2>

          <h3 className="mt-4 text-lg font-medium text-[#2f2e30]">
            2.1 Dados de Navegação (Automáticos)
          </h3>
          <p className="mt-1">
            Quando você visita o Site, algumas informações são coletadas
            automaticamente, incluindo:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Endereço IP (anonimizado)</li>
            <li>Tipo de navegador e sistema operacional</li>
            <li>Páginas visitadas e tempo de permanência</li>
            <li>Site de origem (referrer)</li>
            <li>Dados de interação com anúncios</li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-[#2f2e30]">
            2.2 Dados Fornecidos Voluntariamente
          </h3>
          <p className="mt-1">
            Quando você preenche o formulário de contato, coletamos:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Nome</li>
            <li>Endereço de e-mail</li>
            <li>Mensagem enviada</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            3. Cookies e Tecnologias Semelhantes
          </h2>
          <p className="mt-2">
            Utilizamos cookies e tecnologias semelhantes para melhorar a
            experiência de navegação e exibir anúncios relevantes. Cookies são
            pequenos arquivos de texto armazenados no seu dispositivo.
          </p>

          <h3 className="mt-4 text-lg font-medium text-[#2f2e30]">
            3.1 Tipos de Cookies Utilizados
          </h3>
          <ul className="mt-2 list-disc pl-6 space-y-2">
            <li>
              <strong>Cookies essenciais:</strong> Necessários para o
              funcionamento básico do Site. Não podem ser desativados.
            </li>
            <li>
              <strong>Cookies de publicidade (Google AdSense):</strong> O Google
              AdSense utiliza cookies para exibir anúncios baseados em suas
              visitas anteriores ao Site e a outros sites. Esses cookies
              permitem que o Google e seus parceiros exibam anúncios
              personalizados com base no seu histórico de navegação.
            </li>
            <li>
              <strong>Cookies de análise:</strong> Utilizados para entender como
              os visitantes interagem com o Site (páginas mais acessadas, tempo
              de permanência, etc.).
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-[#2f2e30]">
            3.2 Como Gerenciar Cookies
          </h3>
          <p className="mt-1">
            Você pode gerenciar ou desabilitar cookies nas configurações do seu
            navegador. No entanto, isso pode afetar a funcionalidade do Site.
            Para desativar a publicidade personalizada do Google, visite{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#db4444] hover:text-[#e07575] underline transition-colors"
            >
              Configurações de Anúncios do Google
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            4. Como Usamos as Informações
          </h2>
          <p className="mt-2">As informações coletadas são utilizadas para:</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Melhorar o conteúdo e a experiência do Site</li>
            <li>Responder às mensagens enviadas pelo formulário de contato</li>
            <li>Exibir anúncios relevantes (Google AdSense)</li>
            <li>Analisar o tráfego e o comportamento dos visitantes</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            5. Compartilhamento de Dados
          </h2>
          <p className="mt-2">
            Não vendemos, alugamos ou compartilhamos suas informações pessoais
            com terceiros, exceto:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>Google AdSense:</strong> Para exibição de anúncios
              personalizados. O Google pode usar os dados conforme sua própria
              política de privacidade.
            </li>
            <li>
              <strong>Obrigações legais:</strong> Quando exigido por lei ou
              autoridades competentes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            6. Seus Direitos (LGPD)
          </h2>
          <p className="mt-2">De acordo com a LGPD, você tem direito a:</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Confirmar a existência de tratamento de dados</li>
            <li>Acessar seus dados</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão de dados</li>
            <li>Revogar o consentimento</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">7. Contato</h2>
          <p className="mt-2">
            Para exercer seus direitos ou esclarecer dúvidas sobre esta
            Política, entre em contato pelo e-mail{' '}
            <a
              href="mailto:privacidade@guiadesuprimentos.com.br"
              className="text-[#db4444] hover:text-[#e07575] underline transition-colors"
            >
              privacidade@guiadesuprimentos.com.br
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
