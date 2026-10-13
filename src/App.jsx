const products = [
  { name: 'Classic Linen Shirt', price: '$49' },
  { name: 'Tailored Trousers', price: '$69' },
  { name: 'Summer Wrap Dress', price: '$79' },
]
export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#1f1f1f', background: '#faf8f5', minHeight: '100vh' }}>
      <header style={{ padding: '20px 32px', borderBottom: '1px solid #e5e0d8', display: 'flex', justifyContent: 'space-between' }}>
        <strong style={{ fontSize: 22 }}>T&amp;M Fashion</strong>
        <nav style={{ display: 'flex', gap: 24 }}><span>Women</span><span>Men</span><span>New In</span></nav>
      </header>
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <section>
          <h1 style={{ fontSize: 40, margin: '0 0 8px' }}>Timeless style, made modern.</h1>
          <p style={{ color: '#555', margin: 0 }}>Discover the new season collection.</p>
        </section>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {products.map(p => (
            <div key={p.name} style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 8, padding: 16 }}>
              <div style={{ height: 160, background: '#efe9e1', borderRadius: 6, marginBottom: 12 }} />
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ color: '#8a5a2b' }}>{p.price}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
