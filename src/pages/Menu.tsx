import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Flame, Info } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../constants';
import { useCart } from '../CartContext';
import { cn } from '../lib/utils';
import { db, collection, onSnapshot, OperationType, handleFirestoreError } from '../firebase';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const { addToCart, totalItems, totalPrice } = useCart();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'menuItems'), (snapshot) => {
      if (!snapshot.empty) {
        setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem)));
      }
    }, (err) => handleFirestoreError(err, OperationType.GET, 'menuItems'));
    return () => unsub();
  }, []);

  const categories = ['All', 'Burgers', 'Chicken', 'Sides', 'Drinks', 'Desserts', 'Vegan', 'Kids'];

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="bg-bk-red text-bk-cream py-16 px-4 md:px-8 text-center">
        <h1 className="font-display text-6xl md:text-8xl uppercase mb-4">The BK Menu</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto font-medium">
          Flame-grilled beef, crispy chicken, and sides that steal the show.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-[73px] z-40 bg-bk-cream border-b border-bk-charcoal/10 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full font-display text-lg uppercase tracking-wider transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-bk-red text-white shadow-md" 
                    : "bg-white text-bk-charcoal hover:bg-bk-charcoal/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bk-charcoal/40" size={20} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-bk-charcoal/10 outline-none focus:border-bk-red transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-bk-charcoal/5 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {item.popular && (
                    <div className="absolute top-4 left-4 bg-bk-gold text-bk-charcoal px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 shadow-md">
                      <Flame size={12} fill="currentColor" /> Popular
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-2xl uppercase leading-tight">{item.name}</h3>
                    <button className="text-bk-charcoal/30 hover:text-bk-red transition-colors">
                      <Info size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-bk-charcoal/50 mb-4">{item.calories} Cal</p>
                  <p className="text-sm text-bk-charcoal/70 mb-6 line-clamp-2 flex-1">{item.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-display text-2xl text-bk-red">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-bk-charcoal text-white px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-bk-red transition-colors active:scale-95"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24">
            <h3 className="font-display text-3xl uppercase mb-4">No items found</h3>
            <p className="text-bk-charcoal/50">Try searching for something else or change the category.</p>
          </div>
        )}
      </div>

      {/* Sticky Cart Button */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
        >
          <button
            onClick={() => window.location.href = '/order'}
            className="w-full bg-bk-charcoal text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between hover:bg-bk-red transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-bk-gold text-bk-charcoal w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </div>
              <div className="text-left">
                <p className="font-display text-xl uppercase leading-none">View Order</p>
                <p className="text-xs opacity-60">Ready to flame-grill?</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-2xl">${totalPrice.toFixed(2)}</span>
              <ShoppingBag className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Menu;
