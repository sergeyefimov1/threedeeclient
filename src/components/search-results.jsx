import React from 'react'; 
import { render } from 'react-dom';
import {ProductCard} from 'react-ui-cards';
import config from '../config';

export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount() {
        fetch(`${config.server_url}/api/products`)
        .then(response => response.json())
        .then(data => this.setState({data:data}));
    }

    render() {
        let i,j,temp,chunk = 3;
        let products = [];
        for (i=0,j=this.state.data.length; i<j; i+=chunk) {
            temp = this.state.data.slice(i,i+chunk);
            products.push(temp);
        }
        
        return <div className="content">
            <div className="search-row">
            {
                
                products.map((row) => {
                    return <div className="flex-horizontal">
                        {
                        row.map((item) => {
                            return <ProductCard
                                    photos={[encodeURI(config.server_url + '/' + item.thumbnail)]}
                                    price={item.price + '$'}
                                    productName={item.name}
                                    description={item.name}
                                    buttonText='Get it!'
                                    url={`/product/${item.id}`}/>
                            })
                        }
                    </div>
                    
                })
            }
            </div>
        </div>
    }
}