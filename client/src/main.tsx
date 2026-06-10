import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext.tsx'
import theme from './theme.ts'
import { ModalsProvider } from './context/ModalsContext.tsx'


const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found in index.html')
}

createRoot(rootElement).render(
    /* User data distribution */
    <AuthProvider>
        <BrowserRouter>
            {/* Dark theme distribution */}
            <ChakraProvider theme={theme}> 
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <ModalsProvider>
                    <App />
                </ModalsProvider>
            </ChakraProvider>
        </BrowserRouter>
    </AuthProvider>
)