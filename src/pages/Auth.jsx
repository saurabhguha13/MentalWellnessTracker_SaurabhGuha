import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser, clearError } from '../store/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Clear errors when toggling login/signup
  useEffect(() => {
    dispatch(clearError());
  }, [isLogin, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (formData.email && formData.password) {
        dispatch(loginUser({ email: formData.email, password: formData.password }));
      }
    } else {
      if (formData.name && formData.email && formData.password) {
        dispatch(signupUser({ name: formData.name, email: formData.email, password: formData.password }));
      }
    }
  };

  return (
    <motion.div 
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="auth-container glass">
        <div className="auth-header">
          <Brain className="auth-logo" size={48} color="var(--primary)" />
          <h2>{isLogin ? 'Welcome back to Samridhi' : 'Join Samridhi'}</h2>
          <p>{isLogin ? 'Log in to continue your wellness journey.' : 'Start tracking your mental wellness today.'}</p>
        </div>

        {error && (
          <motion.div 
            className="auth-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={16} />
            <span>{error.replace('Firebase: ', '')}</span>
          </motion.div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div 
                className="input-group"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              >
                <User className="input-icon" size={20} />
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  disabled={loading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange}
              required 
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required 
              disabled={loading}
            />
          </div>

          <motion.button 
            type="submit" 
            className="btn btn-primary auth-submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? <Loader2 className="spinner" size={20} /> : (isLogin ? 'Log In' : 'Sign Up')}
          </motion.button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="auth-toggle" onClick={() => !loading && setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Auth;

