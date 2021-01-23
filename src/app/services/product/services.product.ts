import connection from '../../db/mysql';

export interface ProductInterface {
    brand_id: string;
    name: string;
    picture: string;
    price: number;
}
export interface ProductInterfaceFull extends ProductInterface {
    id: number;
}

export class ProductServices {
    /**
     * Get all Product data
     */
    getProduct() {
        const product = connection('product').whereNotNull('brand_id');
        return product;
    }

    /**
     * Get all Product data by brand
     */
    getProductByBrand(id: number) {
        const product = connection('product').where('brand_id', id);
        return product;
    }

    /**
     * Get Product data by ID
     * @param id Product ID
     */
    getProductById(id: number) {
        const product = connection('product').where('id', id).whereNotNull('brand_id');
        return product;
    }

    /**
     * Get Total Product
     */
    getTotalProduct() {
        const product = connection('product').whereNotNull('brand_id').count('id', { as: 'total' });
        return product;
    }

    /**
     * Get Total Product By Brand
     */
    getTotalProductByBrand(id: number) {
        const product = connection('product').where('brand_id', id).count('id', { as: 'total' });
        return product;
    }

    /**
     * Insert Product
     * @param data Product Data JSON
     */
    insertProduct(data: ProductInterface) {
        const product = connection('product').insert(data);
        return product;
    }

    /**
     * Update Product
     * @param id Product ID
     * @param data Product Data JSON
     */
    updateProductById(id: number, data: ProductInterface) {
        const product = connection('product').where('id', id).update(data);
        return product;
    }

    /**
     * Delete Product
     * @param id Product ID
     */
    deleteProductById(id: number) {
        const product = connection('product').where('id', id).del();
        return product;
    }
}
