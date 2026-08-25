import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Pesanan Berhasil — Kupi Beunghar</title>
        <meta name="description" content="Terima kasih! Pesananmu di Kupi Beunghar telah kami terima dan sedang disiapkan." />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-3xl p-10 sm:p-14 shadow-sm"
        >
          <span className="mx-auto w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
            <CheckCircle2 size={44} />
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-3">Pesananmu Berhasil!</h1>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
            Hatur nuhun! Pesananmu sudah kami terima dan sedang disiapkan. Biji kopi akan disangrai dan kue dipanggang fresh untukmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 px-6">
              <Link to="/#katalog">
                <Coffee className="mr-2 h-4 w-4" /> Belanja Lagi
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl h-11 px-6 border-border">
              <Link to="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessPage;
