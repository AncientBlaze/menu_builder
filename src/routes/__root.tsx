import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/QueryClient";
import Header from '@/components/Header';
import { useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { isAuthenticated } from '@/utils/auth-guard';
import { Toaster } from 'react-hot-toast';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Menu Builder',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Merriweather:wght@400;700&family=Lora:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Source+Serif+4:wght@400;600;700&family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&family=Nunito:wght@400;600;700&family=Raleway:wght@400;600;700&family=Oswald:wght@400;500;600&family=DM+Sans:wght@400;500;700&family=Archivo:wght@400;500;600;700&display=swap"
      }
    ],
  }),
  shellComponent: RootDocument,
  ssr: false
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isPublicRoute = ['/Landing', '/Login', '/Signup'].includes(location.pathname) || location.pathname.startsWith('/menu/');

  useEffect(() => {
    if (location.pathname === '/' && !isAuthenticated()) {
      navigate({ to: '/Landing', replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Toaster position="top-right" reverseOrder={false} />
        {isPublicRoute ? null : <Header/>}
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
