import { Request, Response, NextFunction } from 'express';
import HttpExpection from '../../errors/HttpExpection';
import { OutletServices } from './services.outlet';
import { BrandServices } from '../brand/services.brand';
import { HaversineFormula } from '../../lib/haversine';

const services = new OutletServices();
const brandServices = new BrandServices();
const haversine = new HaversineFormula();

// base location refers to monas
export const base = {
    lat: -6.1754158,
    lng: 106.8240886,
};

export class OutletController {
    /**
     * Get all of data outlet
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getOutlet(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getOutlet();

            const newResult = haversine.distanceOutletList(base, result);

            return res.json({
                message: 'Success get data.',
                data: newResult,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all of data outlet by brand id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getOutletByBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getOutletByBrand(+req.params.id);

            const newResult = haversine.distanceOutletList(base, result);

            return res.json({
                message: 'Success get data.',
                data: newResult,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get Data outlet by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getOutletById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getOutletById(+req.params.id);

            if (result.length > 0) {
                const newResult = haversine.distanceOutlet(base, result[0]);
                return res.json({
                    message: 'Success get data.',
                    data: newResult,
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
     * Store data outlet
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async insertOutlet(req: Request, res: Response, next: NextFunction) {
        try {
            const data = {
                brand_id: req.body.brand_id,
                name: req.body.name,
                picture: req.body.picture,
                address: req.body.address,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
            };

            // check avability of brand
            const brand = await brandServices.getBrandById(data.brand_id);
            if (brand.length === 0) {
                return res.status(400).json({
                    message: 'Data Brand Not Found!',
                });
            }

            // insert if all cases passed
            await services.insertOutlet(data);

            return res.json({
                message: 'Outlet Created!',
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
     * Update data Outlet by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async updateOutletById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = {
                brand_id: req.body.brand_id,
                name: req.body.name,
                picture: req.body.picture,
                address: req.body.address,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
            };

            // check avability of brand
            const brand = await brandServices.getBrandById(data.brand_id);
            if (brand.length === 0) {
                return res.status(400).json({
                    message: 'Data Brand Not Found!',
                });
            }

            // update if all cases passed
            await services.updateOutletById(+id, data);
            return res.json({
                message: 'Data Outlet Updated!',
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete Outlet by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async deleteOutletById(req: Request, res: Response, next: NextFunction) {
        try {
            await services.deleteOutletById(+req.params.id);

            return res.json({
                message: 'Success delete data',
            });
        } catch (error) {
            next(error);
        }
    }
}
