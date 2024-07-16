import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems, cartList} = value

      const onRemoveItemAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="CartBg">
            {cartList.length === 0 ? (
              <div className="EmptyCont">
                <img
                  className="EmptyImg"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="empty"
                />
                <h1>Your Cart is Empty</h1>
                <Link to="/">
                  <button type="button" className="AddBtn">
                    Add Items
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <button
                  onClick={onRemoveItemAll}
                  type="button"
                  className="RemoveAllBtn"
                >
                  Remove All
                </button>
                <ul className="ItemsUl">
                  {cartList.map(eachCart => (
                    <CartItem
                      cartItemDetails={eachCart}
                      key={eachCart.dishId}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
