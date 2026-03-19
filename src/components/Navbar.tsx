import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Menu as MenuIcon, ShoppingBag, Percent, MapPin } from 'lucide-react';
import { useCart } from '../CartContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Menu', path: '/menu', icon: MenuIcon },
    { name: 'Deals', path: '/deals', icon: Percent },
    { name: 'Locations', path: '/locations', icon: MapPin },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-bk-cream border-b border-bk-charcoal/10 px-4 md:px-8 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-bk-red rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          <Flame size={24} fill="currentColor" />
        </div>
        <span className="font-display text-2xl tracking-wide uppercase text-bk-red">Burger King</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "font-display text-lg uppercase tracking-wider hover:text-bk-red transition-colors flex items-center gap-2",
              location.pathname === link.path ? "text-bk-red" : "text-bk-charcoal"
            )}
          >
            <link.icon size={18} />
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/order"
          className="bg-bk-red text-white px-6 py-2 rounded-full font-display text-lg uppercase tracking-wider hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-md active:scale-95"
        >
          <ShoppingBag size={20} />
          Order Now
          {totalItems > 0 && (
            <span className="bg-bk-gold text-bk-charcoal w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
