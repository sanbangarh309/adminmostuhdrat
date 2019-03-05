import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Product.css';
import axios from 'src/common/myAxios';
// import SanAlert from '../components/SanAlert';
import swal from 'sweetalert';
var NavLink = require('react-router-dom').NavLink;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:'product',
      product_data:[]
    };
    this.getUserFeed = this.getUserFeed.bind(this);
    this.delete_product = this.delete_product.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getUserFeed()
  }

  getUserFeed() {
    axios.post('/api/get_products').then((res) => {
      console.log(res.data);
            this.setState({
                product_data: res.data,
            });
    });
  }

  delete_product(id){
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this product?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        axios.delete('/api/product/'+id).then((res) => {
          this.getUserFeed()
        });
        swal("Deleted!", "Your product has been deleted!", "success");
      } else {
        swal("Your Product is safe!");
      }
    }); 
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    return (
      <div className="container">
  <h2>Products</h2>
  <table className="table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Qrcode</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {this.state.product_data.map((product, index) => {
       let image = <img src = {'/files/products/'+product.product_image} alt="No Product Image" width={50} height={50} />
       let qrcode = <img src = {'/files/qrcodes/'+product.qrcode} alt="No Qrcode" width={50} height={50} />
       return <tr key={ index }><td>{image}</td><td>{qrcode}</td><td>{product.name}</td><td>{product.price}</td><td>{product.description}</td><td><button type="button" onClick={() => this.delete_product(product._id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
</td><td><NavLink to={'/product/edit/'+product._id}><i class="fa fa-pencil" aria-hidden="true"></i></NavLink>
</td></tr>;
    })}
    </tbody>
  </table>
</div>


    );
  }
}

export default Product;
