import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, auth, signOut, OperationType, handleFirestoreError } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, LogOut, LayoutDashboard, Utensils, Percent, Save, X, Flame } from 'lucide-react';
import { MenuItem, DEALS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'menu' | 'deals'>('menu');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubMenu = onSnapshot(collection(db, 'menuItems'), (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'menuItems'));

    const unsubDeals = onSnapshot(collection(db, 'deals'), (snapshot) => {
      setDeals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.GET, 'deals'));

    return () => {
      unsubMenu();
      unsubDeals();
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const itemData = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: parseFloat(formData.get('price') as string),
      calories: parseInt(formData.get('calories') as string),
      image: formData.get('image') as string,
      description: formData.get('description') as string,
      popular: formData.get('popular') === 'on'
    };

    try {
      if (editingItem?.id) {
        await updateDoc(doc(db, 'menuItems', editingItem.id), itemData);
      } else {
        await addDoc(collection(db, 'menuItems'), itemData);
      }
      setEditingItem(null);
      setIsAdding(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'menuItems');
    }
  };

  const handleDeleteItem = async (id: string, coll: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, coll, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, coll);
    }
  };

  const handleSaveDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dealData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      code: formData.get('code') as string,
      expiry: formData.get('expiry') as string
    };

    try {
      if (editingItem?.id) {
        await updateDoc(doc(db, 'deals', editingItem.id), dealData);
      } else {
        await addDoc(collection(db, 'deals'), dealData);
      }
      setEditingItem(null);
      setIsAdding(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'deals');
    }
  };

  return (
    <div className="min-h-screen bg-bk-cream flex">
      {/* Sidebar */}
      <div className="w-64 bg-bk-charcoal text-white flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-12">
          <Flame className="text-bk-red" size={32} fill="currentColor" />
          <span className="font-display text-2xl uppercase tracking-wider">BK Admin</span>
        </div>

        <nav className="flex-1 space-y-4">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase text-sm transition-all ${activeTab === 'menu' ? 'bg-bk-red text-white' : 'hover:bg-white/5'}`}
          >
            <Utensils size={20} /> Menu Items
          </button>
          <button 
            onClick={() => setActiveTab('deals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase text-sm transition-all ${activeTab === 'deals' ? 'bg-bk-red text-white' : 'hover:bg-white/5'}`}
          >
            <Percent size={20} /> Deals & Coupons
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all mt-auto"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-display text-5xl uppercase">
            {activeTab === 'menu' ? 'Manage Menu' : 'Manage Deals'}
          </h1>
          <button 
            onClick={() => { setIsAdding(true); setEditingItem(null); }}
            className="bg-bk-red text-white px-6 py-3 rounded-xl font-bold uppercase flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
          >
            <Plus size={20} /> Add {activeTab === 'menu' ? 'Item' : 'Deal'}
          </button>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 gap-4">
          {activeTab === 'menu' ? (
            menuItems.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-bk-charcoal/5 flex items-center gap-6">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl" />
                <div className="flex-1">
                  <h3 className="font-display text-2xl uppercase">{item.name}</h3>
                  <p className="text-xs text-bk-charcoal/50">{item.category} • {item.calories} Cal • ${item.price}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingItem(item)} className="p-3 bg-bk-cream rounded-xl hover:text-bk-red transition-colors"><Edit2 size={20} /></button>
                  <button onClick={() => handleDeleteItem(item.id, 'menuItems')} className="p-3 bg-bk-cream rounded-xl hover:text-bk-red transition-colors"><Trash2 size={20} /></button>
                </div>
              </div>
            ))
          ) : (
            deals.map(deal => (
              <div key={deal.id} className="bg-white p-6 rounded-3xl shadow-sm border border-bk-charcoal/5 flex items-center gap-6">
                <div className="w-20 h-20 bg-bk-gold/10 rounded-2xl flex items-center justify-center text-bk-gold">
                  <Percent size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl uppercase">{deal.title}</h3>
                  <p className="text-xs text-bk-charcoal/50">Code: {deal.code} • Expires: {new Date(deal.expiry).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingItem(deal)} className="p-3 bg-bk-cream rounded-xl hover:text-bk-red transition-colors"><Edit2 size={20} /></button>
                  <button onClick={() => handleDeleteItem(deal.id, 'deals')} className="p-3 bg-bk-cream rounded-xl hover:text-bk-red transition-colors"><Trash2 size={20} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {(isAdding || editingItem) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => { setIsAdding(false); setEditingItem(null); }}
              className="absolute inset-0 bg-bk-charcoal/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => { setIsAdding(false); setEditingItem(null); }}
                className="absolute top-8 right-8 text-bk-charcoal/30 hover:text-bk-red transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="font-display text-4xl uppercase mb-8">
                {editingItem ? 'Edit' : 'Add New'} {activeTab === 'menu' ? 'Menu Item' : 'Deal'}
              </h2>

              <form onSubmit={activeTab === 'menu' ? handleSaveItem : handleSaveDeal} className="space-y-6">
                {activeTab === 'menu' ? (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Item Name</label>
                        <input name="name" defaultValue={editingItem?.name} required className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Category</label>
                        <select name="category" defaultValue={editingItem?.category || 'Burgers'} className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors">
                          {['Burgers', 'Chicken', 'Sides', 'Drinks', 'Desserts', 'Vegan', 'Kids'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Price ($)</label>
                        <input name="price" type="number" step="0.01" defaultValue={editingItem?.price} required className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Calories</label>
                        <input name="calories" type="number" defaultValue={editingItem?.calories} required className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">Image URL</label>
                      <input name="image" defaultValue={editingItem?.image} required className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">Description</label>
                      <textarea name="description" rows={3} defaultValue={editingItem?.description} required className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors resize-none" />
                    </div>
                    <div className="flex items-center gap-3">
                      <input name="popular" type="checkbox" defaultChecked={editingItem?.popular} className="w-5 h-5 accent-bk-red" />
                      <label className="text-sm font-bold uppercase">Mark as Popular</label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">Deal Title</label>
                      <input name="title" defaultValue={editingItem?.title} required className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">Description</label>
                      <textarea name="description" rows={3} defaultValue={editingItem?.description} required className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Coupon Code</label>
                        <input name="code" defaultValue={editingItem?.code} required className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40">Expiry Date</label>
                        <input name="expiry" type="datetime-local" defaultValue={editingItem?.expiry?.slice(0, 16)} required className="w-full px-6 py-4 bg-bk-cream rounded-2xl border border-bk-charcoal/5 outline-none focus:border-bk-red transition-colors" />
                      </div>
                    </div>
                  </>
                )}

                <button type="submit" className="w-full bg-bk-red text-white py-5 rounded-2xl font-display text-2xl uppercase tracking-wider hover:bg-opacity-90 transition-all shadow-xl flex items-center justify-center gap-3">
                  <Save size={24} /> Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
