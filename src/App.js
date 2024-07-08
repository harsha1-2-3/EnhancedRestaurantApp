import {Component} from 'react'
import Header from './components/Header'
import TabItem from './components/TabItem'
import FoodItem from './components/FoodItem'
import './App.css'

class App extends Component {
  state = {
    activeTabId: '11',
    foodsList: [],
    tabsList: [],
    restaurantName: '',
    cartItems: [],
  }

  componentDidMount() {
    this.getFoodsList()
  }

  onClickTab = activeTab => {
    this.setState({activeTabId: activeTab}, this.getFoodsList)
  }

  onClickMinus = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)

    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }

  onClickPlus = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)

    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, newDish],
      }))
    } else {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      }))
    }
  }

  getFoodsList = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const dataObject = data[0]
    const tableMenuList = dataObject.table_menu_list
    const tabsListUpdated = tableMenuList.map(eachObj => ({
      categoryDishes: eachObj.category_dishes.map(eachCat => ({
        addonCat: eachCat.addonCat,
        dishAvailability: eachCat.dish_Availability,
        dishCalories: eachCat.dish_calories,
        dishCurrency: eachCat.dish_currency,
        dishDescription: eachCat.dish_description,
        dishId: eachCat.dish_id,
        dishImage: eachCat.dish_image,
        dishName: eachCat.dish_name,
        dishPrice: eachCat.dish_price,
        dishType: eachCat.dish_Type,
      })),
      menuCategory: eachObj.menu_category,
      menuCategoryId: eachObj.menu_category_id,
      menuCategoryImage: eachObj.menu_category_image,
    }))
    const {activeTabId} = this.state
    const foodObjList = tabsListUpdated.find(
      each => each.menuCategoryId === activeTabId,
    )
    this.setState({
      restaurantName: dataObject.restaurant_name,
      tabsList: tabsListUpdated,
      foodsList: foodObjList ? foodObjList.categoryDishes : [],
    })
  }

  getQuantity = dishId => {
    const {cartItems} = this.state
    const cartItem = cartItems.find(each => each.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  render() {
    const {
      restaurantName,
      activeTabId,
      cartItems,
      tabsList,
      foodsList,
    } = this.state
    return (
      <div className="ResAppCont">
        <Header restaurantName={restaurantName} cartItems={cartItems} />
        <div className="TabsContUl">
          {tabsList.map(eachTab => (
            <TabItem
              tabDetails={eachTab}
              key={eachTab.menuCategoryId}
              onClickTab={this.onClickTab}
              isTabActive={activeTabId === eachTab.menuCategoryId}
            />
          ))}
        </div>
        <div className="FoodsContUl">
          {foodsList.map(eachFood => (
            <FoodItem
              foodItemDetails={eachFood}
              key={eachFood.dishId}
              onClickPlus={this.onClickPlus}
              onClickMinus={this.onClickMinus}
              getQuantity={this.getQuantity}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
