import DetailsView from './detailsView/DetailsView';
import ProductList from './productList/ProductList';
import styles from './Products.module.css';

const Products = () => {
    return (
        <div className={styles.container}>
            <ProductList />
            <DetailsView />
        </div>
    )
}

export default Products;
