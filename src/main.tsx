import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import { ThemeProvider } from 'styled-components';
import { theme } from "./theme.ts";
import { QueryClient ,QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
       <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
