import { LuCalendar, LuArrowRight } from 'react-icons/lu';
import './BlogPage.css';

const BLOG_POSTS = [
  {
    id: 'how-to-create-a-lookbook-on-shopify',
    title: 'HOW TO CREATE A LOOKBOOK WITH PLAIN JANE',
    date: 'Aug 24, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/shopify-lookbook-grid-hero.png?v=1787536866',
    fallbackImage: '/demos/entire-studios-hero.webp',
    excerpt:
      'Go to Online Store → Pages → Add page, create your lookbook, and assign a page template with the image layout you want. Depending on your theme, you can use an available image or collage section, a compatible app block, Custom Liquid, or a custom section. Plain Jane lets you have up to 9 lookbooks; they are duplicates of the same layout.',
    link: 'https://www.openspaces.design/products/plain-jane',
  },
  {
    id: 'best-shopify-theme-for-clothing-brand',
    title: 'WHAT IS THE BEST SHOPIFY THEME FOR A CLOTHING BRAND',
    date: 'Aug 19, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/01-hero-yeezy-homepage-annotated.png?v=1787181191',
    fallbackImage: '/demos/yzy-hero.webp',
    excerpt:
      'The best Shopify theme for a clothing brand is one that handles apparel merchandising — sold-out and pre-order badges, typography, coming-soon pages, cart urgency, and how looks are shown — without custom code. Plain Jane is built for that.',
    link: '/compare',
  },
  {
    id: 'why-copying-big-brands-is-hurting-your-clothing-line',
    title: 'WHY COPYING BIG BRANDS IS HURTING YOUR CLOTHING LINE',
    date: 'Mar 9, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/pin_mlpd85si_803a53cb6cb022354f11babc50250759.jpg?v=1773090739',
    fallbackImage: '/demos/ald-hero.webp',
    excerpt:
      "Studying successful brands is smart. Copying them without context is expensive. Here's why what works at scale can actually kill a small clothing brand.",
    link: '#',
  },
  {
    id: 'why-countdown-timers-dont-sell-out-drops',
    title: "WHY COUNTDOWN TIMERS DON'T SELL OUT DROPS (AND WHAT ACTUALLY DOES)",
    date: 'Mar 9, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/pin_mlskqfyx_23cb6c74713fdee75039e05d0a7a3e9f.jpg?v=1773090736',
    fallbackImage: '/demos/supreme-hero.webp',
    excerpt:
      "Countdown timers tell customers when your drop is. They don't make customers care. Here's why the brands that sell out in minutes use anticipation systems instead.",
    link: '#',
  },
  {
    id: 'why-you-should-show-sold-out-products',
    title: 'WHY YOU SHOULD SHOW SOLD OUT PRODUCTS ON YOUR SHOPIFY STORE',
    date: 'Mar 9, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/pin_785807835029575121.jpg?v=1773089103',
    fallbackImage: '/demos/pleasures-hero.webp',
    excerpt:
      'Most brands hide products the second they sell out. Archive the page, remove the listing, move on. It feels like the obvious move. Why show something nobody can buy? Because sold out badges create proof of demand.',
    link: '#',
  },
  {
    id: 'why-returns-cost-your-clothing-brand-way-more',
    title: 'WHY RETURNS COST YOUR CLOTHING BRAND WAY MORE THAN YOU THINK',
    date: 'Mar 9, 2026',
    image: '/demos/on-running-hero.webp',
    fallbackImage: '/demos/satisfy-running-hero.webp',
    excerpt:
      "You see a return come in and you think about the refund. That's it. Maybe you grumble about the shipping cost. But the actual damage a single return does to your cash flow, inventory velocity, and customer lifetime value is brutal.",
    link: '#',
  },
  {
    id: 'why-your-product-drop-schedule-is-costing-you-sales',
    title: 'WHY YOUR PRODUCT DROP SCHEDULE IS COSTING YOU SALES',
    date: 'Mar 9, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/pin_mlo1d09s_98393ab9786a5ab0e52c4e3a0ea987f7.jpg?v=1773089093',
    fallbackImage: '/demos/a-cold-wall-hero.webp',
    excerpt:
      "You're not losing sales because your products are weak. You're losing them because there's no rhythm to how you release them. Your customer bought once, loved it, and then you disappeared for months.",
    link: '#',
  },
  {
    id: 'why-some-clothing-brands-grow-and-others-stay-stuck',
    title: 'WHY SOME CLOTHING BRANDS GROW AND OTHERS STAY STUCK',
    date: 'Mar 9, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/pin_mlpcud33_6217f4088c0236be4dc89106f9892d94_b3535413-0ce2-4250-a2ee-5ed9434431b8.jpg?v=1773081369',
    fallbackImage: '/demos/sporty-rich-hero.webp',
    excerpt:
      "The difference between a brand stuck at $2K/month and one pushing $20K isn't talent or product quality. It almost always comes down to how the founder spends their time.",
    link: '#',
  },
  {
    id: 'shopify-clothing-brand-visual-identity-trust',
    title: 'WHY PEOPLE TRUST SOME BRANDS AND SCROLL PAST YOURS',
    date: 'Feb 17, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/d583a7d6f593ee24ef91b90e11c9a029_66af0c10-fe43-457f-b56f-c09a42e9349a.jpg?v=1771306555',
    fallbackImage: '/demos/alyx-hero.webp',
    excerpt:
      "Your Shopify store loses customers in 3 seconds because it looks like dropshipping. Here's the pattern recognition problem killing your conversions.",
    link: '#',
  },
  {
    id: 'shopify-clothing-brand-drop-strategy-demand',
    title: 'BUILDING DEMAND VS JUST ANNOUNCING PRODUCT',
    date: 'Feb 17, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/729d16811b59316de05fee16992cecf4.jpg?v=1771296026',
    fallbackImage: '/demos/satisfy-running-hero.webp',
    excerpt:
      "You sold 40% and sat on the rest because you announced a product instead of building demand. Here's why sellouts happen before launch day.",
    link: '#',
  },
  {
    id: 'shopify-clothing-brand-factory-relationships',
    title: 'WHY YOUR FACTORY IS YOUR BIGGEST RISK',
    date: 'Feb 17, 2026',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/9890ed6252b6f861a1089a8587d3ca6e.jpg?v=1771295932',
    fallbackImage: '/demos/drake-related-hero.webp',
    excerpt:
      "Your factory sees you as filler work between real clients. Here's why your samples take months and production dates slip, even with perfect tech packs.",
    link: '#',
  },
  {
    id: 'how-to-find-your-default-shopify-store-url',
    title: 'HOW TO FIND YOUR DEFAULT SHOPIFY STORE URL',
    date: 'Oct 30, 2025',
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/articles/6620506e4e815f4ae7c80989_shopify_image.png?v=1761858037',
    fallbackImage: '/demos/missoma-hero.webp',
    excerpt:
      'This is a quick guide to show you where to find your default Shopify Store URL in your admin settings.',
    link: '#',
  },
];

const BlogPage = () => {
  return (
    <div className="blog-page">
      <div className="blog-bg-grid" />
      <div className="blog-bg-glow" />

      <div className="blog-container">
        {/* ── Hero Header ── */}
        <header className="blog-hero">
          <h1 className="blog-hero__title">BLOG POSTS</h1>
          <p className="blog-hero__subtitle">
            Discover the latest insights and tutorials about modern web
            development, UI design, and component-driven architecture.
          </p>
        </header>

        {/* ── Blog Grid ── */}
        <div className="blog-grid">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="blog-card">
              {post.image && (
                <div className="blog-card__image-wrap">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-card__image"
                    loading="lazy"
                    onError={(e) => {
                      if (post.fallbackImage) {
                        e.currentTarget.src = post.fallbackImage;
                      }
                    }}
                  />
                </div>
              )}

              <div className="blog-card__content">
                <h2 className="blog-card__title">{post.title}</h2>

                <div className="blog-card__meta">
                  <LuCalendar className="blog-card__meta-icon" />
                  <span>{post.date}</span>
                </div>

                <p className="blog-card__excerpt">{post.excerpt}</p>

                <div className="blog-card__action">
                  <span>Read more</span>
                  <LuArrowRight />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
