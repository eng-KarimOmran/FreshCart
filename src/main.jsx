import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserStatusProvider from './Components/Context/UserStatus.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContexeProvider from './Components/Context/CartFu.jsx'
import WishlistContexeProvider from './Components/Context/wishlistFu';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <UserStatusProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <CartContexeProvider>
        <WishlistContexeProvider>
          <App />
        </WishlistContexeProvider>
      </CartContexeProvider>
    </QueryClientProvider>
  </UserStatusProvider>
)
