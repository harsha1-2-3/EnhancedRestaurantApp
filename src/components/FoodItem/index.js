import './index.css'

const FoodItem = props => {
  const {foodItemDetails, onClickMinus, onClickPlus, getQuantity} = props
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

  const quantity = getQuantity(dishId)

  const clickedMinus = () => {
    onClickMinus(foodItemDetails)
  }

  const clickedPlus = () => {
    onClickPlus(foodItemDetails)
  }

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
            <div className="CustomCont">
              <button
                onClick={clickedMinus}
                type="button"
                className="BtnMpCount"
              >
                -
              </button>
              <p className="Count">{quantity}</p>
              <button
                onClick={clickedPlus}
                type="button"
                className="BtnMpCount"
              >
                +
              </button>
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
}

export default FoodItem
