import DashboardLayout from "@/components/layouts/dashboard-layout";
import { AuthProvider } from "@/contexts/useAuth";
import SocketProvider from "@/app/providers/socket-provider";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ThemeProvider } from "@/app/providers/theme-provider";
import ReduxProvider from "@/app/providers/redux-provider";
import "./admin.global.css";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
    <ThemeProvider>
      <AuthProvider>
        <DashboardLayout>
          <SocketProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </SocketProvider>
        </DashboardLayout>
      </AuthProvider>
    </ThemeProvider >
      </ReduxProvider>
  );

}
