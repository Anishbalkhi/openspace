import { Routes, Route } from 'react-router-dom';
import Header from './Layout/Header.jsx';
import CursorGlowTrail from './Component/CursorGlowTrail.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import ThemeDemos from './pages/theme/ThemeDemos.jsx';
import ComparePage from './pages/Compare/ComparePage.jsx';
import ServicesPage from './pages/Services/ServicesPage.jsx';
import LearnPage from './pages/Learn/LearnPage.jsx';
import BlogPage from './pages/Blog/BlogPage.jsx';
import AddOnsPage from './pages/AddOns/AddOnsPage.jsx';
import './App.css';

const App = () => {
  return (
    <div className="app">
      {/* ── Cursor glow trail ── */}
      <CursorGlowTrail />

      {/* ── Sticky Header ── */}
      <Header />

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
  );
};

export default App;
