import { Request, Response, NextFunction } from 'express';
import HttpExpection from '../../errors/HttpExpection';
import { ProductServices } from './services.product';
import { BrandServices } from '../brand/services.brand';

const services = new ProductServices();
const brandServices = new BrandServices();

export class ProductController {
    /**
     * Get all of data product
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getProduct();

            return res.json({
                message: 'Success get data.',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all of data product by brand id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getProductByBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getProductByBrand(+req.params.id);

            return res.json({
                message: 'Success get data.',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get Data product by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getProductById(+req.params.id);

            if (result.length > 0) {
                return res.json({
                    message: 'Success get data.',
                    data: result[0],
                });
            }

            return res.json({
                message: 'Data not found.',
                data: null,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get total active product
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getTotalProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getTotalProduct();
            return res.json({
                message: 'Success get data.',
                data: result[0],
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get total active product
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getTotalProductByBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getTotalProductByBrand(+req.params.id);
            return res.json({
                message: 'Success get data.',
                data: result[0],
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Store data product
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async insertProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = {
                brand_id: req.body.brand_id,
                name: req.body.name,
                picture: req.body.picture,
                price: req.body.price,
            };

            // check avability of brand
            const brand = await brandServices.getBrandById(data.brand_id);
            if (brand.length === 0) {
                return res.status(400).json({
                    message: 'Data Brand Not Found!',
                });
            }

            // insert if all cases passed
            await services.insertProduct(data);

            return res.json({
                message: 'Product Created!',
            });
        } catch (error) {
            next(
                new HttpExpection(400, {
                    message: 'Error format input.',
                }),
            );
        }
    }

    /**
     * Update data Product by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async updateProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = {
                brand_id: req.body.brand_id,
                name: req.body.name,
                picture: req.body.picture,
                price: req.body.price,
            };

            // check avability of brand
            const brand = await brandServices.getBrandById(data.brand_id);
            if (brand.length === 0) {
                return res.status(400).json({
                    message: 'Data Brand Not Found!',
                });
            }

            // update if all cases passed
            await services.updateProductById(+id, data);
            return res.json({
                message: 'Data Product Updated!',
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete Product by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async deleteProductById(req: Request, res: Response, next: NextFunction) {
        try {
            await services.deleteProductById(+req.params.id);

            return res.json({
                message: 'Success delete data',
            });
        } catch (error) {
            next(error);
        }
    }
}
