import React from 'react';
import styles from './ProductList.module.css';
import { ProductsDetailsContext } from '../../../products-details-context';
import { ViewProductContext } from '../../../view-product-context';
import Product from '../../product/Product';


const ProductList = () => {
    const { productsDetails, setProductsDetails } = React.useContext(ProductsDetailsContext);
    const { viewProduct, setViewProduct } = React.useContext(ViewProductContext);

    const deleteProdut = (event, productId) => {
        event.stopPropagation();
        if (productId === viewProduct.product.ID) {
            setViewProduct({
                ...viewProduct,
                mode: undefined,
                product: undefined
            });
        }
        setProductsDetails({
            ...productsDetails,
            products: productsDetails.products.filter(product => product.ID !== productId)
        })
    }

    return (
        <div className={styles.container}>
            {
                productsDetails.products.map(product =>
                (<div key={product.ID}>
                    <Product product={product} handleDelete={deleteProdut} />
                </div>)
                )
            }
        </div>
    )
}

export default ProductList;