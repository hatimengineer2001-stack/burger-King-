import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bk-charcoal text-bk-cream py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h3 className="font-display text-3xl uppercase text-bk-gold">Burger King</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Flame-grilled since 1954. We believe in real food, real people, and having it your way.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-bk-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-bk-gold transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-bk-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-bk-gold transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl uppercase mb-6">Menu</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li><Link to="/menu" className="hover:text-bk-gold">Burgers</Link></li>
            <li><Link to="/menu" className="hover:text-bk-gold">Chicken & More</Link></li>
            <li><Link to="/menu" className="hover:text-bk-gold">Sides</Link></li>
            <li><Link to="/menu" className="hover:text-bk-gold">Drinks</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl uppercase mb-6">Company</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li><Link to="/about" className="hover:text-bk-gold">About Us</Link></li>
            <li><Link to="/about" className="hover:text-bk-gold">Sustainability</Link></li>
            <li><Link to="/about" className="hover:text-bk-gold">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-bk-gold">Contact Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl uppercase mb-6">Get the App</h4>
          <p className="text-sm opacity-70 mb-4">Download for exclusive deals and faster ordering.</p>
          <div className="flex flex-col gap-3">
            <button className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 font-bold text-xs uppercase">
              App Store
            </button>
            <button className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 font-bold text-xs uppercase">
              Google Play
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
        <p>© 2026 Burger King Corporation. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
