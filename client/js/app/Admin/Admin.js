import React from 'react';
import  { Redirect } from 'react-router-dom';
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

class Admin extends React.Component {
  constructor(props) {
    super(props);
    let url_params = history.location.pathname.split("/");
    console.log(url_params);
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
    if (!localStorage.getItem('jwtToken')) {
      return (<Redirect to={'/admin/login'}/>)
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
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header card-header-warning card-header-icon">
                  <div className="card-icon">
                    <i className="material-icons">content_copy</i>
                  </div>
                  <p className="card-category">Used Space</p>
                  <h3 className="card-title">49/50
                    <small>GB</small>
                  </h3>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons text-danger">warning</i>
                    <a href="#pablo">Get More Space...</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header card-header-success card-header-icon">
                  <div className="card-icon">
                    <i className="material-icons">store</i>
                  </div>
                  <p className="card-category">Revenue</p>
                  <h3 className="card-title">$34,245</h3>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">date_range</i> Last 24 Hours
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header card-header-danger card-header-icon">
                  <div className="card-icon">
                    <i className="material-icons">info_outline</i>
                  </div>
                  <p className="card-category">Fixed Issues</p>
                  <h3 className="card-title">75</h3>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">local_offer</i> Tracked from Github
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header card-header-info card-header-icon">
                  <div className="card-icon">
                    <i className="fa fa-twitter"></i>
                  </div>
                  <p className="card-category">Followers</p>
                  <h3 className="card-title">+245</h3>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">update</i> Just Updated
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

export default Admin;
