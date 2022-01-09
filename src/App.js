import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import ListActions from './components/products/listActions/ListActions';
import Products from './components/products/Products';
import { ProductsDetailsContext } from './products-details-context';
import { ViewProductContext } from './view-product-context';

const products = [
  {
    ID: 1,
    Name: 'Product 5',
    Description: 'Product 1 description',
    Price: 25,
    CreationDate: new Date(2000, 7,21)
  },
  {
    ID: 2,
    Name: 'Product 2',
    Description: 'Product 2 description',
    Price: 225,
    CreationDate: new Date(2001, 7,21)
  },
  {
    ID: 3,
    Name: 'Product 3',
    Description: 'Product 3 description',
    Price: 5,
    CreationDate: new Date(2002, 7,21)
  }
]


function App() {
  const [productsDetails, setProductsDetails] = useState(
    {
      products: products,
      sortBy: 'Name'
    }
  );

  const [viewProduct, setViewProduct] = useState(
    {
      mode: undefined,
      product: undefined
    }
  )

  return (
    <ViewProductContext.Provider value={{ viewProduct, setViewProduct }}>
      <ProductsDetailsContext.Provider value={{ productsDetails, setProductsDetails }}>
        <div className="App">
          <Header />
          <div className='body'>
            <ListActions/>
            <Products />
          </div>
        </div>
      </ProductsDetailsContext.Provider>
    </ViewProductContext.Provider>
  );
}

export default App;
