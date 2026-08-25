import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '@/hooks/useCart';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SuccessPage from './pages/SuccessPage';
import LoginPage from './pages/LoginPage';

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <AuthProvider>
        <CartProvider>
            <Router>
                <ScrollToTop />
                <div className="min-h-screen bg-background text-foreground flex flex-col">
                    <Header onCartOpen={() => setIsCartOpen(true)} />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/success" element={<SuccessPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
                <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                <Toaster />
            </Router>
        </CartProvider>
        </AuthProvider>
    );
}

export default App;
