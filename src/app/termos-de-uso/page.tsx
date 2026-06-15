import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso do Guia de Suprimentos para Restaurantes.',
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Início', href: '/' },
          { label: 'Termos de Uso', href: '#' },
        ]}
      />

      <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
        Termos de Uso
      </h1>
      <p className="mt-3 text-sm text-gray-500">
        Última atualização: Junho de 2026
      </p>

      <div className="mt-8 space-y-8 leading-relaxed text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            1. Aceitação dos Termos
          </h2>
          <p className="mt-2">
            Ao acessar e utilizar o Guia de Suprimentos para Restaurantes
            (&ldquo;Site&rdquo;), você concorda em cumprir estes Termos de Uso.
            Se você não concordar com qualquer parte destes termos, recomendamos
            que não utilize o Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            2. Natureza do Conteúdo
          </h2>
          <p className="mt-2">
            O Site é um portal informativo que apresenta produtos, equipamentos
            e suprimentos para restaurantes. Todo o conteúdo é fornecido
            exclusivamente para fins informativos. O Site <strong>não</strong> é
            uma loja virtual e <strong>não</strong> realiza vendas diretas de
            produtos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            3. Precisão das Informações
          </h2>
          <p className="mt-2">
            Embora nos esforcemos para manter as informações precisas e
            atualizadas, não garantimos a exatidão, integridade ou atualidade do
            conteúdo. Preços, especificações e descrições podem variar.
            Recomendamos sempre verificar as informações diretamente com os
            fabricantes ou fornecedores antes de tomar decisões de compra.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            4. Propriedade Intelectual
          </h2>
          <p className="mt-2">
            Todo o conteúdo textual, gráfico e estrutural do Site é de nossa
            propriedade ou licenciado para uso. A reprodução, distribuição ou
            modificação do conteúdo sem autorização prévia é proibida.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            5. Links para Terceiros
          </h2>
          <p className="mt-2">
            O Site pode conter links para sites de terceiros. Não temos controle
            sobre o conteúdo desses sites e não nos responsabilizamos por suas
            práticas ou políticas. A inclusão de links não implica endosso.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            6. Limitação de Responsabilidade
          </h2>
          <p className="mt-2">
            O Site e seus mantenedores não serão responsáveis por quaisquer
            danos diretos, indiretos, incidentais ou consequenciais decorrentes
            do uso ou incapacidade de uso do Site ou de seu conteúdo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            7. Alterações nos Termos
          </h2>
          <p className="mt-2">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
            momento. As alterações entram em vigor imediatamente após a
            publicação. Recomendamos revisar esta página periodicamente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">8. Contato</h2>
          <p className="mt-2">
            Dúvidas sobre estes Termos de Uso? Entre em contato pela nossa{' '}
            <a
              href="/contato"
              className="text-brand-600 hover:text-brand-700 underline"
            >
              página de contato
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
