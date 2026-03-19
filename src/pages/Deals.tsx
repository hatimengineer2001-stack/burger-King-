import React, { useState, useEffect } from 'react';
import { DEALS } from '../constants';
import { motion } from 'motion/react';
import { Percent, Clock, Smartphone, Crown, Copy } from 'lucide-react';
import { db, collection, onSnapshot, OperationType, handleFirestoreError } from '../firebase';

const Deals = () => {
  const [deals, setDeals] = useState(DEALS);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'deals'), (snapshot) => {
      if (!snapshot.empty) {
        setDeals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)));
      }
    }, (err) => handleFirestoreError(err, OperationType.GET, 'deals'));
    return () => unsub();
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-bk-gold text-bk-charcoal py-24 px-4 md:px-8 text-center relative overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-bk-charcoal text-bk-gold px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            <Percent size={16} /> Exclusive Offers
          </div>
          <h1 className="font-display text-7xl md:text-9xl uppercase leading-none mb-6">Big Taste. <br /> Small Price.</h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80">
            Save big on your flame-grilled favorites with these limited-time coupons and app-exclusive deals.
          </p>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-bk-red rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-bk-red rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {DEALS.map((deal) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={deal.id}
              className="bg-white rounded-3xl p-8 shadow-sm border border-bk-charcoal/5 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-32 h-32 bg-bk-cream rounded-2xl flex items-center justify-center flex-shrink-0">
                <Percent size={48} className="text-bk-red" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-bk-red font-bold text-sm uppercase mb-2">
                  <Clock size={16} /> Limited Time
                </div>
                <h3 className="font-display text-3xl uppercase mb-2">{deal.title}</h3>
                <p className="text-bk-charcoal/60 mb-6">{deal.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-bk-cream border border-dashed border-bk-charcoal/20 px-4 py-2 rounded-xl flex items-center justify-between">
                    <span className="font-mono font-bold">{deal.code}</span>
                    <button className="text-bk-red hover:scale-110 transition-transform"><Copy size={18} /></button>
                  </div>
                  <button className="bg-bk-red text-white px-6 py-2 rounded-xl font-bold uppercase text-sm hover:bg-opacity-90 transition-all">
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loyalty Section */}
        <div className="bg-bk-charcoal rounded-[3rem] p-12 md:p-20 text-bk-cream relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-bk-gold text-bk-charcoal px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                <Crown size={16} /> Royal Perks
              </div>
              <h2 className="font-display text-6xl md:text-7xl uppercase leading-none">
                Earn Crowns. <br /> Get Free Food.
              </h2>
              <p className="text-xl opacity-70 max-w-lg">
                Join Royal Perks and earn 10 Crowns for every $1 spent. Redeem them for your favorite flame-grilled items.
              </p>
              <button className="bg-bk-gold text-bk-charcoal px-10 py-4 rounded-full font-display text-2xl uppercase tracking-wider hover:scale-105 transition-transform shadow-xl">
                Join Now
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Free Fries', crowns: '250' },
                { label: 'Whopper', crowns: '750' },
                { label: 'Meal Deal', crowns: '1500' },
                { label: 'Family Bundle', crowns: '3000' },
              ].map((reward, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center backdrop-blur-sm">
                  <Crown size={32} className="text-bk-gold mx-auto mb-4" />
                  <p className="font-display text-xl uppercase mb-1">{reward.label}</p>
                  <p className="text-bk-gold font-bold">{reward.crowns} Crowns</p>
                </div>
              ))}
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-bk-red rounded-full opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
};

export default Deals;
