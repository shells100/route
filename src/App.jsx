import { useContext, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Cart from './Cart.jsx'
import Catalog from './Catalog.jsx'
import { CartContext, ThemeContext } from './contexts.js'
import './App.css'

function Menu() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <nav>
      <NavLink to="/" end>Каталог</NavLink>
      <NavLink to="/cart">Корзина</NavLink>
      <NavLink to="/login">Вход</NavLink>
      <NavLink to="/dashboard">Личный кабинет</NavLink>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
      </button>
    </nav>
  )
}

function Login() {
  const navigate = useNavigate()

  return (
    <section>
      <h1>Учебный вход</h1>
      <button onClick={() => navigate('/dashboard')}>Войти</button>
    </section>
  )
}

function Dashboard() {
  return <h1>Личный кабинет</h1>
}

export default function App() {
  const [cart, setCart] = useState([])
  const [theme, setTheme] = useState('light')

  function addToCart(product) {
    setCart((items) => {
      if (items.some((item) => item.id === product.id)) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [...items, { ...product, quantity: 1 }]
    })
  }

  function decreaseQuantity(id) {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(id) {
    setCart((items) => items.filter((item) => item.id !== id))
  }

  function toggleTheme() {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <BrowserRouter>
          <div className={`app ${theme}`}>
            <Menu />
            <main>
              <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeContext.Provider>
    </CartContext.Provider>
  )
}
