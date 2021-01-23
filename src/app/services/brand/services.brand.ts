import connection from '../../db/mysql';

export interface BrandInterface {
    name: string;
    logo: string;
    banner: string;
}
export interface BrandInterfaceFull extends BrandInterface {
    id: number;
}

export class BrandServices {
    /**
     * Get all Brand data
     */
    getBrand() {
        const brand = connection('brand');
        return brand;
    }

    /**
     * Get Brand data by ID
     * @param id Brand ID
     */
    getBrandById(id: number) {
        const brand = connection('brand').where('id', id);
        return brand;
    }

    /**
     * Insert Brand
     * @param data Brand Data JSON
     */
    insertBrand(data: BrandInterface) {
        const brand = connection('brand').insert(data);
        return brand;
    }

    /**
     * Update Brand
     * @param id Brand ID
     * @param data Brand Data JSON
     */
    updateBrandById(id: number, data: BrandInterface) {
        const brand = connection('brand').where('id', id).update(data);
        return brand;
    }

    /**
     * Delete Brand
     * @param id Brand ID
     */
    deleteBrandById(id: number) {
        const brand = connection('brand').where('id', id).del();
        return brand;
    }
}
