import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { combineReducers, createStore } from 'redux';
import { connect } from 'react-redux';
import updateUser from './actions/user-actions';
import { updateProduct, addProduct, deleteProduct, searchProduct } from './actions/products-actions';
import _ from 'lodash';
import { Button, Glyphicon } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Route, Link  } from 'react-router-dom';
import HomePage from './homepage';
import EditProduct from './edit-product';
import { UpdateComponent } from './AddUpdateProduct';

class App extends Component {
    constructor(props){
        super(props);
        this.onUpdateUser = this.onUpdateUser.bind(this);
        // this.onUpdateProduct = this.onUpdateProduct.bind(this);
        // this.onAddProduct = this.onAddProduct.bind(this);
        // this.onDeleteProduct = this.onDeleteProduct.bind(this);
    }
    onUpdateUser(e){
        console.log('clicked', e.target.value);
        this.props.onUpdateUser(e.target.value);
    }
    onUpdateProduct(e){
      console.log('updating product ', e);
      this.props.onUpdateProduct(e);
    }
    onAddProduct(e){
      console.log('adding product ', e);
      this.props.onAddProduct(e);
    }
    onDeleteProduct(e){
      console.log('delete product ', e);
      this.props.onDeleteProduct(e);
    }    
    onSearchProduct(e){
      console.log('search product ', e);
      this.props.onSearchProduct(e);
    }
  render() {
      console.log('props ', this.props);
      var imgStyle = {
        width: '150px',
        height: '100px'
      };
    return (
      <div className=" App">
        <header className="App-header">
          <img src="https://angular.io/assets/images/logos/angular/logo-nav@2x.png" className="App-lo" alt="logo" />
          <h1 className="App-title">Welcome to app</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <HomePage />
        <div className="navigation">
            {/* <Route exact path="/" component={HomePage} /> */}
            {/* <Route exact path="/edit" component={EditProduct} /> */}
            <Route exact path="/update" component={UpdateComponent} />
            
          </div>
        <div className="well row">
          <div className="col-xs-9">
          <input ref="serachText" onChange={e => {
            console.log('serachText  ', e, this.refs['serachText'].value);
            this.props.onSearchProduct(this.refs['serachText'].value);
            }} 
            placeholder="Search here" className="serachText" name="serachText" /><br />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-9">
            {
              this.props.products.map((tag, i) => {
                return (
                  <div className="col-xs-3" key={tag.id} >
                  {/* <Button onClick={e => {
                          console.log('clicked edit ', e, tag);
                             for (const field in tag) {
                              this.refs[field].value = tag[field];
                            }
                            this.refs['submitType'].innerText = 'Update Product'; 
                            return (<EditProduct product={tag} /> )
                          }} >
                        <Glyphicon glyph="edit" />
                      </Button> */}
                      <Link to={`/edit/${tag.id}`}>
                      <Glyphicon glyph="edit" />
                      </Link>
                      {/* <Route exact path="/edit/"  component={EditProduct}  /> */}
                      
                      <Button onClick={e => {
                          console.log('clicked remove ', e, tag);
                          this.props.onDeleteProduct(tag);
                          }} >
                        <Glyphicon glyph="remove"  />
                      </Button>
                  <div className="card" style={{ width: '18rem' }}>
                    <img className="card-img-top" src="./Mutual_Mobile.svg.png" style={imgStyle} alt="Card image cap" />
                    <div className="card-body">
                      <h3 className="card-title">{tag.phone}</h3>
                      <p className="card-text">
                      {tag.model}<br />
                        {tag.description}
                        </p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                  </div>
                );
              })
            }
            
          </div>
          <div className="col-xs-3">
            {/* <form
              onSubmit={e => {
                e.preventDefault();
                const formData = {};
                for (const field in this.refs) {
                  formData[field] = this.refs[field].value;
                  this.refs[field].value = '';
                }
                console.log('-->', this.refs['submitType'].innerText, this.refs, formData);
                if(this.refs['submitType'].innerText == "Add Product"){
                  formData.id = +new Date;
                  this.props.onAddProduct(formData);
                }
                else
                  this.props.onUpdateProduct(formData);

                this.refs['submitType'].innerText = "Add Product";
              }}
            >
              <input ref="phone" placeholder="phone" className="phone" name="phone" /><br />
              <input ref="model" placeholder="model" className="model" name="model" /><br />
              <hidden ref="id" placeholder="id" className="id" name="id" /><br />
              <input ref="description" placeholder="description" className="description" name="description" /><br /><br />
              <button type="submit" ref="submitType">
                Add Product
        </button>
            </form> */}
            <Route path='/edit/:id' component={EditProduct} />
          </div>
        </div>
        <br />
        {this.props.user}
        <br /><br />
        
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
    products: state.products,
    user: state.user
});
const mapActionsToProps = {
   onUpdateUser: updateUser,
   onAddProduct: addProduct,
   onUpdateProduct: updateProduct,
   onDeleteProduct: deleteProduct,
   onSearchProduct: searchProduct
};
export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
