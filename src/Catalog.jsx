import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from './contexts.js'

const products = [
  { id: 1, name: 'Блокнот', price: 150 },
  { id: 2, name: 'Ручка', price: 50 },
  { id: 3, name: 'Пенал', price: 350 },
  { id: 4, name: 'Линейка', price: 80 },
  { id: 5, name: 'Папка', price: 200 },
]

function ProductCard({ product, onAdd }) {
  return (
    <li>
      <img src="/product-placeholder.png" alt="" width="48" height="52" />{' '}
      {product.name} — {product.price} ₽{' '}
      <button onClick={() => onAdd(product)}>В корзину</button>
    </li>
  )
}

export default function Catalog() {
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  function handleAdd(product) {
    addToCart(product)
    navigate('/cart')
  }

  return (
    <section>
      <h1>Каталог товаров</h1>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={handleAdd} />
        ))}
      </ul>
    </section>
  )
}
