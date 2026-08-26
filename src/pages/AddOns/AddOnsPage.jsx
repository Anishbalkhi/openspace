import { useState } from 'react';
import Footer from '../../Layout/Footer.jsx';
import DotGridPattern from '../../Component/DotGridPattern.jsx';
import './AddOnsPage.css';

const AI_PROMPT_PRODUCTS = [
  {
    id: 'master-collection-ai-mockup-kit',
    title: 'Master Collection AI Prompt Pack',
    price: '$59.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/AI_Mockup_Kit_Master_Collection_059f3cb0-88bb-4ad9-8ecf-13f6c9d45db7.png?v=1766163921',
    fallbackImage: '/demos/entire-studios-hero.webp',
  },
  {
    id: 'classic-short-sleeve-tee-ai-mockup-kit',
    title: 'Classic Short Sleeve Tee AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/ClassicShortSleeveTee.png?v=1765849749',
    fallbackImage: '/demos/yzy-hero.webp',
  },
  {
    id: 'boxy-short-sleeve-tee-ai-mockup-kit',
    title: 'Boxy Short Sleeve Tee AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/Boxy_Short_Sleeve_Tee.png?v=1765916715',
    fallbackImage: '/demos/supreme-hero.webp',
  },
  {
    id: 'vintage-washed-short-sleeve-tee-ai-mockup-kit',
    title: 'Vintage Washed Short Sleeve Tee AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/VintageWashedShortSleeveTee.png?v=1765916998',
    fallbackImage: '/demos/ald-hero.webp',
  },
  {
    id: 'long-sleeve-rugby-shirt',
    title: 'Raglan Long Sleeve (Striped) AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/RaglanLongSleeveStriped.png?v=1765917143',
    fallbackImage: '/demos/pleasures-hero.webp',
  },
  {
    id: 'pullover-hoodie-vintage-wash-ai-mockup-kit',
    title: 'Pullover Hoodie (Vintage Wash) AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/PulloverHoodieVintageWash.png?v=1765917337',
    fallbackImage: '/demos/a-cold-wall-hero.webp',
  },
  {
    id: 'varsity-letterman-jacket-ai-mockup-kit',
    title: 'Varsity Letterman Jacket AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/VarsityLetterman.png?v=1765917906',
    fallbackImage: '/demos/sporty-rich-hero.webp',
  },
  {
    id: 'classic-bomber-jacket-ma-1-style-ai-mockup-kit',
    title: 'Classic Bomber Jacket (MA-1 Style) AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/MA1BomberJacket.png?v=1765918148',
    fallbackImage: '/demos/alyx-hero.webp',
  },
  {
    id: 'classic-leather-jacket-biker-style-ai-mockup-kit',
    title: 'Classic Leather Jacket (Biker Style) AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/ClassicLeatherJacket_BikerStyle.png?v=1765918988',
    fallbackImage: '/demos/on-running-hero.webp',
  },
  {
    id: 'heavyweight-zip-hoodie-ai-mockup-kit',
    title: 'Heavyweight Zip Hoodie AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/HeavyweightZipHoodie.png?v=1765917569',
    fallbackImage: '/demos/satisfy-running-hero.webp',
  },
  {
    id: '6-panel-baseball-hat-ai-mockup-kit',
    title: '6-Panel Baseball Hat AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/StandardBaseballCap6-Panel.png?v=1765918725',
    fallbackImage: '/demos/missoma-hero.webp',
  },
  {
    id: '5-panel-mesh-trucker-hat-ai-mockup-kit',
    title: '5-Panel Mesh Trucker Hat AI Prompt Pack',
    price: '$10.00',
    image:
      'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/MeshTruckerHat5-Panel.png?v=1765918384',
    fallbackImage: '/demos/drake-related-hero.webp',
  },
];

const SECTIONS_PRODUCTS = [
  {
    id: 'interactive-lookbook-grid',
    title: 'Interactive 3D Lookbook Section',
    price: '$29.00',
    image: '/demos/entire-studios-hero.webp',
    fallbackImage: '/demos/yzy-hero.webp',
  },
  {
    id: 'sold-out-urgency-drawer',
    title: 'Sold-Out & Restock Urgency Drawer',
    price: '$19.00',
    image: '/demos/supreme-hero.webp',
    fallbackImage: '/demos/ald-hero.webp',
  },
  {
    id: 'editorial-split-hero',
    title: 'Editorial Parallax Split Hero',
    price: '$24.00',
    image: '/demos/a-cold-wall-hero.webp',
    fallbackImage: '/demos/sporty-rich-hero.webp',
  },
];

const EBOOKS_PRODUCTS = [
  {
    id: 'streetwear-drop-playbook',
    title: 'The Streetwear Drop Strategy Playbook',
    price: '$15.00',
    image: '/demos/yzy-hero.webp',
    fallbackImage: '/demos/pleasures-hero.webp',
  },
  {
    id: 'shopify-conversion-architecture',
    title: 'High-Fashion Shopify Conversion Blueprint',
    price: '$19.00',
    image: '/demos/missoma-hero.webp',
    fallbackImage: '/demos/on-running-hero.webp',
  },
];

const AddOnsPage = () => {
  const [activeTab, setActiveTab] = useState('ai-tools');

  let currentProducts = AI_PROMPT_PRODUCTS;
  if (activeTab === 'sections') currentProducts = SECTIONS_PRODUCTS;
  if (activeTab === 'ebooks') currentProducts = EBOOKS_PRODUCTS;

  return (
    <div className="addons-page">
      <DotGridPattern
        clusters={[
          { top: '25%', left: '15%' },
          { top: '45%', left: '85%' },
          { top: '75%', left: '50%' },
        ]}
      />

      <div className="addons-container">
        {/* ── Category Filter Tabs ── */}
        <div className="addons-tabs-wrapper">
          <div className="addons-tabs">
            <button
              className={`addons-tab ${activeTab === 'ai-tools' ? 'addons-tab--active' : ''}`}
              onClick={() => setActiveTab('ai-tools')}
            >
              AI Tools &amp; Prompts
            </button>
            <button
              className={`addons-tab ${activeTab === 'sections' ? 'addons-tab--active' : ''}`}
              onClick={() => setActiveTab('sections')}
            >
              Sections
            </button>
            <button
              className={`addons-tab ${activeTab === 'ebooks' ? 'addons-tab--active' : ''}`}
              onClick={() => setActiveTab('ebooks')}
            >
              E-Books
            </button>
          </div>

          <p className="addons-count">{currentProducts.length} products found</p>
        </div>

        {/* ── Products Grid ── */}
        <div className="addons-grid">
          {currentProducts.map((item) => (
            <article key={item.id} className="addon-card">
              <div className="addon-card__media">
                <img
                  src={item.image}
                  alt={item.title}
                  className="addon-card__img"
                  loading="lazy"
                  onError={(e) => {
                    if (item.fallbackImage) {
                      e.currentTarget.src = item.fallbackImage;
                    }
                  }}
                />
              </div>

              <h2 className="addon-card__title">{item.title}</h2>
              <div className="addon-card__price">{item.price}</div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Global Footer ── */}
      <Footer />
    </div>
  );
};

export default AddOnsPage;
