import connection from '../../db/mysql';

export interface OutletInterface {
    brand_id: number;
    name: string;
    picture: string;
    address: string;
    longitude: string;
    latitude: string;
}
export interface OutletInterfaceFull extends OutletInterface {
    id: number;
}
export interface OutletInterfaceFullWithDistance extends OutletInterfaceFull {
    distance: number;
}

export class OutletServices {
    /**
     * Get all Outlet data
     */
    getOutlet() {
        const outlet = connection('outlet').whereNotNull('brand_id');
        return outlet;
    }

    /**
     * Get all Outlet data by brand
     */
    getOutletByBrand(id: number) {
        const outlet = connection('outlet').where('brand_id', id);
        return outlet;
    }

    /**
     * Get Outlet data by ID
     * @param id Outlet ID
     */
    getOutletById(id: number) {
        const outlet = connection('outlet').where('id', id).whereNotNull('brand_id');
        return outlet;
    }

    /**
     * Insert Outlet
     * @param data Outlet Data JSON
     */
    insertOutlet(data: OutletInterface) {
        const outlet = connection('outlet').insert(data);
        return outlet;
    }

    /**
     * Update Outlet
     * @param id Outlet ID
     * @param data Outlet Data JSON
     */
    updateOutletById(id: number, data: OutletInterface) {
        const outlet = connection('outlet').where('id', id).update(data);
        return outlet;
    }

    /**
     * Delete Outlet
     * @param id Outlet ID
     */
    deleteOutletById(id: number) {
        const outlet = connection('outlet').where('id', id).del();
        return outlet;
    }
}
