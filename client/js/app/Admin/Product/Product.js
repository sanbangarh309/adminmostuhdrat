import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Product.css';
import axios from 'src/common/myAxios';
// import SanAlert from '../components/SanAlert';
import swal from 'sweetalert';
var NavLink = require('react-router-dom').NavLink;
const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:'product',
      product_data:[],
      cats:[],
      edit_id:null,
      product_name: '',
      price: '',
      barcode: '',
      barcodes: '',
      description: '',
      images: '',
      category: '',
      redirectToReferrer: false,
    };
    this.getUserFeed = this.getUserFeed.bind(this);
    this.add_product = this.add_product.bind(this);
    this.delete_product = this.delete_product.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getUserFeed();
    this.getCategories();
  }

  getUserFeed() {
    axios.post('/api/get_products').then((res) => {
      console.log(res.data);
            this.setState({
                product_data: res.data,
            });
    });
  }

  getCategories() {
      axios.post('/api/get_categories').then((res) => {
          console.log(res.data);
          this.setState({
            cats: res.data,
          });
      });
  }

  add_product() {
    console.log(this.state)
    if(this.state.product_name && this.state.price){
      axios.post('/api/add_product',this.state).then((res) => {
        this.setState({
          added: true,
          msg: this.state.edit_id ? 'Product Updated Successfully' : 'Product Added',
          barcodes: res.data.qrcode,
          images: res.data.product_image,
        });
        this.getUserFeed();
      }).catch(error => {
        console.log(error.response)
      });
    }
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

  imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({images:base64});
    });
  }

   triggerClick = (e) => {
      $('#image_product').click();
   }

  render() {
    if (!localStorage.getItem('jwtToken')) {
      return (<Redirect to={'/admin/login'}/>)
    }
    return (
    <div className="content">
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
              <div className="card">
                  <div className="card-header card-header-primary">
                      <h4 className="card-title">Product</h4>
                  </div>
                  <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                      <label for="sel1">Select Category</label>
                        <select class="form-control" id="category" name="category" onChange={this.onChange}>
                        {this.state.cats.map((cat, index) => {
                           return <option value={cat._id}>{cat.name}</option>;
                        })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                          <div className="form-group">
                            <label className="bmd-label-floating">Product Name</label>
                            <input className="form-control" id="productname" type="text" name="product_name" onChange={this.onChange} />
                          </div>
                    </div>
                    <div className="col-md-4">
                          <div className="form-group">
                            <label className="bmd-label-floating">Product Price</label>
                            <input className="form-control"  id="productprice" type="text" name="price" onChange={this.onChange}/>
                          </div>
                    </div>
                    <div className="col-md-4">
                          <div className="form-group">
                            <label className="bmd-label-floating">Barcode Text</label>
                            <input className="form-control" id="barcode" type="text" name="barcode" onChange={this.onChange} />
                          </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                          <div className="form-group">
                              <label className="control-label">Product Image</label>
                              <input className="filestyle" data-icon="false" type="file" id="image_product" name="image" onChange={this.imageUpload} />
                              <button type="button" id="loginSubmit" className="btn btn-primary pull-right" onClick={() => this.triggerClick()}>Browse Image</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                              <label className="control-label">Product Description</label>
                              <textarea className="form-control" rows="5" id="comment" name="description" onChange={this.onChange} ></textarea>
                            </div>
                        </div>
                  </div>
                  <button type="button" id="loginSubmit" className="btn btn-primary pull-right" onClick={() => this.add_product()}>Save</button>
                  </div>
              </div>
          </div>
        </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h4 className="card-title ">Products</h4>
                  <p className="card-category"> Here is a subtitle for this table</p>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className=" text-primary">
                      <th>Image</th>
                      <th>Qrcode</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Actions</th>
                      </thead>
                      <tbody>
                        {this.state.product_data.map((product, index) => {
       let image = <img src = {'/files/products/'+product.images[0]} alt="No Product Image" width={50} height={50} />
       let qrcode = <img src = {'/files/qrcodes/'+product.qrcode} alt="No Qrcode" width={50} height={50} />
       return <tr key={ index }><td>{image}</td><td>{qrcode}</td><td>{product.name}</td><td>{product.price}</td><td>{product.description}</td><td><button type="button" onClick={() => this.delete_product(product._id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
</td><td><NavLink to={'/admin/product/edit/'+product._id}><i class="fa fa-pencil" aria-hidden="true"></i></NavLink>
</td></tr>;
    })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
