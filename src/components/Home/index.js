import {Component} from 'react'
import Header from '../Header'
import TabItem from '../TabItem'
import FoodItem from '../FoodItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    activeTabId: '11',
    foodsList: [],
    tabsList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getFoodsList()
  }

  onClickTab = activeTab => {
    this.setState({activeTabId: activeTab}, this.getFoodsList)
  }

  getFoodsList = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
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
        apiStatus: apiConstants.success,
        tabsList: tabsListUpdated,
        foodsList: foodObjList ? foodObjList.categoryDishes : [],
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderHomeFoods = () => {
    const {foodsList} = this.state
    return (
      <div className="FoodsContUl">
        {foodsList.map(eachFood => (
          <FoodItem foodItemDetails={eachFood} key={eachFood.dishId} />
        ))}
      </div>
    )
  }

  renderAllPages = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return <h1>Loading.......</h1>
      case apiConstants.loading:
        return this.renderHomeFoods
      case apiConstants.failure:
        return <h1>Api Call Failed.......</h1>

      default:
        return null
    }
  }

  render() {
    const {activeTabId, tabsList} = this.state
    return (
      <div className="ResAppCont">
        <Header />
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
        {this.renderHomeFoods()}
      </div>
    )
  }
}

export default Home
