import React from 'react';
import axios from 'src/common/myAxios';
import history from '../history';

const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    let url_params = history.location.pathname.split("/");
    let prms = null;
    if(url_params.indexOf('edit') > -1){
      prms = url_params[url_params.length-1];
    }
    this.state = {
      page:'home',
      added:false,
      msg:false,
      data:[],
      edit_id:prms,
      product_name: '',
      price: '',
      barcode: '',
      barcodes: '',
      description: '',
      images: '',
      image: '',
      redirectToReferrer: false,
    };
    // if(window.location.search){
    //   var searchPrms = window.location.search.split("=");
    //   if (searchPrms[1]) {
    //     axios.get('/api/product/'+searchPrms[1]).then((res) => {
    //       this.setState({
    //           edit_id: res.data._id,
    //           product_name: res.data.name,
    //           price: res.data.price,
    //           description: res.data.description,
    //           barcode: res.data.qrcode,
    //       });
    //     }).catch(error => {
    //         console.log(error.response)
    //     });
    //   }
    // }
    
    this.onChange = this.onChange.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.add_product = this.add_product.bind(this);
    this.logout = this.logout.bind(this);
    this.San_Alert = this.San_Alert.bind(this);
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
              image: res.data.product_image,
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
  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState({redirectToReferrer: true});
  }

  San_Alert(){
    const added = this.state.added;
    if (added) {
      return (<div className="alert alert-success">
      <strong>Success!</strong> Product Added.
      </div>)
    }
    return (<div className="alert alert-success">
    <strong>Success!</strong> Product Added.
    </div>)
  }

  render() {
    // console.log(this.state)
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    let addedAlert;
    console.log(window.location.search);
    if (this.state.added) {
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
      <div className="container">
      <div className="row">
      <div className="col-md-6">
      <h1>{product_type}</h1>
      {addedAlert}
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
      <div className="form-group">
      <label for="productname" className="loginFormElement">Product Name:</label>
      <input className="form-control" id="productname" type="text" placeholder="Enter Product Name" name="product_name" onChange={this.onChange} />
      </div>
      <div className="form-group">
      <label for="productprice" className="loginFormElement">Product Price</label>
      <input className="form-control"  id="productprice" type="text" placeholder="Enter Product Price" name="price" onChange={this.onChange}/>
      </div>
      <div className="form-group">
      <label for="productname" className="loginFormElement">Barcode Text:</label>
      <input className="form-control" id="barcode" type="text" placeholder="Enter Barcode Text" name="barcode" onChange={this.onChange} />
      </div>
      <div className="form-group">
      <label className="control-label">Product Image</label>
      <input className="filestyle" data-icon="false" type="file" name="image" onChange={this.imageUpload} />
      </div>
      <div className="form-group">
      <label className="loginformelement" for="productdescription">Product Description</label>
      <textarea className="form-control" rows="5" id="comment" placeholder="Enter Product Description" name="description" onChange={this.onChange} ></textarea>
      <div className="container">
      </div>
      <button type="button" id="loginSubmit" className="btn btn-success loginFormElement" onClick={() => this.add_product()}>Save</button>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Home;
