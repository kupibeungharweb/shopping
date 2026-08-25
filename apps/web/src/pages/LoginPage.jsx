import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, Loader2, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

const LoginPage = () => {
  const { loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || '/';

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast({ title: 'Berhasil masuk', description: 'Selamat datang di Kupi Beunghar!' });
      navigate(from, { replace: true });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Gagal masuk dengan Google',
        description: err?.message || 'Terjadi kendala saat masuk. Silakan coba lagi.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Masuk — Kupi Beunghar</title>
        <meta name="description" content="Masuk ke Kupi Beunghar dengan akun Google untuk mulai memesan kopi Nusantara dan kue artisan." />
      </Helmet>
      <section className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-card border border-border rounded-3xl shadow-xl p-8 sm:p-10"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <span className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Coffee size={26} />
            </span>
            <h1 className="font-display text-3xl font-semibold leading-tight">Masuk dulu, yuk</h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Untuk menambahkan produk ke keranjang, silakan masuk terlebih dahulu menggunakan akun Googlemu.
            </p>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 bg-white text-foreground border border-border font-semibold rounded-full h-13 py-3.5 text-base shadow-sm hover:bg-secondary/60 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <GoogleIcon size={20} />}
            {loading ? 'Memproses...' : 'Masuk dengan Google'}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <LogIn size={15} />
            <span>Login aman melalui Google.</span>
          </div>

          <Link to="/" className="mt-6 block text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Kembali ke Beranda
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default LoginPage;
