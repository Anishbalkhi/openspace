import { useEffect, useRef } from 'react';
import { LuX, LuShoppingBag, LuArrowRight, LuMinus, LuPlus, LuTrash2, LuShieldCheck, LuSparkles } from 'react-icons/lu';
import { useCart, PRODUCTS } from './CartContext';
import './CartDrawer.css';

/* ── Upsell Recommendation Strip ────────────────────────────────────────── */
const Upsell = ({ onAdd }) => {
  const { items } = useCart();

  // Pick the first product from the catalog that isn't currently in cart
  const cartIds = new Set(items.map((i) => i.id));
  const suggestion = PRODUCTS.find((p) => !cartIds.has(p.id)) || PRODUCTS[0];
  if (!suggestion || cartIds.has(suggestion.id)) return null;

  return (
    <div className="cart-upsell" onClick={() => onAdd(suggestion)} role="button" tabIndex={0}>
      <div className="cart-upsell__icon-badge">
        <LuSparkles size={14} />
      </div>
      <div className="cart-upsell__text">
        <div className="cart-upsell__title-row">
          <strong className="cart-upsell__name">{suggestion.name}</strong>
          <span className="cart-upsell__price">${suggestion.price}</span>
        </div>
        <p className="cart-upsell__sub">{suggestion.subtitle}</p>
      </div>
      <button
        type="button"
        className="cart-upsell__btn"
        onClick={(e) => {
          e.stopPropagation();
          onAdd(suggestion);
        }}
        aria-label={`Add ${suggestion.name} to cart`}
      >
        + Add
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════ */
const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQty,
    totalPrice,
    totalQty,
    addItem,
  } = useCart();
  const drawerRef = useRef(null);

  /* Lock background scroll while drawer is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* Close drawer on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const installmentAmount = (totalPrice / 4).toFixed(2);
  const checkoutUrl = 'https://openspaces-design.myshopify.com/cart';

  return (
    <>
      {/* ── Overlay Backdrop ── */}
      <div
        className="cart-overlay"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* ── Slide-in Drawer ── */}
      <aside
        ref={drawerRef}
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
      >
        {/* ── Header ── */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__header-left">
            <h2 className="cart-drawer__title">Cart ({totalQty})</h2>
          </div>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <LuX size={20} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            /* Empty State */
            <div className="cart-empty">
              <div className="cart-empty__icon-wrap">
                <LuShoppingBag className="cart-empty__icon" size={44} />
              </div>
              <p className="cart-empty__title">Your cart is empty</p>
              <p className="cart-empty__sub">
                Explore our premium themes and services to start building your brand.
              </p>
              <button
                type="button"
                className="cart-empty__cta"
                onClick={closeCart}
              >
                Browse Themes →
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {/* Product Cards */}
              {items.map((item) => (
                <div key={item.id} className="cart-card">
                  {/* Thumbnail */}
                  <div className="cart-card__thumb">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-card__img"
                        onError={(e) => {
                          e.currentTarget.src = '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif';
                        }}
                      />
                    ) : (
                      <div className="cart-card__placeholder">
                        <LuShoppingBag size={24} />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="cart-card__content">
                    <div className="cart-card__header-row">
                      <h3 className="cart-card__title">{item.name}</h3>
                      <button
                        type="button"
                        className="cart-card__trash"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </div>

                    <p className="cart-card__desc">{item.subtitle}</p>

                    <div className="cart-card__bottom-row">
                      {/* Quantity Selector */}
                      <div className="cart-card__qty-group">
                        <button
                          type="button"
                          className="cart-card__qty-btn"
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >
                          <LuMinus size={12} />
                        </button>
                        <span className="cart-card__qty-val">{item.qty}</span>
                        <button
                          type="button"
                          className="cart-card__qty-btn"
                          aria-label="Increase quantity"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          <LuPlus size={12} />
                        </button>
                      </div>

                      {/* Total price for line item */}
                      <div className="cart-card__price">
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Dynamic Upsell / Recommendation */}
              <Upsell onAdd={addItem} />
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            {/* Subtotal */}
            <div className="cart-drawer__subtotal-row">
              <span className="cart-drawer__subtotal-label">Subtotal</span>
              <span className="cart-drawer__subtotal-amount">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Installments info banner */}
            <div className="cart-drawer__installments">
              4 monthly payments of <strong>${installmentAmount}</strong> with Klarna, Afterpay, or Shop Pay
            </div>

            {/* Rainbow Checkout CTA */}
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cart-drawer__checkout-btn"
            >
              <span className="cart-drawer__checkout-text">
                CHECKOUT — ${totalPrice.toFixed(2)}
              </span>
            </a>

            {/* Continue Shopping Button */}
            <button
              type="button"
              className="cart-drawer__continue-btn"
              onClick={closeCart}
            >
              Continue Shopping
            </button>

            {/* Trust badge */}
            <div className="cart-drawer__trust">
              <LuShieldCheck size={14} className="cart-drawer__trust-icon" />
              <span>100% Moneyback Guarantee · Instant Digital Access</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
