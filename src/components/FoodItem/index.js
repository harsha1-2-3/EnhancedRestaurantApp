import './index.css'

const FoodItem = props => {
  const {quantity, onClickPlus, onClickMinus, foodItemDetails} = props
  const {
    addOnCat,
    dishCalories,
    dishCurrency,
    dishPrice,
    dishName,
    dishDescription,
    dishImage,
  } = foodItemDetails

  const clickedPlus = () => {
    onClickPlus()
  }

  const clickedMinus = () => {
    onClickMinus()
  }

  return (
    <li className="FoodLi">
      <div className="ItcDetailsCont">
        <img
          className="ItcImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnCng9-oLRLVMxxidepllYIjI13jrWC8T-Cg&usqp=CAU"
          alt="ItcBrand"
        />
        <div className="FoodDetailsCont">
          <h1 className="FoodName">{dishName}</h1>
          <p className="FoodCurrency">
            {dishCurrency} {dishPrice}
          </p>
          <p className="FoodDesc">{dishDescription}</p>
          {addOnCat.length === 0 ? (
            <p className="CustomsNot">Not available</p>
          ) : (
            <>
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
              <p className="CustomsAvai">Customizations available</p>
            </>
          )}
        </div>
      </div>
      <div className="CaloryFoodCont">
        <p className="CaloryPara">{dishCalories} calories</p>
        <img className="FoodImg" src={dishImage} alt="FoodImg" />
      </div>
    </li>
  )
}
export default FoodItem
