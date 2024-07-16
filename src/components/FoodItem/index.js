import CartContext from '../../context/CartContext'
import './index.css'

const FoodItem = props => {
  const {foodItemDetails} = props
  const {
    addonCat,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishPrice,
    dishName,
    dishDescription,
    dishImage,
    dishType,
    dishId,
  } = foodItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          getQuantity,
        } = value

        const onAddCart = () => {
          addCartItem(foodItemDetails)
        }

        const clickedPlus = () => {
          incrementCartItemQuantity(foodItemDetails)
        }

        const clickedMinus = () => {
          decrementCartItemQuantity(foodItemDetails)
        }

        const quantity = getQuantity(dishId)
        return (
          <li className="FoodLi">
            <div className="ItcDetailsCont">
              {dishType === 1 ? (
                <img
                  className="ItcImg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpl11qVp8DzkgC5yIBRRr-hFcISTcCr29ow&usqp=CAU"
                  alt="ItcBrand"
                />
              ) : (
                <img
                  className="ItcImg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnCng9-oLRLVMxxidepllYIjI13jrWC8T-Cg&usqp=CAU"
                  alt="ItcBrand"
                />
              )}
              <div className="FoodDetailsCont">
                <h1 className="FoodName">{dishName}</h1>
                <p className="FoodCurrency">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="FoodDesc">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="CustomAddCont">
                    <div className="CustomCont">
                      <button
                        type="button"
                        onClick={clickedMinus}
                        className="BtnMpCount"
                      >
                        -
                      </button>
                      <p className="Count">{quantity}</p>
                      <button
                        type="button"
                        onClick={clickedPlus}
                        className="BtnMpCount"
                      >
                        +
                      </button>
                    </div>
                    {quantity > 0 && (
                      <button
                        onClick={onAddCart}
                        type="button"
                        className="AddBtn"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="CustomsNot">Not available</p>
                )}
                {addonCat.length !== 0 && (
                  <p className="CustomsAvai">Customizations available</p>
                )}
              </div>
            </div>
            <div className="CaloryFoodCont">
              <p className="CaloryPara">{dishCalories} calories</p>
              <img className="FoodImg" src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FoodItem
