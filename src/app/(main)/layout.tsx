import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { createInsForgeServerClient } from '@/lib/insforge/server';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const insforge = await createInsForgeServerClient();
  const { data } = await insforge.auth.getCurrentUser();
  const serverUser = data?.user ?? null;

  return (
    <>
      <Header serverUser={serverUser} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
