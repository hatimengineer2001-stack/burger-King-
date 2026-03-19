import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, CreditCard, Truck, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Order = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('pickup');

  if (totalItems === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 bg-bk-charcoal/5 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={48} className="text-bk-charcoal/20" />
        </div>
        <h2 className="font-display text-4xl uppercase mb-4">Your cart is empty</h2>
        <p className="text-bk-charcoal/60 mb-8 max-w-md">
          Looks like you haven't added any flame-grilled goodness to your order yet.
        </p>
        <Link 
          to="/menu" 
          className="bg-bk-red text-white px-10 py-4 rounded-full font-display text-2xl uppercase tracking-wider hover:scale-105 transition-transform shadow-xl"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-5xl uppercase mb-12">Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Type Toggle */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-bk-charcoal/5 flex gap-2">
            <button
              onClick={() => setOrderType('pickup')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold uppercase transition-all ${
                orderType === 'pickup' ? 'bg-bk-red text-white shadow-md' : 'hover:bg-bk-charcoal/5'
              }`}
            >
              <Store size={20} /> Pickup
            </button>
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold uppercase transition-all ${
                orderType === 'delivery' ? 'bg-bk-red text-white shadow-md' : 'hover:bg-bk-charcoal/5'
              }`}
            >
              <Truck size={20} /> Delivery
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-bk-charcoal/5 overflow-hidden">
            {cart.map((item) => (
              <div key={item.id} className="p-6 border-b border-bk-charcoal/5 flex items-center gap-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <h3 className="font-display text-2xl uppercase mb-1">{item.name}</h3>
                  <p className="text-sm text-bk-charcoal/50 mb-4">{item.calories} Cal</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-bk-cream rounded-full px-2 py-1 border border-bk-charcoal/10">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:text-bk-red transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:text-bk-red transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-bk-charcoal/30 hover:text-bk-red transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl text-bk-red">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-bk-charcoal/40">${item.price.toFixed(2)} each</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upsell Section */}
          <div className="bg-bk-gold/10 p-8 rounded-3xl border-2 border-dashed border-bk-gold">
            <h4 className="font-display text-2xl uppercase mb-4">Complete Your Meal</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Fries', 'Onion Rings', 'Coke', 'Pie'].map((upsell, i) => (
                <button key={i} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group">
                  <div className="w-full aspect-square bg-bk-cream rounded-xl mb-3 flex items-center justify-center">
                    <Plus className="text-bk-gold group-hover:scale-125 transition-transform" />
                  </div>
                  <p className="font-bold text-sm uppercase">{upsell}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-bk-charcoal/5 sticky top-32">
            <h3 className="font-display text-3xl uppercase mb-8">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-bk-charcoal/60">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-bk-charcoal/60">
                <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Service Fee'}</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between text-bk-charcoal/60">
                <span>Estimated Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-bk-charcoal/10 flex justify-between items-end">
                <span className="font-display text-2xl uppercase">Total</span>
                <span className="font-display text-4xl text-bk-red">${(totalPrice + 2.99 + totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-bk-red text-white py-4 rounded-2xl font-display text-2xl uppercase tracking-wider hover:bg-opacity-90 transition-all shadow-xl flex items-center justify-center gap-3 mb-4 active:scale-95">
              Checkout <ArrowRight />
            </button>
            
            <div className="flex items-center justify-center gap-4 opacity-40">
              <CreditCard size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
