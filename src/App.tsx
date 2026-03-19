/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Deals from './pages/Deals';
import Locations from './pages/Locations';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { motion, AnimatePresence } from 'motion/react';
import { auth, onAuthStateChanged, db, doc, getDoc } from './firebase';

// Error Boundary
interface Props { children: ReactNode; }
interface State { hasError: boolean; error: any; }
class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };
  public static getDerivedStateFromError(error: any): State { return { hasError: true, error }; }
  public componentDidCatch(error: any, errorInfo: ErrorInfo) { console.error("Uncaught error:", error, errorInfo); }
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bk-cream p-8 text-center">
          <div className="max-w-md bg-white p-12 rounded-[3rem] shadow-xl border border-bk-charcoal/5">
            <h2 className="font-display text-4xl uppercase mb-4 text-bk-red">Something went wrong</h2>
            <p className="text-bk-charcoal/60 mb-8">We encountered an error. Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="bg-bk-charcoal text-white px-8 py-3 rounded-xl font-bold uppercase">Refresh Page</button>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-8 p-4 bg-bk-cream rounded-xl text-left text-xs overflow-auto max-h-40">
                {JSON.stringify(this.state.error, null, 2)}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

// Protected Route
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const userSnap = await getDoc(doc(db, 'users', u.uid));
        if (userSnap.exists() && userSnap.data().role === 'admin') {
          setIsAdmin(true);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-bk-cream font-display text-4xl uppercase">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" />;
  return <>{children}</>;
};

// App Component
export default function App() {
  console.log("App rendering...");
  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
                  <Route path="/order" element={<PageWrapper><Order /></PageWrapper>} />
                  <Route path="/deals" element={<PageWrapper><Deals /></PageWrapper>} />
                  <Route path="/locations" element={<PageWrapper><Locations /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  );
}


