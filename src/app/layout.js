import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '../components/StoreProvider';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LuminaCart - Premium E-Commerce',
  description: 'Shop the best products online with LuminaCart.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900 min-h-screen flex flex-col`}>
        <StoreProvider>
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          {/* Simple Footer */}
          <footer className="bg-white border-t border-gray-100 py-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} LuminaCart. All rights reserved.</p>
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
