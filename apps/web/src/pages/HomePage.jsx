import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Croissant, QrCode, Flame } from 'lucide-react';
import Reveal from '@/components/Reveal';
import ProductsList from '@/components/ProductsList';
const HERO_IMAGE = 'https://images.hostinger.com/c616d1ee-715d-40b6-b85d-664c4ac9b118.png';
const STORY_IMAGE = 'https://images.hostinger.com/577df374-b4cb-481a-8587-694f05a67f48.png';
const marqueeItems = ['Kopi Nusantara Pilihan', 'Dipanggang Tiap Pagi', 'Beunghar Rasa', 'Beunghar Carita', 'Bayar Mudah via QRIS', 'Disangrai Fresh'];
const highlights = [{
  icon: Flame,
  title: 'Disangrai Fresh',
  text: 'Biji kopi Nusantara disangrai dalam batch kecil agar aroma dan karakternya terjaga.'
}, {
  icon: Croissant,
  title: 'Kue Artisan Tiap Pagi',
  text: 'Croissant, brownies, dan bolu keluar dari oven setiap pagi — hangat saat sampai di mejamu.'
}, {
  icon: QrCode,
  title: 'Bayar Sekali Scan',
  text: 'Checkout cepat dengan QRIS dan metode pembayaran lainnya. Pesan dari mana saja.'
}];
const HomePage = () => {
  return <>
      <Helmet>
        <title>Kupi Beunghar — Kopi Nusantara &amp; Kue Artisan</title>
        <meta name="description" content="Kupi Beunghar mempersembahkan kopi Nusantara pilihan dan kue artisan yang dipanggang tiap pagi. Ngopi geura, beunghar rasa beunghar carita. Pesan online, bayar via QRIS." />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100dvh-4rem)]">
          <div>
            <motion.p initial={{
            opacity: 0,
            y: 16
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary bg-accent/60 border border-primary/15 rounded-full px-4 py-2 mb-6"><Coffee size={14} /> warung Kopi &amp; Kue Artisan — batam</motion.p>
            <motion.h1 initial={{
            opacity: 0,
            y: 24
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight">
              Ngopi geura,{' '}
              <span className="relative inline-block text-primary">
                beunghar rasa
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 220 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 9C60 3 160 3 217 8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-accent" />
                </svg>
              </span>{' '}
              beunghar carita.
            </motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 24
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Kupi Beunghar mempersembahkan kopi Nusantara pilihan dan kue artisan yang dipanggang tiap pagi. Rasakan kekayaan setiap seduhan dan setiap suapan.
            </motion.p>
            <motion.div initial={{
            opacity: 0,
            y: 24
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/#katalog" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold rounded-full px-8 h-13 py-4 text-base shadow-md hover:bg-primary/90 active:scale-[0.98] transition-all">
                Lihat Katalog <ArrowRight size={18} />
              </Link>
              <Link to="/#cerita" className="inline-flex items-center justify-center gap-2 border border-primary/30 text-primary font-semibold rounded-full px-8 h-13 py-4 text-base hover:bg-accent/50 active:scale-[0.98] transition-all">
                Cerita Kami
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{
          opacity: 0,
          scale: 0.94,
          rotate: 2
        }} animate={{
          opacity: 1,
          scale: 1,
          rotate: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} className="relative">
            <div className="absolute -inset-4 bg-accent/50 rounded-[2rem] rotate-2" aria-hidden="true" />
            <img src={HERO_IMAGE} alt="Secangkir kopi Kupi Beunghar dengan croissant dan brownies di atas meja kayu" className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px] object-cover rounded-[2rem] shadow-2xl" />
            <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-card border border-border rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <QrCode size={20} />
              </span>
              <div>
                <p className="text-sm font-bold">Pesan online</p>
                <p className="text-xs text-muted-foreground">Bayar langsung via QRIS</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-primary text-primary-foreground py-3.5 overflow-hidden" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...marqueeItems, ...marqueeItems].map((item, i) => <span key={i} className="flex items-center gap-6 px-6 text-sm font-semibold uppercase tracking-[0.18em]">
              {item} <Coffee size={14} className="opacity-60" />
            </span>)}
        </div>
      </div>

      {/* Cerita */}
      <section id="cerita" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative order-2 lg:order-1">
              <img src={STORY_IMAGE} alt="Barista Kupi Beunghar menyeduh kopi manual brew dengan teknik pour-over" className="w-full h-[320px] sm:h-[420px] object-cover rounded-[2rem] shadow-xl" />
              <div className="absolute -top-4 -right-3 sm:-right-5 bg-primary text-primary-foreground rounded-2xl shadow-lg px-5 py-3 rotate-3">
                <p className="font-display font-semibold text-sm">Seduhan penuh carita</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Cerita Kami</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-5">
              Dari biji pilihan Nusantara, lahir secangkir cerita.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kami berkeliling dari Gayo sampai Kintamani untuk memilih biji terbaik langsung dari petani. Setiap batch disangrai pelan, diseduh dengan sabar, dan disajikan hangat.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ditemani kue artisan yang keluar dari oven tiap pagi, setiap kunjungan ke Kupi Beunghar adalah undangan untuk berlama-lama — karena di sini, rasa yang kaya selalu membawa cerita yang kaya.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-secondary/60 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-3 gap-8">
          {highlights.map((item, i) => <Reveal key={item.title} delay={i * 0.1}>
              <div className="flex flex-col items-start gap-3">
                <span className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                  <item.icon size={22} />
                </span>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </Reveal>)}
        </div>
      </section>

      {/* Katalog */}
      <section id="katalog" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <Reveal className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Katalog</p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight">
            Kopi &amp; kue, siap dipesan.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Pilih favoritmu, masukkan ke keranjang, lalu bayar langsung via QRIS. Semudah menyeruput kopi pagi.
          </p>
        </Reveal>
        <ProductsList />
      </section>
    </>;
};
export default HomePage;