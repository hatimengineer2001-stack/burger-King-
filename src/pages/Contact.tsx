import React from 'react';
import { MessageSquare, Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-display text-6xl md:text-7xl uppercase mb-4">Contact Support</h1>
        <p className="text-bk-charcoal/60 max-w-xl mx-auto">
          Have a question about your order or want to share feedback? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-bk-charcoal/5">
            <div className="w-12 h-12 bg-bk-red/10 text-bk-red rounded-xl flex items-center justify-center mb-6">
              <Phone size={24} />
            </div>
            <h3 className="font-display text-xl uppercase mb-2">Call Us</h3>
            <p className="text-sm text-bk-charcoal/60 mb-4">Available 24/7 for urgent order issues.</p>
            <p className="font-bold text-bk-red">1-800-BURGER-KING</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-bk-charcoal/5">
            <div className="w-12 h-12 bg-bk-gold/10 text-bk-gold rounded-xl flex items-center justify-center mb-6">
              <Mail size={24} />
            </div>
            <h3 className="font-display text-xl uppercase mb-2">Email Support</h3>
            <p className="text-sm text-bk-charcoal/60 mb-4">We'll get back to you within 24 hours.</p>
            <p className="font-bold text-bk-charcoal">support@burgerking.com</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-bk-charcoal/5">
            <div className="w-12 h-12 bg-bk-charcoal/10 text-bk-charcoal rounded-xl flex items-center justify-center mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-display text-xl uppercase mb-2">Live Chat</h3>
            <p className="text-sm text-bk-charcoal/60 mb-4">Chat with our digital assistant now.</p>
            <button className="text-bk-red font-bold uppercase text-sm hover:underline">Start Chat</button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-bk-charcoal/5">
          <h2 className="font-display text-4xl uppercase mb-8">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-40">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-40">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-40">Order Number (Optional)</label>
              <input 
                type="text" 
                className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors"
                placeholder="#BK-123456"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-40">Message</label>
              <textarea 
                rows={5}
                className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <button className="w-full bg-bk-red text-white py-5 rounded-2xl font-display text-2xl uppercase tracking-wider hover:bg-opacity-90 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
              Send Message <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
