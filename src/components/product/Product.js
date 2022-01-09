import styles from './Product.module.css';
import { ViewProductContext } from '../../view-product-context';
import React from 'react'
import ViewModeEnum from '../../enums/viewModeEnum';

const Product = ({ product, handleDelete }) => {
    const { viewProduct, setViewProduct } = React.useContext(ViewProductContext);

    const handleProductClick = () => {
        setViewProduct({ ...viewProduct, product, mode: ViewModeEnum.Edit });
    }

    return (
        <div className={styles.container} onClick={handleProductClick}>
            <div className={styles.imgInfoSection}>
                <img className={styles.poductImg} src='/assets/product.png' />
                <div className={styles.infoSection}>
                    <div>
                        {product.Name}
                    </div>
                    <div>
                        {product.Description}
                    </div>
                </div>
            </div>
            <div className={styles.buttonSection}>
                <button className={styles.deleteButton} onClick={(event) => handleDelete(event, product.ID)}>Delete</button>
            </div>
        </div>
    )
}

export default Product;
