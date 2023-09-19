import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import { ReactNode } from 'react';

interface ReactQueryProviderProps {
    children: ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, 
      },
    },
  })

function ReactQueryProvider({ children }: ReactQueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider
