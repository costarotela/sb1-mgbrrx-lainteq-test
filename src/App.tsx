import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const Company = lazy(() => import('./pages/Company'));
const TechnicalSheet = lazy(() => import('./pages/TechnicalSheet'));
const Contact = lazy(() => import('./pages/Contact'));
const LabSection = lazy(() => import('./pages/LabSection'));
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col relative">
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10 mt-32">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/empresa" element={<Company />} />
              <Route path="/ficha-tecnica/:id" element={<TechnicalSheet />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/lab-section/:sectionId" element={<LabSection />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;