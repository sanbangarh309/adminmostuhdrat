import React from 'react';
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

class Category extends React.Component {
  constructor(props) {
    super(props);
    let url_params = history.location.pathname.split("/");
    let prms = null;
    if(url_params.indexOf('edit') > -1){
      prms = url_params[url_params.length-1];
    }
    this.state = {
      page:'Category',
      added:false,
      msg:false,
      data:[],
      edit_id:prms,
      name: '',
      description: '',
      image: '',
      redirectToReferrer: false,
    };
    
    this.onChange = this.onChange.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.add_category = this.add_category.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  getCategories() {
    axios.post('/api/get_categories').then((res) => {
          console.log(res.data);
          this.setState({
            data: res.data,
          });
      });
  }

  add_category() {
    console.log(this.state)
    if(this.state.name){
      axios.post('/api/add_category',this.state).then((res) => {
        this.setState({
          added: true,
          msg: this.state.edit_id ? 'Category Updated Successfully' : 'Category Added',
        });
        this.getCategories();
      }).catch(error => {
        console.log(error.response)
      });
    }
  }

  componentDidMount() {
      if (this.state.edit_id) {
        axios.get('/api/category/'+this.state.edit_id).then((res) => {
          console.log(res.data)
          this.setState({
              edit_id: res.data._id,
              name: res.data.name,
              description: res.data.description,
          });
        }).catch(error => {
            console.log(error.response)
        });
      }
      this.getCategories();
  }

  imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({images:base64});
    });
  }

  delete_category(id){
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this category?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        axios.delete('/api/category/'+id).then((res) => {
          axios.post('/api/get_categories').then((res1) => {
              this.setState({
                data: res1.data,
              });
          });
        });
        swal("Deleted!", "Your category has been deleted!", "success");
      } else {
        swal("Your category is safe!");
      }
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
    // <NavLink to={'/category/edit/'+category._id}></NavLink>
    // console.log(this.state)
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    let addedAlert;
    console.log(window.location.search);
    if (this.state.added) {
      addedAlert = <div className="alert alert-success">
      <strong>Success!</strong> {this.state.msg}
      </div>;
    } else {
      addedAlert = '';
    }
    let type = 'Add Category'
    if (this.state.edit_id) {
      type = 'Edit Category'
    }
    return (
      <div className="content">
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">Category</h4>
                </div>
                <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                        <div className="form-group">
                          <label className="bmd-label-floating">Category Name</label>
                          <input type="text" name="name" onChange={this.onChange} className="form-control"/>
                        </div>
                      </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                        <div className="form-group">
                          <label className="bmd-label-floating">Descriptiopn</label>
                          <textarea className="form-control" rows="5" id="comment" name="description" onChange={this.onChange} ></textarea>
                        </div>
                      </div>
                </div>
                <button type="button" id="loginSubmit" className="btn btn-primary pull-right" onClick={() => this.add_category()}>Save</button>
                </div>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title ">Categories</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                      <thead className=" text-primary">
                        <th>
                          Name
                        </th>
                        <th>Actions</th>
                      </thead>
                      <tbody>
                        {this.state.data.map((category, index) => {
                          return <tr key={ index }><td>{category.name}</td><td>
                          <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                <i class="material-icons">edit</i>
                              </button>
                              <button type="button" rel="tooltip" onClick={() => this.delete_category(category._id)} title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="material-icons">close</i>
                              </button></td></tr>;
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

export default Category;
