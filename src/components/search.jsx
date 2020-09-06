import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { useCart } from "react-use-cart";

import { useHistory } from "react-router-dom";

function CartCounter(props) {
    const { totalItems } = useCart();
    return (
        <a href="javascript:;" onClick={() => props.toggleCart()}>
        <div className="notification"> 
        <div className="cart"></div>
        <span className="badge"><label className="badge-lbl">{totalItems}</label></span> 
        </div>
        </a>
    )
}

function Cart(props) {
    const history = useHistory();
    const {
      isEmpty,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
    } = useCart();
   

    if (!props.isVisible) return null;
    if (isEmpty) return <div className="cart-container"><p>Your cart is empty</p></div>;

    return (
        <div className="cart-container">
      <div className="container">
          <a href="javascript:;" className="close" onClick={() => props.toggleCart()}></a>
        <div className="notification"><div className="cart2"></div></div>
        <h3> Your Cart  </h3>
   
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.quantity} x {item.name} &mdash;&nbsp;
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button onClick={() => removeItem(item.id)}>&times;</button>
            </li>
          ))}
        </ul>
        <div className="checkout-btn">
            <input type="button"  value="checkout" onClick={() => {
                props.toggleCart();
                history.push("/checkout");
                window.location.reload(); 
            }}/>
        </div>
      </div>
      </div>
    );
  }

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
        this.categories = ['home', 'office', 'garden', 'tools', 'toys', 'kitchen', 'bathroom', 'misc.', 'XXX', ];
    }
 
    toggleCart() {
        this.setState({isVisible: !this.state.isVisible})
    }

    render () {
        
        return <div>
            <div className="search"> 
            <input type="text" placeholder={' -- Ex: "dog knee brace" -- '}></input>
            <select disabled>
            <option disabled selected value> -- select category -- </option>
                {
                    this.categories.map((category) => {
                        return <option value={category}>{category}</option>
                    })
                }
            </select>
            <button className="search-btn"  value="Search" disabled>Search</button><div className="vert-fix">&nbsp;or&nbsp;</div>
            <a style={{marginTop: '-5px'}} href="/admin" ><button className="upload-btn"  value="upload .STL file">upload a product</button></a>
            <CartCounter toggleCart={() => this.toggleCart()}/>
            <Cart toggleCart={() => this.toggleCart()} isVisible={this.state.isVisible}/>
          
        </div>
        
        
        </div>
    }
}


const mapStateToProps = (state /*, ownProps*/) => {
    return {
    //    counter: state.cart.items ? state.cart.items.length : 0
    }
}

const mapDispatchToProps = {};//{ increment, decrement, reset }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
// export default Search;