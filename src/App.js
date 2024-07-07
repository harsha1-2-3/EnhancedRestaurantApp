import {Component} from 'react'
import Header from './components/Header/index'
import TabItem from './components/TabItem/index'
import FoodItem from './components/FoodItem/index'
import './App.css'

class App extends Component {
  state = {
    activeTabId: '11',
    foodsList: [],
    quantity: 0,
    tabsList: [],
    restaurantName: '',
  }

  componentDidMount() {
    this.getFoodsList()
  }

  onClickTab = activeTab => {
    this.setState({activeTabId: activeTab}, this.getFoodsList)
  }

  onClickMinus = quantity =>
    this.setState(prevState => ({
      quantity: prevState.quantity - quantity,
    }))

  onClickPlus = quantity =>
    this.setState(prevState => ({
      quantity: prevState.quantity + quantity,
    }))

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
        addOnCat: eachCat.addonCat,
        dishAvailability: eachCat.dish_Availability,
        dishCalories: eachCat.dish_calories,
        dishCurrency: eachCat.dish_currency,
        dishDescription: eachCat.dish_description,
        dishId: eachCat.dish_id,
        dishImage: eachCat.dish_image,
        dishName: eachCat.dish_name,
        dishPrice: eachCat.dish_price,
      })),
      menuCategory: eachObj.menu_category,
      menuCategoryId: eachObj.menu_category_id,
    }))
    const {activeTabId} = this.state
    const foodObjList = tabsListUpdated.find(
      each => each.menuCategoryId === activeTabId,
    )
    this.setState({
      restaurantName: dataObject.restaurant_name,
      tabsList: tabsListUpdated,
      foodsList: foodObjList.categoryDishes,
    })
  }

  render() {
    const {
      restaurantName,
      activeTabId,
      quantity,
      tabsList,
      foodsList,
    } = this.state
    return (
      <div className="ResAppCont">
        <Header restaurantName={restaurantName} quantity={quantity} />
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
            />
          ))}
        </div>
      </div>
    )
  }
}
export default App
