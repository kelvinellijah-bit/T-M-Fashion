const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`

export const products = [
  { id: 1, name: 'Classic Linen Shirt', price: 49, category: 'Men', image: img('photo-1596755094514-f87e34085b2c'), description: 'Breathable linen shirt with a relaxed fit, perfect for warm days.' },
  { id: 2, name: 'Tailored Trousers', price: 69, category: 'Men', image: img('photo-1594938298603-c8148c4dae35'), description: 'Sharp, tapered trousers that move from office to evening.' },
  { id: 3, name: 'Denim Jacket', price: 89, category: 'Men', image: img('photo-1551537482-f2075a1d41f2'), description: 'A wardrobe staple in washed indigo denim.' },
  { id: 4, name: 'Summer Wrap Dress', price: 79, category: 'Women', image: img('photo-1595777457583-95e059d581b8'), description: 'Flowing wrap dress with a flattering tie waist.' },
  { id: 5, name: 'Silk Blouse', price: 59, category: 'Women', image: img('photo-1564257631407-4deb1f99d992'), description: 'Soft silk blouse with a subtle sheen.' },
  { id: 6, name: 'Pleated Midi Skirt', price: 55, category: 'Women', image: img('photo-1583496661160-fb5886a0aaaa'), description: 'Elegant pleats that swing with every step.' },
  { id: 7, name: 'Leather Tote Bag', price: 99, category: 'Accessories', image: img('photo-1590874103328-eac38a683ce7'), description: 'Roomy genuine leather tote for everyday carry.' },
  { id: 8, name: 'Classic Sunglasses', price: 35, category: 'Accessories', image: img('photo-1511499767150-a48a237f0083'), description: 'Timeless frames with UV400 protection.' },
]

export const categories = ['All', 'Women', 'Men', 'Accessories']
