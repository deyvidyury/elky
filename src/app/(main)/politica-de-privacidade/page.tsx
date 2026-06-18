import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Política de Privacidade do Guia de Suprimentos para Restaurantes. Saiba como seus dados são tratados, incluindo cookies e anúncios do Google AdSense.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Início', href: '/' },
          { label: 'Política de Privacidade', href: '#' },
        ]}
      />

      <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
        Política de Privacidade
      </h1>
      <p className="mt-3 text-sm text-gray-500">
        Última atualização: Junho de 2026
      </p>

      <div className="mt-8 space-y-8 leading-relaxed text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">1. Introdução</h2>
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
          <h2 className="text-xl font-semibold text-gray-900">
            2. Informações que Coletamos
          </h2>

          <h3 className="mt-4 text-lg font-medium text-gray-800">
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

          <h3 className="mt-4 text-lg font-medium text-gray-800">
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
          <h2 className="text-xl font-semibold text-gray-900">
            3. Cookies e Tecnologias Semelhantes
          </h2>
          <p className="mt-2">
            Utilizamos cookies e tecnologias semelhantes para melhorar a
            experiência de navegação e exibir anúncios relevantes. Cookies são
            pequenos arquivos de texto armazenados no seu dispositivo.
          </p>

          <h3 className="mt-4 text-lg font-medium text-gray-800">
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
              de visita, etc.).
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-gray-800">
            3.2 Como Gerenciar Cookies
          </h3>
          <p className="mt-1">
            Você pode gerenciar ou desabilitar cookies nas configurações do seu
            navegador. No entanto, a desativação de cookies pode afetar a
            funcionalidade do Site. Para mais informações sobre como gerenciar
            cookies, visite{' '}
            <a
              href="https://www.aboutcookies.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 underline"
            >
              aboutcookies.org
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            4. Google AdSense
          </h2>
          <p className="mt-2">
            Este Site utiliza o Google AdSense para exibir anúncios. O Google
            AdSense é um serviço de publicidade fornecido pelo Google LLC.
          </p>

          <h3 className="mt-4 text-lg font-medium text-gray-800">
            4.1 Como Funciona
          </h3>
          <ul className="mt-2 list-disc pl-6 space-y-2">
            <li>
              O Google utiliza cookies (como o cookie DART) para exibir anúncios
              baseados nas visitas dos usuários ao Site e a outros sites na
              Internet.
            </li>
            <li>
              Os usuários podem desativar o cookie DART acessando a{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-700 underline"
              >
                Política de Privacidade da Rede de Conteúdo e Anúncios do Google
              </a>
              .
            </li>
            <li>
              Fornecedores terceiros, incluindo o Google, utilizam cookies para
              exibir anúncios com base em visitas anteriores do usuário.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-medium text-gray-800">
            4.2 Personalização de Anúncios
          </h3>
          <p className="mt-1">
            Você pode desativar a personalização de anúncios do Google acessando
            as{' '}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 underline"
            >
              Configurações de Anúncios do Google
            </a>
            . Alternativamente, você pode visitar{' '}
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 underline"
            >
              aboutads.info
            </a>{' '}
            para desativar cookies de publicidade de diversos fornecedores.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            5. Uso das Informações
          </h2>
          <p className="mt-2">As informações coletadas são utilizadas para:</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Exibir e otimizar anúncios do Google AdSense</li>
            <li>
              Analisar o tráfego do Site para melhorar o conteúdo e a
              experiência do usuário
            </li>
            <li>Responder a mensagens enviadas pelo formulário de contato</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            6. Compartilhamento de Dados
          </h2>
          <p className="mt-2">
            Não vendemos, trocamos ou transferimos suas informações pessoais
            para terceiros não afiliados. Os dados podem ser compartilhados com:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>Google LLC:</strong> Para exibição de anúncios
              personalizados via Google AdSense
            </li>
            <li>
              <strong>Vercel Inc.:</strong> Para hospedagem do Site e coleta de
              métricas básicas de acesso
            </li>
            <li>
              <strong>Autoridades legais:</strong> Quando exigido por lei ou
              ordem judicial
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            7. Seus Direitos (LGPD)
          </h2>
          <p className="mt-2">
            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os
            seguintes direitos:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Confirmar a existência de tratamento de dados</li>
            <li>Acessar seus dados</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
            <li>Revogar consentimento a qualquer momento</li>
          </ul>
          <p className="mt-2">
            Para exercer seus direitos, entre em contato pela nossa{' '}
            <a
              href="/contato"
              className="text-brand-600 hover:text-brand-700 underline"
            >
              página de contato
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">8. Segurança</h2>
          <p className="mt-2">
            Adotamos medidas técnicas e organizacionais para proteger seus dados
            contra acessos não autorizados, perda ou alteração. No entanto,
            nenhum sistema é 100% seguro, e não podemos garantir segurança
            absoluta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            9. Alterações nesta Política
          </h2>
          <p className="mt-2">
            Podemos atualizar esta Política de Privacidade periodicamente. A
            data da última atualização é indicada no topo da página.
            Recomendamos revisar esta página regularmente para se manter
            informado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">10. Contato</h2>
          <p className="mt-2">
            Dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos
            seus dados?{' '}
            <a
              href="/contato"
              className="text-brand-600 hover:text-brand-700 underline"
            >
              Entre em contato conosco
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
