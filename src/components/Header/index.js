import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div className="HeaderCont">
            <Link className="link" to="/">
              <h1 className="HeaderHead">UNI Resto Cafe</h1>
            </Link>
            <button type="button" className="LogoutBtn" onClick={onClickLogout}>
              Logout
            </button>
            <div className="CartOrderCont">
              <p className="CartOrderPara">My Orders</p>
              <span>Shopping Cart</span>
              <button
                className="cartIcon"
                type="button"
                data-testid="cart"
                aria-label="Open shopping cart" // Updated aria-label for clarity
              >
                <Link className="link" to="/cart">
                  Cart
                </Link>
              </button>
              <div className="CartImgCont">
                <p className="CartCountPara">{cartList.length}</p>
              </div>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)
