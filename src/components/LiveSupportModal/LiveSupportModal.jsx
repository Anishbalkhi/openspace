import React, { useState, useEffect, useRef } from 'react';
import {
  LuChevronDown,
  LuChevronLeft,
  LuVolume2,
  LuVolumeX,
  LuSend,
  LuChevronRight,
  LuMessageCircle,
  LuSearch,
} from 'react-icons/lu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa6';
import './LiveSupportModal.css';

/* ── Mark — simple monochrome logo ────────────────────────────────────── */
const Mark = ({ size = 36 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'var(--os-ink)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <LuMessageCircle color="#ffffff" size={Math.round(size * 0.5)} />
  </div>
);

/* ── Crisp SVG QR Code ────────────────────────────────────────────────── */
const QRCode = () => (
  <svg viewBox="0 0 140 140" width="100%" height="100%" fill="#17181c">
    <rect x="10" y="10" width="34" height="34" rx="4" fill="none" stroke="#17181c" strokeWidth="4" />
    <rect x="18" y="18" width="18" height="18" fill="#17181c" />
    <rect x="96" y="10" width="34" height="34" rx="4" fill="none" stroke="#17181c" strokeWidth="4" />
    <rect x="104" y="18" width="18" height="18" fill="#17181c" />
    <rect x="10" y="96" width="34" height="34" rx="4" fill="none" stroke="#17181c" strokeWidth="4" />
    <rect x="18" y="104" width="18" height="18" fill="#17181c" />
    <rect x="52" y="12" width="8" height="8" />
    <rect x="66" y="12" width="8" height="16" />
    <rect x="80" y="12" width="8" height="8" />
    <rect x="52" y="26" width="8" height="8" />
    <rect x="80" y="26" width="8" height="18" />
    <rect x="52" y="40" width="18" height="8" />
    <rect x="12" y="52" width="8" height="12" />
    <rect x="26" y="52" width="18" height="8" />
    <rect x="52" y="54" width="36" height="36" rx="6" fill="none" stroke="#17181c" strokeWidth="3" />
    <rect x="96" y="52" width="8" height="18" />
    <rect x="110" y="52" width="18" height="8" />
    <rect x="12" y="72" width="12" height="8" />
    <rect x="32" y="68" width="8" height="16" />
    <rect x="96" y="78" width="20" height="8" />
    <rect x="122" y="70" width="8" height="18" />
    <rect x="52" y="96" width="12" height="8" />
    <rect x="70" y="96" width="18" height="8" />
    <rect x="52" y="110" width="8" height="18" />
    <rect x="68" y="112" width="20" height="8" />
    <rect x="96" y="96" width="32" height="8" />
    <rect x="104" y="110" width="8" height="18" />
    <rect x="118" y="110" width="12" height="18" />
  </svg>
);

/* ── Suggested Themes ────────────────────────────────────────────────── */
const THEME_SUGGESTIONS = [
  { id: 'plain-jane', label: 'Plain Jane Theme ($99)', icon: '🛍' },
  { id: 'interactive', label: 'Plain Jane Interactive ($149)', icon: '✨' },
  { id: 'starter', label: 'Plain Jane Starter ($49)', icon: '⚡' },
  { id: 'install', label: 'Theme Installation & Setup', icon: '🛠' },
  { id: 'custom', label: 'Custom Coding & Services', icon: '💡' },
];

/* ── Common Issues / FAQs ────────────────────────────────────────────── */
const COMMON_ISSUES = [
  { q: 'How do I upload custom fonts?', a: 'Go to Shopify Theme Editor → Theme Settings → Typography → Custom Fonts. You can upload .woff2 or .ttf font files directly!' },
  { q: 'How to install theme on Shopify?', a: 'Download the .zip file from your order receipt. In Shopify Admin, navigate to Online Store → Themes → Add Theme → Upload zip file.' },
  { q: 'Can I add video backgrounds and music?', a: 'Yes! Both Plain Jane and Interactive include native zero-code video background and music player sections.' },
  { q: 'Do you offer custom developer work?', a: 'Yes. Our team offers flat-rate custom development starting at $350 with a guaranteed 48-hour turnaround.' },
];

/* ── Knowledge Base ──────────────────────────────────────────────────── */
const KB = [
  {
    keywords: ['which theme', 'best theme', 'recommend', 'choose', 'difference', 'compare'],
    answer: 'Here is how to choose:\n• Starter ($49) — clean catalog pages & fast drop checkout.\n• Plain Jane ($99) — apparel / streetwear with lookbooks, countdown drops, custom fonts.\n• Plain Jane Interactive ($149) — 3D product visualizers, floating cards & motion.',
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'fee', 'monthly', 'subscription', 'lifetime'],
    answer: 'All OpenSpaces themes are one-time payments — zero monthly app fees!\n• Starter: $49\n• Plain Jane: $99 (or $199 Lifetime)\n• Plain Jane Interactive: $149 (or $299 Lifetime)',
  },
  {
    keywords: ['install', 'installation', 'setup', 'how to install', 'upload', 'shopify'],
    answer: 'Setup takes under 2 minutes:\n1. Download the .zip from your order.\n2. Go to Shopify Admin → Online Store → Themes → Add Theme → Upload zip.\nFull video guides are at openspaces.design/docs.',
  },
  {
    keywords: ['custom code', 'customization', 'developer', 'service', 'hire', 'custom work'],
    answer: 'We offer flat-rate custom coding starting at $350 with a guaranteed 48-hour turnaround. We will log this for our senior dev to review!',
  },
  {
    keywords: ['font', 'music', 'player', 'video', 'background', 'lookbook', 'countdown', 'drop', 'features'],
    answer: 'Plain Jane and Interactive include:\n• Built-in Music Player\n• Full-bleed Video Backgrounds\n• 9 Lookbook gallery layouts\n• Custom Font uploads\n• Drop Countdown Timers\n\nAll natively built-in without third-party apps.',
  },
];

/* ── Export helper ───────────────────────────────────────────────────── */
export const openLiveSupport = () =>
  window.dispatchEvent(new CustomEvent('open-live-support'));

/* ═══════════════════════════════════════════════════════════════════════ */
const LiveSupportModal = () => {
  const [isOpen, setIsOpen]                 = useState(false);
  const [view, setView]                     = useState('chat'); // 'chat' | 'messenger' | 'instagram'
  const [showMenu, setShowMenu]             = useState(false);
  const [soundOn, setSoundOn]               = useState(true);
  
  // Stages: 'theme' -> 'issue' -> 'name' -> 'email' -> 'chat'
  const [stage, setStage]                   = useState('theme');
  const [selectedTheme, setSelectedTheme]   = useState('');
  const [issueText, setIssueText]           = useState('');
  const [name, setName]                     = useState('');
  const [email, setEmail]                   = useState('');
  const [messages, setMessages]             = useState([]);
  const [input, setInput]                   = useState('');
  const [typing, setTyping]                 = useState(false);
  const bodyRef                             = useRef(null);
  const endRef                              = useRef(null);

  /* Listen for external open event */
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener('open-live-support', open);
    return () => window.removeEventListener('open-live-support', open);
  }, []);

  /* Auto-scroll chat body */
  useEffect(() => {
    if (isOpen && view === 'chat') {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing, stage, isOpen, view]);

  /* Close options menu on outside click */
  useEffect(() => {
    if (!showMenu) return;
    const close = () => setShowMenu(false);
    setTimeout(() => window.addEventListener('click', close), 0);
    return () => window.removeEventListener('click', close);
  }, [showMenu]);

  /* Resolve answer from KB */
  const resolve = (q) => {
    const lower = q.toLowerCase();
    for (const item of KB) {
      if (item.keywords.some((k) => lower.includes(k))) return item.answer;
    }
    return `Thanks ${name || 'there'}! Our support team reviews every message Mon-Fri 10AM-6PM EST. We've logged your question regarding "${selectedTheme || 'OpenSpaces'}" and will reply to ${email || 'your email'} shortly.`;
  };

  /* Step 1: Select Theme Suggestion */
  const handleSelectTheme = (themeLabel) => {
    setSelectedTheme(themeLabel);
    setMessages((p) => [
      ...p,
      { id: Date.now(), sender: 'user', text: themeLabel },
    ]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Got it! What issue or question do you have regarding ${themeLabel}? Type your issue below:`,
        },
      ]);
      setStage('issue');
    }, 450);
  };

  /* Step 2: Submit Issue (via search/input or common chip) */
  const handleSubmitIssue = (issueString) => {
    if (!issueString.trim()) return;
    const q = issueString.trim();
    setIssueText(q);
    setMessages((p) => [
      ...p,
      { id: Date.now(), sender: 'user', text: q },
    ]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Thanks for providing the details! Please share your name and email address so our specialist can assist you directly.`,
        },
      ]);
      setStage('name');
    }, 450);
  };

  /* Step 3: Submit Name */
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStage('email');
  };

  /* Step 4: Submit Email -> Enter Live Chat */
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStage('chat');
    setMessages((p) => [
      ...p,
      { id: Date.now(), sender: 'user', text: `${name} (${email})` },
    ]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const initialAnswer = resolve(issueText || selectedTheme || 'support');
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Great to meet you, ${name}! Here is what our knowledge base suggests for your request:\n\n${initialAnswer}`,
        },
      ]);
    }, 600);
  };

  /* Chat Message submission in Chat stage */
  const sendMessage = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();

    if (stage === 'theme') {
      handleSelectTheme(text);
      setInput('');
      return;
    }

    if (stage === 'issue') {
      handleSubmitIssue(text);
      setInput('');
      return;
    }

    // Active chat stage
    setMessages((p) => [...p, { id: Date.now(), sender: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((p) => [...p, { id: Date.now() + 1, sender: 'bot', text: resolve(text) }]);
    }, 600);
  };

  const close = () => { setIsOpen(false); setShowMenu(false); };

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <>
      {/* Floating launcher */}
      {!isOpen && (
        <button className="os-launcher" aria-label="Open support chat" onClick={() => setIsOpen(true)}>
          <LuMessageCircle color="#ffffff" size={22} />
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="os-overlay" onClick={(e) => e.target === e.currentTarget && close()}>

          {/* ── CARD ── */}
          <div data-os-widget role="dialog" aria-modal="true" aria-label="Ask Us Anything">

            {/* Header */}
            <div className="w-hd">
              <div className="w-hd__left">
                {view !== 'chat'
                  ? <button className="w-icon-btn" onClick={() => setView('chat')} aria-label="Back"><LuChevronLeft /></button>
                  : <Mark size={32} />
                }
                <div className="w-hd__titles">
                  <h3>{view === 'chat' ? 'Ask Us Anything' : 'OpenSpaces Support'}</h3>
                  {view === 'chat' && <span>Mon-Fri 10AM-6PM EST</span>}
                </div>
              </div>

              <div className="w-hd__actions">
                {view === 'chat' && (
                  <button
                    className="w-icon-btn"
                    aria-label="Options"
                    onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                  >
                    <BsThreeDotsVertical />
                  </button>
                )}
                <button className="w-icon-btn" aria-label="Minimize" onClick={close}>
                  <LuChevronDown />
                </button>

                {/* Options popover */}
                {showMenu && (
                  <div className="w-popover" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="w-popover__item"
                      onClick={() => { setSoundOn(!soundOn); setShowMenu(false); }}
                    >
                      {soundOn ? <LuVolumeX style={{ fontSize: 15 }} /> : <LuVolume2 style={{ fontSize: 15 }} />}
                      <span>{soundOn ? 'Turn off sound' : 'Turn on sound'}</span>
                    </button>
                    <div className="w-popover__divider" />
                    <button
                      className="w-popover__item"
                      onClick={() => { setView('messenger'); setShowMenu(false); }}
                    >
                      <LuMessageCircle style={{ fontSize: 16 }} />
                      <span>Continue on Messenger</span>
                    </button>
                    <button
                      className="w-popover__item"
                      onClick={() => { setView('instagram'); setShowMenu(false); }}
                    >
                      <FaInstagram style={{ fontSize: 16 }} />
                      <span>Continue on Instagram</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── Messenger screen ─────────────────────────────────────── */}
            {view === 'messenger' && (
              <div className="w-channel">
                <LuMessageCircle size={40} color="var(--os-ink)" />
                <h4>Continue on Messenger</h4>
                <p className="w-channel__sub">
                  Take the conversation to your Messenger account. You can return anytime.
                </p>
                <p className="w-channel__instr">
                  Scan the QR code and then send the message that appears in your Messenger.
                </p>
                <div className="w-qr-box"><QRCode /></div>
                <a className="w-channel__link" href="https://m.me/openspaces" target="_blank" rel="noopener noreferrer">
                  Open Messenger on this device.
                </a>
              </div>
            )}

            {/* ── Instagram screen ─────────────────────────────────────── */}
            {view === 'instagram' && (
              <div className="w-channel">
                <FaInstagram size={40} color="var(--os-ink)" />
                <h4>Continue on Instagram</h4>
                <p className="w-channel__sub">
                  Take the conversation to your Instagram account. You can return anytime.
                </p>
                <p className="w-channel__instr">
                  Scan the QR code to open Instagram. Follow @openspaces.io to send a DM.
                </p>
                <div className="w-qr-box"><QRCode /></div>
                <a className="w-channel__link" href="https://instagram.com/openspaces" target="_blank" rel="noopener noreferrer">
                  Open Instagram on this device.
                </a>
              </div>
            )}

            {/* ── Main Chat Body ────────────────────────────────────────── */}
            {view === 'chat' && (
              <div className="w-body" ref={bodyRef}>
                <div className="w-date">Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="w-sender">OPENSPACES LIVE SUPPORT</div>

                {/* Initial Bot Bubble */}
                <div className="w-bot-bubble">
                  Hey there! 👋 Which theme or topic would you like help with today?
                </div>

                {/* ── Stage 1: Theme Suggestions Chips ── */}
                {stage === 'theme' && messages.length === 0 && (
                  <div className="w-suggestions-box">
                    <div className="w-suggestions-title">Suggested Themes & Topics:</div>
                    <div className="w-suggestions-list">
                      {THEME_SUGGESTIONS.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className="w-theme-chip"
                          onClick={() => handleSelectTheme(t.label)}
                        >
                          <span className="w-theme-chip__icon">{t.icon}</span>
                          <span className="w-theme-chip__label">{t.label}</span>
                          <LuChevronRight className="w-theme-chip__arrow" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Render chat message bubbles */}
                {messages.map((m) => (
                  <div key={m.id} className={m.sender === 'user' ? 'w-user-bubble' : 'w-bot-bubble'}>
                    {m.text}
                  </div>
                ))}

                {/* ── Stage 2: Issue / Question Suggestions ── */}
                {stage === 'issue' && (
                  <div className="w-suggestions-box">
                    <div className="w-suggestions-title">Common Questions (or type below):</div>
                    <div className="w-suggestions-list">
                      {COMMON_ISSUES.map((ci) => (
                        <button
                          key={ci.q}
                          type="button"
                          className="w-theme-chip"
                          onClick={() => handleSubmitIssue(ci.q)}
                        >
                          <span className="w-theme-chip__label">{ci.q}</span>
                          <LuChevronRight className="w-theme-chip__arrow" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Stage 3: Name Input Form ── */}
                {stage === 'name' && (
                  <div className="w-step-row">
                    <form className="w-step-form" onSubmit={handleNameSubmit}>
                      <label htmlFor="os-name">Your Name</label>
                      <input
                        id="os-name"
                        type="text"
                        placeholder="e.g. Alex"
                        required
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className="w-step-footer">
                        <span className="w-step-counter">1 of 2</span>
                        <button type="submit" className="w-next-btn">Next →</button>
                      </div>
                    </form>
                  </div>
                )}

                {/* ── Stage 4: Email Input Form ── */}
                {stage === 'email' && (
                  <div className="w-step-row">
                    <form className="w-step-form" onSubmit={handleEmailSubmit}>
                      <label htmlFor="os-email">Email Address</label>
                      <input
                        id="os-email"
                        type="email"
                        placeholder="alex@example.com"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="w-step-footer">
                        <span className="w-step-counter">2 of 2</span>
                        <button type="submit" className="w-next-btn">Connect With Support</button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Typing Indicator */}
                {typing && (
                  <div className="w-typing">
                    <span className="w-typing__dot" />
                    <span className="w-typing__dot" />
                    <span className="w-typing__dot" />
                  </div>
                )}

                <div ref={endRef} />
              </div>
            )}

            {/* ── Chat Input / Search Bar ── */}
            {view === 'chat' && (
              <form className="w-input-bar" onSubmit={sendMessage}>
                <div className="w-input-wrap">
                  {stage === 'issue' || stage === 'theme' ? (
                    <LuSearch className="w-input-search-icon" />
                  ) : null}
                  <input
                    type="text"
                    placeholder={
                      stage === 'theme'
                        ? 'Select a theme above or type topic...'
                        : stage === 'issue'
                        ? 'Type your issue or question...'
                        : stage === 'name' || stage === 'email'
                        ? 'Please enter your details above...'
                        : 'Type a message...'
                    }
                    value={input}
                    disabled={stage === 'name' || stage === 'email'}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-send-btn"
                  aria-label="Send"
                  disabled={!input.trim() || stage === 'name' || stage === 'email'}
                >
                  <LuSend size={15} />
                </button>
              </form>
            )}

          </div>{/* end [data-os-widget] */}
        </div>
      )}
    </>
  );
};

export default LiveSupportModal;
