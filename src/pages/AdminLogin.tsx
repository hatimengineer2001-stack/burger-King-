import React, { useEffect, useState } from 'react';
import { auth, googleProvider, signInWithPopup, db, doc, getDoc, setDoc } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Flame, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const AdminLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore, if not create a default user
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Default role is 'user' unless it's the owner email
        const role = user.email === 'mridulhassan2014@gmail.com' ? 'admin' : 'user';
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          role: role
        });
        
        if (role !== 'admin') {
          setError('Access denied. You do not have admin privileges.');
          return;
        }
      } else {
        const userData = userSnap.data();
        if (userData.role !== 'admin') {
          setError('Access denied. You do not have admin privileges.');
          return;
        }
      }

      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bk-cream px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-xl border border-bk-charcoal/5 text-center"
      >
        <div className="w-20 h-20 bg-bk-red rounded-full flex items-center justify-center mx-auto mb-8 text-white">
          <Flame size={40} fill="currentColor" />
        </div>
        <h1 className="font-display text-4xl uppercase mb-4 text-bk-charcoal">Admin Access</h1>
        <p className="text-bk-charcoal/60 mb-8">
          Sign in with your admin account to manage the Burger King experience.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 flex items-center gap-3 text-sm text-left">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-bk-charcoal text-white py-4 rounded-2xl font-display text-2xl uppercase tracking-wider hover:bg-bk-red transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : (
            <>
              <LogIn size={24} /> Sign in with Google
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
