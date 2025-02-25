
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import  store  from './store/store.tsx'
import { Provider } from 'react-redux'

import { TransactionProvider } from "./ContextApi/TransacationProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <TransactionProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </TransactionProvider>
 
)
