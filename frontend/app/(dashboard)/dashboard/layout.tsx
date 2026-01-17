import DashboardLayout from "@/components/layouts/dashboard-layout";
import { AuthProvider } from "@/contexts/useAuth";
import SocketProvider from "../../providers/socket-provider";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ThemeProvider } from "../../providers/theme-provider";
import "./admin.global.css";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DashboardLayout>
          <SocketProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </SocketProvider>
        </DashboardLayout>
      </AuthProvider>
    </ThemeProvider>
  );

}
