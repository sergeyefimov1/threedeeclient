import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'
// import {
//     Cart,
//     Product,
//     CheckoutButton,
//     cartLocalization,
//     cartReducer,
//     setCartCurrency
//   } from "react-shopping-cart";

// export default combineReducers({cart: Cart, routing: routerReducer});
export default combineReducers({ routing: routerReducer});