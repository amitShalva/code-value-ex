import styles from './DetailsView.module.css';
import React from 'react';
import { ViewProductContext } from '../../../view-product-context';
import { ProductsDetailsContext } from '../../../products-details-context';
import ViewModeEnum from '../../../enums/viewModeEnum';

const DetailsView = () => {
    const { viewProduct, setViewProduct } = React.useContext(ViewProductContext);
    const { productsDetails, setProductsDetails } = React.useContext(ProductsDetailsContext);

    const editedProductName = productsDetails.products.find((product) => product.ID === viewProduct.product?.ID)?.Name || 'New Product';

    const isDisabled = () => {
        return !viewProduct.product.Name || !viewProduct.product.Price || viewProduct.product.Price <= 0;
    }

    const handleProductEdit = (event, key) => {
        setViewProduct(
            {
                ...viewProduct,
                product: {
                    ...viewProduct.product,
                    [key]: event.target.value
                }
            })
    }

    const handleSave = (event) => {
        event.preventDefault();
        let copiedProducts = [...productsDetails.products];
        if (viewProduct.mode === ViewModeEnum.Edit) {
            let modifiedProductIndex = copiedProducts.findIndex((product) => product.ID === viewProduct.product.ID);
            copiedProducts[modifiedProductIndex] = viewProduct.product;
        } else { // Create mode
            viewProduct.product.CreationDate = new Date();
            viewProduct.product.ID = 'ID-' + viewProduct.product.CreationDate.getTime();
            copiedProducts.push(viewProduct.product);
        }
        copiedProducts.sort((a, b) => {
            return a[productsDetails.sortBy] > b[productsDetails.sortBy] > 0 ? 1 : -1;
        });
        setProductsDetails({
            ...productsDetails,
            products: copiedProducts
        });
        setViewProduct({ mode: undefined, product: undefined });
    }

    return (
        <div className={styles.container}>
            {viewProduct.mode &&
                <form onSubmit={handleSave} className={styles.productForm}>
                    {editedProductName + ' Details'}
                    <div>
                        <img className={styles.productImg} src='/assets/product.png' />
                    </div>
                    <label>Name:
                        <br />
                        <input
                            type='text'
                            className={styles.textInput}
                            value={viewProduct.product.Name}
                            onChange={(event) => handleProductEdit(event, 'Name')}
                        />
                    </label>
                    <br />
                    <label>Description:
                        <br />
                        <input
                            type='text'
                            className={styles.textInput}
                            value={viewProduct.product.Description}
                            onChange={(event) => handleProductEdit(event, 'Description')}
                        />
                    </label>
                    <br />
                    <label>Price:
                        <br />
                        <input
                            type='number'
                            value={viewProduct.product.Price}
                            onChange={(event) => handleProductEdit(event, 'Price')}
                        />
                        <label> $ </label>
                    </label>
                    <br />
                    <input className={styles.saveBtn} type='submit' value='Save' disabled={isDisabled()} />
                </form>
            }
            {/* </div> */}
        </div>
    )
}

export default DetailsView;
