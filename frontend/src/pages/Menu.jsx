import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "../index.css"
import "./menu.css"
import idli from "../assets/foods/idli.png"
import hakka from "/src/assets/foods/hakka-noodles.png"
import burger from "../assets/foods/Burger.png"
import chaap from "../assets/foods/masala-chaap.png"
import paneer from "../assets/foods/paneer-tikka.png"
import honey from "../assets/foods/honey-chilli.png"
import dosa from "../assets/foods/masala-dosa.png"
import momos from "../assets/foods/steam-momos.png"
import fries from "../assets/foods/peri-peri-fries.png"
import chana from "../assets/foods/chana-samosa.png"
import chole from "../assets/foods/chole-bhautre.png"
import pav from "../assets/foods/pav-bhaji.png"
import sandwich from "../assets/foods/grilled-sandwich.png"
import pizza from "../assets/foods/pizza.png"
import kurkure from "../assets/foods/kurkure-momos.png"
import jalebi from "../assets/foods/jalebi.png"
import mazza from "../assets/foods/mazza.png"
import placeholder from "../assets/foods/placeholder.png"

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/\(.*?\)/g, "")   
    .replace(/[-_]/g, " ")     
    .replace(/\s+/g, " ")   
    .trim()

const foodImages = {
  "idli": idli,
  "hakka noodles": hakka,
  "burger": burger,
  "masala chaap": chaap,
  "paneer tikka": paneer,
  "honey chilly": honey,
  "masala dosa": dosa,
  "steam momos": momos,
  "peri peri fries": fries,
  "chana samosa": chana,
  "chole bhature": chole,
  "pav bhaji": pav,
  "grilled sandwich": sandwich,
  "pizza": pizza,
  "kurkure momos": kurkure,
  "jalebi": jalebi,
  "mazza": mazza,
  
}


export default function Menu() {
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    api.get("/menu").then((res) => setMenu(res.data))
  }, [])

  const addItem = (item) => {
    if (!item.is_available) return

    setCart((prev) => ({
      ...prev,
      [item.item_id]: {
        ...item,
        quantity: (prev[item.item_id]?.quantity || 0) + 1,
      },
    }))
  }

  const removeItem = (item) => {
    if (!item.is_available) return

    setCart((prev) => {
      const qty = (prev[item.item_id]?.quantity || 0) - 1
      if (qty <= 0) {
        const copy = { ...prev }
        delete copy[item.item_id]
        return copy
      }
      return {
        ...prev,
        [item.item_id]: { ...item, quantity: qty },
      }
    })
  }

  const goToOrder = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
    navigate("/order")
  }

  return (
  <div className="menu-bg">
    <div className="menu-glass">
      
      {/* HEADER */}
      <h2 className="menu-title">🍽 Today’s Menu</h2>

      {/* GRID */}
      <div className="menu-grid">
        {menu.map((item) => {
          const qty = cart[item.item_id]?.quantity || 0
          const disabled = !item.is_available

          return (
            <div className={`food-card ${disabled ? "disabled" : ""}`} key={item.item_id}>
              
              <div className="food-img">
                <img src={foodImages[normalize(item.name)] ?? placeholder} alt={item.name}/>
              </div>

              <h3>{item.name}</h3>

              <div className="price">₹{item.price}</div>

              <div className="qty-controls">
                <button onClick={() => removeItem(item)} disabled={qty === 0}>−</button>
                <span>{qty}</span>
                <button onClick={() => addItem(item)} disabled={disabled}>+</button>
              </div>

              {disabled && <div className="overlay">Not Available</div>}
            </div>
          )
        })}
      </div>

      {Object.keys(cart).length > 0 && (
        <button className="checkout-btn" onClick={goToOrder}>
          Checkout
        </button>
      )}

    </div>
  </div>
)
}

