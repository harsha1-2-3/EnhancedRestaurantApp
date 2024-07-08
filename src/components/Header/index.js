import './index.css'

const Header = props => {
  const {cartItems, restaurantName} = props
  const getCartCount = () =>
    cartItems.reduce((prev, pres) => prev + pres.quantity, 0)

  return (
    <div className="HeaderCont">
      <h1 className="HeaderHead">{restaurantName}</h1>
      <div className="CartOrderCont">
        <p className="CartOrderPara">My Orders</p>
        <div className="CartImgCont">
          <p className="CartCountPara">{getCartCount()}</p>
        </div>
      </div>
    </div>
  )
}
export default Header
