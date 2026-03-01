import { QueryClientProvider,type QueryClient } from "@tanstack/react-query"

export default function TanstackQueryProvider({ children, queryClient }: { children: React.ReactNode, queryClient: QueryClient }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}