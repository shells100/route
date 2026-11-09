import { useContext } from 'react'
import { CartContext } from './contexts.js'

export default function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useContext(CartContext)
  const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0)
  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0)

  return (
    <section>
      <h1>Корзина</h1>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name} — {product.price} ₽{' '}
            <button
              aria-label={`Уменьшить количество товара «${product.name}»`}
              onClick={() => decreaseQuantity(product.id)}
            >
              −
            </button>{' '}
            {product.quantity} шт.{' '}
            <button
              aria-label={`Увеличить количество товара «${product.name}»`}
              onClick={() => addToCart(product)}
            >
              +
            </button>{' '}
            <button onClick={() => removeFromCart(product.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <p>Итого {totalQuantity} шт. — {total} ₽</p>
    </section>
  )
}
