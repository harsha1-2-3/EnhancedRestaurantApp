import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  getQuantity: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
