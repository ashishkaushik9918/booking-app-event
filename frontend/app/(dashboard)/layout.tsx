import DashboardLayout from "@/components/layouts/dashboard-layout";
import { AuthProvider } from "@/contexts/useAuth";
import SocketProvider from "../providers/socket-provider";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardLayout>
        <SocketProvider>
          {children}
        </SocketProvider>
      </DashboardLayout>
    </AuthProvider>
  );

}
