import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LogIn, LogOut } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';

const Header = ({ onCartOpen }) => {
  const { cartItems } = useCart();
  const { isAuthed, user, logout } = useAuth();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="https://horizons-cdn.hostinger.com/1555d768-251d-4f3b-be83-c9a43827ab1f/12daf9fa532b69d56449428dec2c9137.png"
            alt="Logo Kupi Beunghar"
            className="w-11 h-11 rounded-full object-cover transition-transform group-hover:-rotate-6"
          />
          <span className="font-display text-xl font-semibold tracking-tight">
            Kupi Beunghar
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
          <Link to="/#katalog" className="hover:text-primary transition-colors">Katalog</Link>
          <Link to="/#cerita" className="hover:text-primary transition-colors">Cerita Kami</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthed ? (
            <button
              onClick={logout}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              title={user?.email || 'Akun'}
            >
              <LogOut size={16} /> Keluar
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <LogIn size={16} /> Masuk
            </Link>
          )}
          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 bg-primary text-primary-foreground rounded-full pl-4 pr-5 h-11 text-sm font-semibold shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all"
            aria-label="Buka keranjang belanja"
          >
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">Keranjang</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center border-2 border-background">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
