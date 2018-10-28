import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import HomePage from './homepage';
import axios from 'axios';
//import getProductByID from './actions/products-actions';
import { getProductByID, updateProduct, addProduct }  from './actions/products-actions';
class EditProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productDetails: {
        id: '',
        phone: '',
        model: '',
        description: ''
      }
    };
  }

  componentDidMount() {
    console.log('product ', this.props.product);
    // axios.get('http://localhost:3000/products/'+this.props.match.params.id)
    //   .then(res => {
    //     this.setState({ product : res.data });
    //     console.log(this.state.product);
    //   });
      //this.props.getProductByID(this.props.match.params.id);
      
      this.setState({productDetails: this.props.product.find(x => { return x.id == this.props.match.params.id })});
      console.log('product new ', this.props.product, this.state);
  }

  componentWillReceiveProps(nextProps) {
    //this.setState({productDetails: this.props.product.find(x => { return x.id == this.props.id }) });
    this.setState({productDetails: this.props.product.find(x => { return x.id == nextProps.match.params.id }) });
    console.log('nextProps', nextProps, this.props.product, this.state);
  }

  onChange = (e) => {
    const state = this.state.productDetails
    state[e.target.name] = e.target.value;
    this.setState({productDetails:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { id, phone, model, description } = this.state.productDetails;
    console.log('submitting ', this.state.productDetails);
    if(this.state.productDetails.id)
      this.props.updateProduct(this.state.productDetails);
    else
      this.props.addProduct(this.state.productDetails);

    // axios.put('http://localhost:3000/products/'+this.props.match.params.id, { id, phone, model, description  })
    //   .then((result) => {
    //     this.props.history.push("/show/"+this.props.match.params.id)
    //   });
  }
render(){
  return (
    this.state.productDetails ? 
<div className="">
<div className="panel panel-default">
  <div className="panel-heading">
    <h3 className="panel-title">
      Edit Product
    </h3>
  </div>
  <div className="panel-body">
    
    <h4><Link to={`/show/${this.state.productDetails.id}`}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Product</Link></h4>
    <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <label htmlFor="isbn">Id:</label>
        <input type="text" className="form-control" name="id" value={this.state.productDetails.id} onChange={this.onChange} placeholder="ISBN" />
      </div>
      <div className="form-group">
        <label htmlFor="title">phone:</label>
        <input type="text" className="form-control" name="phone" value={this.state.productDetails.phone} onChange={this.onChange} placeholder="Title" />
      </div>
      <div className="form-group">
        <label htmlFor="author">Model:</label>
        <input type="text" className="form-control" name="model" value={this.state.productDetails.model} onChange={this.onChange} placeholder="Author" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input type="text" className="form-control" name="description" value={this.state.productDetails.description} onChange={this.onChange} placeholder="Description" />
      </div>
      <button type="submit" className="btn btn-default">Submit</button>
    </form>
  </div>
</div>
</div>
: ""
  )
}
}
function mapStateToProps (state) {
  console.log('state product ', state);
  return {
    product: state.products
  };
}

export default connect(mapStateToProps, {getProductByID, updateProduct, addProduct })(EditProduct);
