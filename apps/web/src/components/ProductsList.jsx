import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2, Coffee } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { isAuthed } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const displayVariant = useMemo(() => product.variants?.[0], [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  const displayPrice = useMemo(() => hasSale ? displayVariant.sale_price_formatted : displayVariant?.price_formatted, [displayVariant, hasSale]);
  const originalPrice = useMemo(() => hasSale ? displayVariant.price_formatted : null, [displayVariant, hasSale]);

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.variants?.length) {
      return;
    }

    if (!isAuthed) {
      toast({
        title: 'Masuk dulu, yuk',
        description: 'Login dengan akun Google untuk menambahkan produk ke keranjang.',
      });
      navigate('/login', { state: { from: `/product/${product.id}` } });
      return;
    }

    if (product.variants.length > 1) {
      navigate(`/product/${product.id}`);
      return;
    }

    const defaultVariant = product.variants[0];

    try {
      await addToCart(product, defaultVariant, 1, defaultVariant.inventory_quantity);
      toast({
        title: "Masuk keranjang",
        description: `${product.title} berhasil ditambahkan.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menambahkan",
        description: error.message,
      });
    }
  }, [product, addToCart, toast, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
          <div className="relative overflow-hidden">
            <img
              src={product.image || placeholderImage}
              alt={product.title}
              className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.ribbon_text && (
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {product.ribbon_text}
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg font-semibold leading-snug line-clamp-2">{product.title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5 h-10 overflow-hidden">{product.subtitle || 'Pilihan favorit dari dapur Kupi Beunghar.'}</p>
            <div className="flex items-baseline gap-2 mt-3">
              {hasSale && (
                <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
              )}
              <span className="text-xl font-bold text-primary">{displayPrice}</span>
            </div>
            <Button onClick={handleAddToCart} className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-11 active:scale-[0.98]">
              <ShoppingCart className="mr-2 h-4 w-4" /> Tambah ke Keranjang
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsWithQuantities = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsResponse = await getProducts();

        if (productsResponse.products.length === 0) {
          setProducts([]);
          return;
        }

        const productIds = productsResponse.products.map(product => product.id);

        const quantitiesResponse = await getProductQuantities({
          fields: 'inventory_quantity',
          product_ids: productIds
        });

        const variantQuantityMap = new Map();
        quantitiesResponse.variants.forEach(variant => {
          variantQuantityMap.set(variant.id, variant.inventory_quantity);
        });

        const productsWithQuantities = productsResponse.products.map(product => ({
          ...product,
          variants: product.variants.map(variant => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
          }))
        }));

        setProducts(productsWithQuantities);
      } catch (err) {
        setError(err.message || 'Gagal memuat produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsWithQuantities();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3 text-muted-foreground">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-sm">Menyeduh katalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive p-8 bg-card rounded-2xl border border-border">
        <p>Gagal memuat produk: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-12 bg-card rounded-2xl border border-border flex flex-col items-center gap-3">
        <Coffee size={40} className="text-primary/50" />
        <p>Katalog belum tersedia saat ini. Silakan kembali lagi nanti.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductsList;
