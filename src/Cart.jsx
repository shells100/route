import { useContext } from 'react'
import { CartContext } from './contexts.js'

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext)
  const total = cart.reduce((sum, product) => sum + product.price, 0)

  return (
    <section>
      <h1>Корзина</h1>
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            {product.name} — {product.price} ₽{' '}
            <button onClick={() => removeFromCart(index)}>Удалить</button>
          </li>
        ))}
      </ul>
      <p>Итого {total} ₽</p>
    </section>
  )
}
