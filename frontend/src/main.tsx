import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext'
import { SearchContextProvicer } from './contexts/SearchContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    }
  }
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvicer>
          <GoogleOAuthProvider clientId="310654600818-tg2a1vb1hsf1lpqkh51lfis6tu93cbpj.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </SearchContextProvicer>
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode >,
)
