import React, {useEffect} from 'react';
import ViewModeEnum from '../../../enums/viewModeEnum';
import { ProductsDetailsContext } from '../../../products-details-context';
import { ViewProductContext } from '../../../view-product-context';
import styles from './ListActions.module.css';

const ListActions = () => {
    const { viewProduct, setViewProduct } = React.useContext(ViewProductContext);
    const { productsDetails, setProductsDetails } = React.useContext(ProductsDetailsContext);

    const handleAddClick = () => {
        setViewProduct({
            ...viewProduct,
            mode: ViewModeEnum.Create,
            product: { ID: undefined, Name: '', Description: '', Price: '', Date: undefined }
        });
    }

    const handleSortByChanged = (value) => {
        let sortedArray = [...productsDetails.products];
        sortedArray.sort((a, b) => {
            return a[value] > b[value] > 0 ? 1 : -1;
        });
        setProductsDetails({
            ...productsDetails,
            products: sortedArray,
            sortBy: value
        });
    }

    useEffect(() => {
        handleSortByChanged(productsDetails.sortBy)
    }, [])

    return (
        <div className={styles.container}>
            <div>
                <button className={styles.addProductButton} onClick={handleAddClick}>+ Add</button>
            </div>
            <select value={productsDetails.sortBy} onChange={(event) => (handleSortByChanged(event.target.value))}>
                <option value='Name' >Name </option>
                <option value='CreationDate' >Recently Added </option>
            </select>
        </div>

    )
}

export default ListActions;
