import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { setUser } from './store/slices/authSlice';
import { fetchUserData, clearWellnessData } from './store/slices/wellnessSlice';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Journal = lazy(() => import('./pages/Journal'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Resources = lazy(() => import('./pages/Resources'));
const Companion = lazy(() => import('./pages/Companion'));
const Auth = lazy(() => import('./pages/Auth'));
const Settings = lazy(() => import('./pages/Settings'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--text-muted)' }}>
    Loading...
  </div>
);

// Inner component to use location for Framer Motion
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Companion /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />

          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        }));
        // Hydrate data from cloud
        dispatch(fetchUserData(firebaseUser.uid));
      } else {
        dispatch(setUser(null));
        dispatch(clearWellnessData());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <main style={{ padding: '0 32px 32px', flexGrow: 1 }}>
        <AnimatedRoutes />
      </main>
    </Router>
  );
}

export default App;
