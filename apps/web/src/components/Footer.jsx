import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, QrCode } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <img src="https://horizons-cdn.hostinger.com/1555d768-251d-4f3b-be83-c9a43827ab1f/12daf9fa532b69d56449428dec2c9137.png" alt="Logo Kupi Beunghar" className="w-11 h-11 rounded-full object-cover" />
            <span className="font-display text-xl font-semibold">Kupi Beunghar</span>
          </div>
          <p className="text-primary-foreground/75 text-sm leading-relaxed max-w-xs">
            Ngopi geura, beunghar rasa beunghar carita. Kopi Nusantara pilihan dan kue artisan yang dipanggang tiap pagi.
          </p>
        </div>

        <div>
          <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-widest text-primary-foreground/60">Jelajahi</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-accent transition-colors">Beranda</Link></li>
            <li><Link to="/#katalog" className="hover:text-accent transition-colors">Katalog Kopi &amp; Kue</Link></li>
            <li><Link to="/#cerita" className="hover:text-accent transition-colors">Cerita Kami</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-widest text-primary-foreground/60">Kedai Kami</h3>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2.5"><MapPin size={15} className="shrink-0" /> Batam, Kepulauan Riau</li>
            <li className="flex items-center gap-2.5"><Clock size={15} className="shrink-0" /> Setiap hari, 07.00 – 21.00 WIB</li>
            <li className="flex items-center gap-2.5"><QrCode size={15} className="shrink-0" /> Pembayaran mudah via QRIS</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 text-xs text-primary-foreground/60 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Kupi Beunghar. Seluruh hak cipta dilindungi.</span>
          <span>Disangrai &amp; dipanggang dengan cinta di Batam.</span>
        </div>
      </div>
    </footer>;
};
export default Footer;