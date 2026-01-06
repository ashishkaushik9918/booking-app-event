import DashboardLayout from "@/components/layouts/dashboard-layout";
import { AuthProvider } from "@/contexts/useAuth";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthProvider>
  );

}
