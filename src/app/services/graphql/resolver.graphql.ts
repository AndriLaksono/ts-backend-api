import { BrandServices } from '../brand/services.brand';
import { OutletServices } from '../outlet/services.outlet';
import { ProductServices } from '../product/services.product';
import { HaversineFormula } from '../../lib/haversine';

import { base } from '../outlet/controller.outlet';
const brandServices = new BrandServices();
const outletServices = new OutletServices();
const productServices = new ProductServices();
const haversine = new HaversineFormula();

export const Resolvers = {
    // BRAND
    brands: () => brandServices.getBrand(),
    brand: async (param: any) => {
        const data = await brandServices.getBrandById(param.id);
        return data[0];
    },
    addBrand: async (param: any) => {
        const data = {
            name: param.input.name,
            logo: param.input.logo,
            banner: param.input.banner,
        };
        await brandServices.insertBrand(data);
        return true;
    },
    updateBrand: async (param: any) => {
        const data = {
            name: param.input.name,
            logo: param.input.logo,
            banner: param.input.banner,
        };
        await brandServices.updateBrandById(param.id, data);
        return true;
    },
    deleteBrand: async (param: any) => {
        await brandServices.deleteBrandById(param.id);
        return true;
    },

    // OUTLET
    outlets: async () => {
        const data = await outletServices.getOutlet();
        const newResult = haversine.distanceOutletList(base, data);
        return newResult;
    },
    outlet: async (param: any) => {
        const data = await outletServices.getOutletById(param.id);
        const newResult = haversine.distanceOutlet(base, data[0]);
        return newResult;
    },
    outletBrand: async (param: any) => {
        const data = await outletServices.getOutletByBrand(param.id);
        const newResult = haversine.distanceOutletList(base, data);
        return newResult;
    },
    addOutlet: async (param: any) => {
        const data = {
            brand_id: param.input.brand_id,
            name: param.input.name,
            picture: param.input.picture,
            address: param.input.address,
            longitude: param.input.longitude,
            latitude: param.input.latitude,
        };
        // check avability of brand
        const brand = await brandServices.getBrandById(data.brand_id);
        if (brand.length === 0) {
            return false;
        }
        // insert if all cases passed
        await outletServices.insertOutlet(data);
        return true;
    },
    updateOutlet: async (param: any) => {
        const id = param.id;
        const data = {
            brand_id: param.input.brand_id,
            name: param.input.name,
            picture: param.input.picture,
            address: param.input.address,
            longitude: param.input.longitude,
            latitude: param.input.latitude,
        };
        // check avability of brand
        const brand = await brandServices.getBrandById(data.brand_id);
        if (brand.length === 0) {
            return false;
        }
        // update if all cases passed
        await outletServices.updateOutletById(id, data);
        return true;
    },
    deleteOutlet: async (param: any) => {
        await outletServices.deleteOutletById(param.id);
        return true;
    },

    // PRODUCT
    products: async () => await productServices.getProduct(),
    product: async (param: any) => {
        const data = await productServices.getProductById(param.id);
        return data[0];
    },
    productBrand: async (param: any) => {
        const data = await productServices.getProductByBrand(param.id);
        return data;
    },
    productTotal: async () => {
        const data = await productServices.getTotalProduct();
        return data[0];
    },
    productTotalBrand: async (param: any) => {
        const data = await productServices.getTotalProductByBrand(param.id);
        return data[0];
    },
    addProduct: async (param: any) => {
        const data = {
            brand_id: param.input.brand_id,
            name: param.input.name,
            picture: param.input.picture,
            price: param.input.price,
        };
        // check avability of brand
        const brand = await brandServices.getBrandById(data.brand_id);
        if (brand.length === 0) {
            return false;
        }
        // insert if all cases passed
        await productServices.insertProduct(data);
        return true;
    },
    updateProduct: async (param: any) => {
        const data = {
            brand_id: param.input.brand_id,
            name: param.input.name,
            picture: param.input.picture,
            price: param.input.price,
        };
        // check avability of brand
        const brand = await brandServices.getBrandById(data.brand_id);
        if (brand.length === 0) {
            return false;
        }
        // insert if all cases passed
        await productServices.updateProductById(param.id, data);
        return true;
    },
    deleteProduct: async (param: any) => {
        await productServices.deleteProductById(param.id);
        return true;
    },
};
