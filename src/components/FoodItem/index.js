import {Component} from 'react'
import './index.css'

class FoodItem extends Component {
  state = {
    quantity: 0,
  }

  clickedMinus = () => {
    const {onClickMinus} = this.props
    const {quantity} = this.state
    if (quantity <= 0) {
      this.setState({quantity: 0})
    } else {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
    onClickMinus(quantity)
  }

  clickedPlus = () => {
    const {onClickPlus} = this.props
    const {quantity} = this.state
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
    onClickPlus(quantity)
  }

  render() {
    const {quantity} = this.state
    const {foodItemDetails} = this.props
    const {
      addOnCat,
      dishAvailability,
      dishCalories,
      dishCurrency,
      dishPrice,
      dishName,
      dishDescription,
      dishImage,
    } = foodItemDetails

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
            {dishAvailability ? (
              <div className="CustomCont">
                <button
                  onClick={this.clickedMinus}
                  type="button"
                  className="BtnMpCount"
                >
                  -
                </button>
                <p className="Count">{quantity}</p>
                <button
                  onClick={this.clickedPlus}
                  type="button"
                  className="BtnMpCount"
                >
                  +
                </button>
              </div>
            ) : (
              <p className="CustomsNot">Not available</p>
            )}
            {addOnCat.length !== 0 ? (
              <p className="CustomsAvai">Customizations available</p>
            ) : null}
          </div>
        </div>
        <div className="CaloryFoodCont">
          <p className="CaloryPara">{dishCalories} calories</p>
          <img className="FoodImg" src={dishImage} alt="FoodImg" />
        </div>
      </li>
    )
  }
}

export default FoodItem
