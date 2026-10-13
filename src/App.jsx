import { useEffect, useState } from 'react'
import { products, categories } from './products.js'

const C = { bg: '#faf8f5', text: '#1f1f1f', muted: '#5f5a54', line: '#e5e0d8', accent: '#8a5a2b', dark: '#1f1f1f' }
const btn = { background: C.dark, color: '#fff', border: 'none', borderRadius: 6, padding: '12px 20px', cursor: 'pointer', fontSize: 15 }
const btnLight = { ...btn, background: '#fff', color: C.text, border: `1px solid ${C.line}` }

function useRoute() {
  const get = () => window.location.hash.slice(1) || '/'
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const on = () => { setRoute(get()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

function useCart() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('tm-cart') || '{}'))
  useEffect(() => localStorage.setItem('tm-cart', JSON.stringify(cart)), [cart])
  const add = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const set = (id, q) => setCart(c => { const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = q; return n })
  const clear = () => setCart({})
  return { cart, add, set, clear }
}

function ProductCard({ p, onAdd }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <a href={`#/product/${p.id}`}><img src={p.image} alt={p.name} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block', background: '#efe9e1' }} /></a>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <a href={`#/product/${p.id}`} style={{ color: C.text, textDecoration: 'none', fontWeight: 600 }}>{p.name}</a>
        <div style={{ color: C.accent, fontWeight: 600 }}>${p.price}</div>
        <button style={{ ...btn, marginTop: 'auto', padding: '10px 16px' }} onClick={() => onAdd(p.id)}>Add to cart</button>
      </div>
    </div>
  )
}

const Grid = ({ children }) => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20 }}>{children}</div>

function Home({ add }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <section style={{ background: C.dark, color: '#fff', borderRadius: 12, padding: '64px 40px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <h1 style={{ fontSize: 44, margin: 0, maxWidth: 600 }}>Timeless style, made modern.</h1>
        <p style={{ margin: 0, color: '#d9d3cb', fontSize: 18 }}>Discover the new season collection from T&amp;M Fashion.</p>
        <a href="#/shop" style={{ ...btnLight, textDecoration: 'none' }}>Shop now</a>
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ margin: 0 }}>Featured</h2>
        <Grid>{products.slice(0, 4).map(p => <ProductCard key={p.id} p={p} onAdd={add} />)}</Grid>
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {[['Free shipping', 'On all orders over $100'], ['Easy returns', '30-day hassle-free returns'], ['Secure checkout', 'Your data is always protected']].map(([t, d]) => (
          <div key={t} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: 20, background: '#fff' }}><strong>{t}</strong><div style={{ color: C.muted, marginTop: 6 }}>{d}</div></div>
        ))}
      </section>
    </div>
  )
}

function Shop({ add, initial }) {
  const [cat, setCat] = useState(initial || 'All')
  const [q, setQ] = useState('')
  useEffect(() => setCat(initial || 'All'), [initial])
  const list = products.filter(p => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{ margin: 0 }}>Shop</h1>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {categories.map(c => <button key={c} onClick={() => setCat(c)} style={cat === c ? { ...btn, padding: '8px 16px' } : { ...btnLight, padding: '8px 16px' }}>{c}</button>)}
        <input placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)} style={{ marginLeft: 'auto', padding: '9px 12px', border: `1px solid ${C.line}`, borderRadius: 6, fontSize: 15, minWidth: 200 }} />
      </div>
      {list.length ? <Grid>{list.map(p => <ProductCard key={p.id} p={p} onAdd={add} />)}</Grid> : <p style={{ color: C.muted }}>No products match your search.</p>}
    </div>
  )
}

function Product({ id, add }) {
  const p = products.find(x => x.id === Number(id))
  const [added, setAdded] = useState(false)
  if (!p) return <p>Product not found. <a href="#/shop">Back to shop</a></p>
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
      <img src={p.image.replace('w=600', 'w=900')} alt={p.name} style={{ width: '100%', borderRadius: 12, objectFit: 'cover', maxHeight: 560, background: '#efe9e1' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <a href="#/shop" style={{ color: C.muted }}>← Back to shop</a>
        <span style={{ color: C.muted, textTransform: 'uppercase', fontSize: 13, letterSpacing: 1 }}>{p.category}</span>
        <h1 style={{ margin: 0 }}>{p.name}</h1>
        <div style={{ color: C.accent, fontSize: 24, fontWeight: 600 }}>${p.price}</div>
        <p style={{ color: C.muted, lineHeight: 1.6, margin: 0 }}>{p.description}</p>
        <button style={{ ...btn, alignSelf: 'flex-start' }} onClick={() => { add(p.id); setAdded(true) }}>{added ? 'Added ✓ — add another' : 'Add to cart'}</button>
      </div>
    </div>
  )
}

function Cart({ cart, set, clear }) {
  const [done, setDone] = useState(false)
  const items = Object.entries(cart).map(([id, qty]) => ({ ...products.find(p => p.id === Number(id)), qty })).filter(i => i.name)
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  if (done) return <div style={{ textAlign: 'center', padding: 40 }}><h1>Thank you for your order!</h1><p style={{ color: C.muted }}>We'll email you a confirmation shortly.</p><a href="#/shop" style={{ ...btn, textDecoration: 'none', display: 'inline-block' }}>Continue shopping</a></div>
  if (!items.length) return <div style={{ textAlign: 'center', padding: 40 }}><h1>Your cart is empty</h1><a href="#/shop" style={{ ...btn, textDecoration: 'none', display: 'inline-block' }}>Start shopping</a></div>
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h1 style={{ margin: 0 }}>Your cart</h1>
      {items.map(i => (
        <div key={i.id} style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 8, padding: 12 }}>
          <img src={i.image} alt={i.name} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 6 }} />
          <div style={{ flex: 1 }}><strong>{i.name}</strong><div style={{ color: C.muted }}>${i.price}</div></div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button style={{ ...btnLight, padding: '4px 12px' }} onClick={() => set(i.id, i.qty - 1)}>−</button>
            <span>{i.qty}</span>
            <button style={{ ...btnLight, padding: '4px 12px' }} onClick={() => set(i.id, i.qty + 1)}>+</button>
          </div>
          <strong style={{ width: 70, textAlign: 'right' }}>${i.price * i.qty}</strong>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 20 }}>Total: <strong>${total}</strong></span>
        <button style={btn} onClick={() => { clear(); setDone(true) }}>Checkout</button>
      </div>
    </div>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const field = { padding: '10px 12px', border: `1px solid ${C.line}`, borderRadius: 6, fontSize: 15, fontFamily: 'inherit' }
  return (
    <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Contact us</h1>
      <p style={{ color: C.muted, margin: 0 }}>Questions about an order or sizing? We're happy to help.</p>
      {sent ? <p style={{ color: C.accent, fontWeight: 600 }}>Thanks! Your message has been sent.</p> : (
        <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input required placeholder="Your name" style={field} />
          <input required type="email" placeholder="Email address" style={field} />
          <textarea required rows={5} placeholder="Message" style={field} />
          <button style={{ ...btn, alignSelf: 'flex-start' }}>Send message</button>
        </form>
      )}
    </div>
  )
}

export default function App() {
  const route = useRoute()
  const { cart, add, set, clear } = useCart()
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const [, page, arg] = route.split('/')
  const link = { color: C.text, textDecoration: 'none' }
  let view
  if (page === 'shop') view = <Shop add={add} initial={arg} />
  else if (page === 'product') view = <Product id={arg} add={add} />
  else if (page === 'cart') view = <Cart cart={cart} set={set} clear={clear} />
  else if (page === 'contact') view = <Contact />
  else view = <Home add={add} />
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: C.text, background: C.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '18px 32px', borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', background: '#fff' }}>
        <a href="#/" style={{ ...link, fontSize: 22, fontWeight: 700 }}>T&amp;M Fashion</a>
        <nav style={{ display: 'flex', gap: 20, marginLeft: 'auto', flexWrap: 'wrap' }}>
          <a href="#/shop/Women" style={link}>Women</a>
          <a href="#/shop/Men" style={link}>Men</a>
          <a href="#/shop/Accessories" style={link}>Accessories</a>
          <a href="#/contact" style={link}>Contact</a>
          <a href="#/cart" style={{ ...link, fontWeight: 600 }}>Cart ({count})</a>
        </nav>
      </header>
      <main style={{ maxWidth: 1100, width: '100%', boxSizing: 'border-box', margin: '0 auto', padding: '40px 32px', flex: 1 }}>{view}</main>
      <footer style={{ borderTop: `1px solid ${C.line}`, padding: '24px 32px', color: C.muted, textAlign: 'center' }}>© {new Date().getFullYear()} T&amp;M Fashion. All rights reserved.</footer>
    </div>
  )
}
