import { redirect } from 'next/navigation';
import { createInsForgeServerClient } from '@/lib/insforge/server';
import { AdminSidebar } from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const insforge = await createInsForgeServerClient();
  const { data } = await insforge.auth.getCurrentUser();
  const user = data?.user ?? null;

  if (!user) {
    redirect('/sign-in');
  }

  const isAdmin = !!(
    user.metadata && (user.metadata as Record<string, unknown>).role === 'admin'
  );

  return (
    <AdminSidebar
      user={{
        email: user.email,
        profile: user.profile,
        metadata: user.metadata,
      }}
      isAdmin={isAdmin}
    >
      {children}
    </AdminSidebar>
  );
}
