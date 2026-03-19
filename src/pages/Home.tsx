import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-bk-charcoal">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/whopper-hero/1920/1080?blur=2" 
            alt="Flame Grilled Whopper" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bk-charcoal via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-bk-red text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              <Flame size={16} fill="currentColor" />
              Flame-Grilled Since 1954
            </div>
            <h1 className="font-display text-7xl md:text-9xl text-bk-cream uppercase leading-none mb-8 drop-shadow-2xl">
              Flame-Grilled. <br />
              <span className="text-bk-gold">No Shortcuts.</span>
            </h1>
            <p className="text-bk-cream text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto opacity-90">
              Real fire. Real flavor. Have it your way with the iconic Whopper and more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/menu"
                className="w-full sm:w-auto bg-bk-red text-white px-10 py-4 rounded-full font-display text-2xl uppercase tracking-wider hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-3"
              >
                Order Now <ArrowRight size={24} />
              </Link>
              <Link
                to="/deals"
                className="w-full sm:w-auto bg-bk-gold text-bk-charcoal px-10 py-4 rounded-full font-display text-2xl uppercase tracking-wider hover:scale-105 transition-transform shadow-xl"
              >
                View Deals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <div className="bg-bk-gold py-4 ticker-wrap border-y-2 border-bk-charcoal">
        <div className="ticker-move">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-display text-2xl uppercase mx-8 text-bk-charcoal">
              14M+ Burgers Served This Week • Flame-Grilled Perfection • Have it Your Way • 
            </span>
          ))}
        </div>
      </div>

      {/* Featured Items */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-5xl uppercase mb-2">Fan Favorites</h2>
            <p className="text-bk-charcoal/60">The items everyone is talking about.</p>
          </div>
          <Link to="/menu" className="text-bk-red font-bold uppercase flex items-center gap-2 hover:underline">
            View Full Menu <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Whopper', price: '$6.49', img: 'https://picsum.photos/seed/whopper/600/400' },
            { name: 'Chicken Fries', price: '$4.99', img: 'https://picsum.photos/seed/chicken/600/400' },
            { name: 'Impossible Whopper', price: '$7.49', img: 'https://picsum.photos/seed/impossible/600/400' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-bk-charcoal/5 group cursor-pointer"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-3xl uppercase mb-2">{item.name}</h3>
                <p className="text-bk-red font-bold text-xl mb-6">{item.price}</p>
                <Link 
                  to="/menu" 
                  className="block w-full text-center bg-bk-charcoal text-white py-3 rounded-xl font-bold uppercase hover:bg-bk-red transition-colors"
                >
                  Add to Order
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App Download Section */}
      <section className="bg-bk-red py-24 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <div className="text-bk-cream space-y-8">
            <h2 className="font-display text-6xl md:text-7xl uppercase leading-none">
              Get the BK App. <br />
              <span className="text-bk-gold">Earn Crowns.</span>
            </h2>
            <p className="text-xl opacity-90 max-w-lg">
              Download the app to get exclusive deals, earn rewards on every order, and skip the line with mobile ordering.
            </p>
            <div className="flex gap-4">
              <img src="https://picsum.photos/seed/appstore/150/50" alt="App Store" className="h-12 rounded" />
              <img src="https://picsum.photos/seed/playstore/150/50" alt="Google Play" className="h-12 rounded" />
            </div>
          </div>
          <div className="relative">
            <motion.div
              initial={{ rotate: 10, y: 50 }}
              whileInView={{ rotate: 0, y: 0 }}
              className="bg-bk-charcoal w-72 h-[500px] mx-auto rounded-[3rem] border-8 border-bk-charcoal shadow-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-bk-cream p-4 flex flex-col items-center justify-center text-center">
                <Flame size={48} className="text-bk-red mb-4" />
                <h4 className="font-display text-2xl uppercase mb-2">Your Daily Deal</h4>
                <div className="w-full h-32 bg-bk-gold rounded-xl mb-4 flex items-center justify-center font-bold">
                  FREE FRIES
                </div>
                <p className="text-xs opacity-60">Valid with any $1 purchase</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Teaser */}
      <section className="py-24 px-4 md:px-8 max-w-3xl mx-auto text-center">
        <h2 className="font-display text-5xl uppercase mb-6">Find Your Nearest BK</h2>
        <p className="text-bk-charcoal/60 mb-10">Hungry? We're closer than you think. Enter your zip code to find us.</p>
        <div className="flex gap-2 p-2 bg-white rounded-full shadow-lg border border-bk-charcoal/10">
          <input 
            type="text" 
            placeholder="Enter Zip Code" 
            className="flex-1 px-6 py-3 outline-none font-medium"
          />
          <Link 
            to="/locations"
            className="bg-bk-red text-white px-8 py-3 rounded-full font-bold uppercase hover:bg-opacity-90 transition-all"
          >
            Search
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
