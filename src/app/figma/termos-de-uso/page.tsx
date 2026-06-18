import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso do Guia de Suprimentos para Restaurantes.',
};

export default function FigmaTermosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-[rgba(0,0,0,0.5)]">
        <Link href="/figma" className="hover:text-[#db4444] transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-[#2f2e30]">Termos de Uso</span>
      </nav>

      <h1 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
        Termos de Uso
      </h1>
      <p className="mt-3 text-sm text-[rgba(0,0,0,0.5)]">
        Última atualização: Junho de 2026
      </p>

      <div className="mt-8 space-y-8 leading-relaxed text-[rgba(0,0,0,0.6)]">
        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
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
          <h2 className="text-xl font-semibold text-[#2f2e30]">
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
          <h2 className="text-xl font-semibold text-[#2f2e30]">
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
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            4. Propriedade Intelectual
          </h2>
          <p className="mt-2">
            Todo o conteúdo textual, gráfico e estrutural do Site é de nossa
            propriedade ou licenciado para uso. A reprodução, distribuição ou
            modificação do conteúdo sem autorização prévia é proibida.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            5. Links para Terceiros
          </h2>
          <p className="mt-2">
            O Site pode conter links para sites de terceiros. Não temos controle
            sobre o conteúdo desses sites e não nos responsabilizamos por suas
            práticas ou políticas. A inclusão de links não implica endosso.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            6. Limitação de Responsabilidade
          </h2>
          <p className="mt-2">
            O Site e seus mantenedores não serão responsáveis por quaisquer
            danos diretos, indiretos, incidentais ou consequenciais decorrentes
            do uso ou incapacidade de uso do Site ou de seu conteúdo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            7. Alterações nos Termos
          </h2>
          <p className="mt-2">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
            momento. As alterações entram em vigor imediatamente após a
            publicação no Site. Recomendamos que você revise esta página
            periodicamente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">
            8. Lei Aplicável
          </h2>
          <p className="mt-2">
            Estes Termos de Uso são regidos pelas leis da República Federativa
            do Brasil. Fica eleito o foro da comarca da capital do estado de
            domicílio do mantenedor do Site para dirimir quaisquer dúvidas ou
            questões decorrentes destes Termos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2f2e30]">9. Contato</h2>
          <p className="mt-2">
            Para dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail{' '}
            <a
              href="mailto:contato@guiadesuprimentos.com.br"
              className="text-[#db4444] hover:text-[#e07575] underline transition-colors"
            >
              contato@guiadesuprimentos.com.br
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
