import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
          getQuantity,
        } = value

        const onRemoveItem = () => {
          removeCartItem(cartItemDetails.dishId)
        }

        const onPlus = () => {
          incrementCartItemQuantity(cartItemDetails)
        }

        const onMinus = () => {
          decrementCartItemQuantity(cartItemDetails)
        }

        const quantity = getQuantity(cartItemDetails.dishId)

        return (
          <li className="ItemLi">
            <div className="ImgDeCont">
              <img
                className="ItemImg"
                src={cartItemDetails.dishImage}
                alt={cartItemDetails.dishName}
              />
              <div className="DeCustomCont">
                <div className="DeCont">
                  <h1 className="ItemName">{cartItemDetails.dishName}</h1>
                  <p className="ItemPara">Price: {cartItemDetails.dishPrice}</p>
                  <p className="ItemPara">
                    Total:{' '}
                    <span className="ItemPrice">
                      {cartItemDetails.dishPrice * cartItemDetails.quantity}
                    </span>
                  </p>
                </div>
                <div className="CustomCont">
                  <button
                    type="button"
                    onClick={onMinus}
                    className="BtnMpCount"
                  >
                    -
                  </button>
                  <p className="Count">{quantity}</p>
                  <button type="button" onClick={onPlus} className="BtnMpCount">
                    +
                  </button>
                </div>
              </div>
            </div>
            <button onClick={onRemoveItem} type="button" className="RemoveBtn">
              Remove
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartItem
