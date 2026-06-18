import { FigmaHeader } from '@/components/FigmaHeader';
import { FigmaFooter } from '@/components/FigmaFooter';
import { createInsForgeServerClient } from '@/lib/insforge/server';

export default async function FigmaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const insforge = await createInsForgeServerClient();
  const { data } = await insforge.auth.getCurrentUser();
  const serverUser = data?.user ?? null;

  return (
    <>
      <FigmaHeader serverUser={serverUser} />
      <main className="flex-1">{children}</main>
      <FigmaFooter />
    </>
  );
}
