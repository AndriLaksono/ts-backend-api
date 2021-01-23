import { Request, Response, NextFunction } from 'express';
import HttpExpection from '../../errors/HttpExpection';
import { BrandServices } from './services.brand';

const services = new BrandServices();

export class BrandController {
    /**
     * Get all of data brand
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getBrand();
            return res.json({
                message: 'Success get data.',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get Data brand by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async getBrandById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getBrandById(+req.params.id);
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
     * Store data brand
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async insertBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const data = {
                name: req.body.name,
                logo: req.body.logo,
                banner: req.body.banner,
            };

            // insert if all cases passed
            await services.insertBrand(data);

            return res.json({
                message: 'Brand Created!',
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
     * Update data Brand by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async updateBrandById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = {
                name: req.body.name,
                logo: req.body.logo,
                banner: req.body.banner,
            };

            // update if all cases passed
            await services.updateBrandById(+id, data);
            return res.json({
                message: 'Data Brand Updated!',
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete Brand by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async deleteBrandById(req: Request, res: Response, next: NextFunction) {
        try {
            await services.deleteBrandById(+req.params.id);

            return res.json({
                message: 'Success delete data',
            });
        } catch (error) {
            next(error);
        }
    }
}
