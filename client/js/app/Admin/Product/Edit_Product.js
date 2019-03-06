import React from 'react';
import  { Redirect } from 'react-router-dom';
import axios from 'src/common/myAxios';
import history from '../../history';
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

class Edit_Product extends React.Component {
  constructor(props) {
    super(props);
    let url_params = history.location.pathname.split("/");
    let prms = null;
    if(url_params.indexOf('edit') > -1){
      prms = url_params[url_params.length-1];
      console.log(prms);
    }
    this.state = {
      page:'home',
      added:false,
      msg:false,
      data:[],
      edit_id:prms,
      product_name: '',
      product_data:[],
      price: '',
      cats:[],
      barcode: '',
      barcodes: '',
      description: '',
      images: '',
      image: '',
      category: '',
      redirectToReferrer: false,
    };
   
    
    this.onChange = this.onChange.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.add_product = this.add_product.bind(this);
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
          image: res.data.product_image,
        });
      }).catch(error => {
        console.log(error.response)
      });
    }
  }

  componentDidMount() {
      if (this.state.edit_id) {
        axios.get('/api/product/'+this.state.edit_id).then((res) => {
          console.log(res.data)
          this.setState({
              edit_id: res.data._id,
              product_name: res.data.name,
              price: res.data.price,
              description: res.data.description,
              barcodes: res.data.qrcode,
              image: res.data.images[0],
              category: res.data.category,
          });
        }).catch(error => {
            console.log(error.response)
        });
      }
  }

  imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({images:base64});
    });
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render() {
    // console.log(this.state)
    if (!localStorage.getItem('jwtToken')) {
      return (<Redirect to={'/admin/login'}/>)
    }
    let addedAlert;
    if (this.state.added) {
      swal("Updated", this.state.msg, "success");
      addedAlert = <div className="alert alert-success">
      <strong>Success!</strong> {this.state.msg}.
      </div>;
    } else {
      addedAlert = '';
    }
    let product_type = 'Add Product'
    if (this.state.edit_id) {
      product_type = 'Edit Product'
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
                        <select value={this.state.category} class="form-control" id="category" name="category" onChange={this.onChange}>
                        {this.state.cats.map((cat, index) => {
                            let select = '';
                            if(this.state.category == cat._id){
                                select = 'selected="selected"';
                            }
                           return <option {...select} value={cat._id}>{cat.name}</option>;
                        })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                          <div className="form-group">
                            <label className="bmd-label-floating">Product Name</label>
                            <input className="form-control" value = {this.state.product_name} id="productname" type="text" name="product_name" onChange={this.onChange} />
                          </div>
                    </div>
                    <div className="col-md-4">
                          <div className="form-group">
                            <label className="bmd-label-floating">Product Price</label>
                            <input className="form-control" value = {this.state.price} id="productprice" type="text" name="price" onChange={this.onChange}/>
                          </div>
                    </div>
                    <div className="col-md-4">
                          <div className="form-group">
                            <label className="bmd-label-floating">Barcode Text</label>
                            <input className="form-control" value = {this.state.barcode} id="barcode" type="text" name="barcode" onChange={this.onChange} />
                            <img src = {'/files/qrcodes/'+this.state.barcodes} alt="No Barcode" width={50} height={50} />
                          </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                          <div className="form-group">
                              <label className="control-label">Product Image</label>
                              <input className="filestyle" data-icon="false" type="file" id="image_product" name="image" onChange={this.imageUpload} />
                              <button type="button" id="loginSubmit" className="btn btn-primary pull-right" onClick={() => this.triggerClick()}>Browse Image</button>
                              <img src = {'/files/products/'+this.state.image} alt="No Image" width={50} height={50} />
                            </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                              <label className="control-label">Product Description</label>
                              <textarea className="form-control" value = {this.state.description} rows="5" id="comment" name="description" onChange={this.onChange} ></textarea>
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
</td><td><NavLink to={'/product/edit/'+product._id}><i class="fa fa-pencil" aria-hidden="true"></i></NavLink>
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

export default Edit_Product;
