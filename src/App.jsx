import { Routes, Route } from 'react-router-dom';
import { Header } from './Layout';
import { CursorGlowTrail, LiveSupportModal, CartProvider, CartDrawer } from './components';
import {
  HomePage,
  ThemeDemos,
  ComparePage,
  ServicesPage,
  LearnPage,
  BlogPage,
  AddOnsPage,
} from './pages';
import './App.css';

const App = () => {
  return (
    <CartProvider>
      <div className="app">
        {/* ── Cursor glow trail ── */}
        <CursorGlowTrail />

        {/* ── Sticky Header ── */}
        <Header />

        {/* ── Live Support Assistant Modal & Floating Bubble ── */}
        <LiveSupportModal />

        {/* ── Cart Drawer (global, renders on top of everything) ── */}
        <CartDrawer />

        {/* ── Page Routing ── */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/themes/demos" element={<ThemeDemos />} />
          <Route path="/demos" element={<ThemeDemos />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/collections/services" element={<ServicesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/add-ons" element={<AddOnsPage />} />
          <Route path="/addons" element={<AddOnsPage />} />
          <Route path="/collections/ai-tools-prompts" element={<AddOnsPage />} />
          <Route path="/collections/sections" element={<AddOnsPage />} />
          <Route path="/collections/e-books" element={<AddOnsPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/docs" element={<LearnPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;

