import React from 'react';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { render } from 'react-dom';
import {STLViewer} from 'react-stl-obj-viewer';
import {addItem} from '../redux/actions';
import { connect } from 'react-redux'
import SmartSlider from 'react-smart-slider';
import config from '../config';
import { useCart } from "react-use-cart";

function AddCartButton(data) {
    const { addItem } = useCart();
    return <input className="order-btn" type="button" value="Add To Cart" onClick={() => addItem(data.item)}></input>
}

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            viewType: 'image'
        }
    }
    
    componentDidMount() {
    
        fetch(`${config.server_url}/api/products/${this.props.match.params.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                data:data[0]
            })
        });
    }

    render() {
       let slidesArray = this.state.data  && this.state.data.parts ? this.state.data.parts.map((part) => {
           return {
               childrenElem: <div><a href={encodeURI(config.server_url + '/' + part.url)} target="_blank" download><button class="btn"><i class="fa fa-download"></i> Download</button></a><STLViewer
               onSceneRendered={(element) => {
                   console.log(element)
               }}
               sceneClassName="test-scene"
               className="obj"
               url={encodeURI(config.server_url + '/' + part.url)}
               modelColor="#FF0000"/></div>
           }
       }) : [];

       let imagesArray = this.state.data  && this.state.data.images ? this.state.data.images.map((image) => {
            return {
                url: encodeURI(config.server_url + '/' + image.url)
            }
        }) : [];
        return this.state.data ? 
        <div className="content">
            <div className="prod-vert">
            <div><h2>{this.state.data.name}</h2></div>
                <div className="product">
                    <img class="productimg" src={encodeURI(config.server_url + '/' + this.state.data.thumbnail)}></img>
                    <div className="prod-details">
                        <h5>{this.state.data.name}</h5>
                        <p><label>price: </label>{this.state.data.price + '$'}</p>
                        <input style={{marginBottom: '20px'}}type="button" value="download all .stl files"></input>
                        {/* <AddCartButton
                            product={this.state.data}
                            styles={{ backgroundColor: '#009688', color: 'white', border: '0' }}
                          /> */}
                        <AddCartButton item={this.state.data}/>
                    </div>
                </div>
                <div>
                        {/* <Switch on="3D" off="image" value={this.state.viewType} onChange={() => this.setState({viewType: this.state.viewType == 'image' ? '3D' : 'image'})} />
                        <label>{this.state.viewType == 'image' ? 'Image view' : '3D view'}</label>

                        <Switch off="3D" on="image" value={this.state.viewType} onChange={() => this.setState({viewType: this.state.viewType != 'image' ? '3D' : 'image'})} />
                        <label>{this.state.viewType != 'image' ? 'Image view' : '3D view'}</label> */}
                        <button className={`toggle-btn`} onClick={() => this.setState({viewType: this.state.viewType == 'image' ? '3D' : 'image'})}>
                            {this.state.viewType != 'image' ? 'Images view' : '3D view'}
                        </button>
                    {
                        this.state.data.parts && this.state.data.parts.length > 0 ? 
                        <SmartSlider slides={this.state.viewType == '3D' ? slidesArray : imagesArray} autoSlide={false} buttonShape="square"/> 
                        : null
                    }
               
                </div>
                <div>
                    <h4>About this item:</h4>
                    <p>Etiam vulputate dapibus pellentesque. Ut sodales a orci eu porttitor. Fusce vel risus eu arcu egestas blandit nec id sapien. Donec sed orci ex. Suspendisse sed varius felis. Duis sit amet lorem venenatis, tempor velit in, euismod orci. Nulla quis tellus nisl. Sed sem enim, semper eleifend semper a, fringilla a felis. Proin eget odio fringilla, ornare nisi in, iaculis purus. Nunc gravida et felis et iaculis. Maecenas elementum aliquam elit, non consequat erat semper non. Nam sed neque eu turpis tincidunt tincidunt eu quis velit. Nam mi leo, facilisis ut felis sed, tempus convallis ipsum.</p>
                </div>
            </div>
            <hr class="rounded"></hr>
            <div className="prod-vert">
                <h4>got a custom .stl file?</h4>
                <a href="/upload"><input className="upload-btn" style={{width:'200px', margin:'auto'}} type="button" value="upload here!"></input></a>
            </div>
        </div> : null
    }
}


const mapStateToProps = (state /*, ownProps*/) => {
    return {
    //   counter: state.counter
    }
}

const mapDispatchToProps = {addItem};//{ increment, decrement, reset }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)