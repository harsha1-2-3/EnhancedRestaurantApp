import {Component} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = itemDetails => {
    const {cartList} = this.state
    const isExists = cartList.find(each => each.dishId === itemDetails.dishId)
    if (isExists) {
      this.setState({cartList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, itemDetails],
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = dishId => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.dishId !== dishId)
    this.setState({
      cartList: filteredList,
    })
  }

  getQuantity = dishId => {
    const {cartList} = this.state
    const cartItem = cartList.find(each => each.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  decrementCartItemQuantity = dish => {
    const {cartList} = this.state
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }

  incrementCartItemQuantity = dish => {
    const {cartList} = this.state
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}
      this.setState(prevState => ({
        cartList: [...prevState.cartList, newDish],
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      }))
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            getQuantity: this.getQuantity,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            removeAllCartItems: this.removeAllCartItems,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}
export default App
