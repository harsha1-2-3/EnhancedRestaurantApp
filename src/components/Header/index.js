import './index.css'

const Header = props => {
  const {quantity, restaurantName} = props

  return (
    <div className="HeaderCont">
      <h1 className="HeaderHead">{restaurantName}</h1>
      <div className="CartOrderCont">
        <p className="CartOrderPara">My Orders</p>
        <div className="CartImgCont">
          <p className="CartCountPara">{quantity}</p>
        </div>
      </div>
    </div>
  )
}
export default Header
