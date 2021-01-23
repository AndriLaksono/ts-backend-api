import { Router } from 'express';
import { BrandController } from './controller.brand';

const router = Router();
const controller = new BrandController();

router.get('/', controller.getBrand);
router.get('/:id', controller.getBrandById);
router.post('/', controller.insertBrand);
router.put('/:id', controller.updateBrandById);
router.delete('/:id', controller.deleteBrandById);

export default router;
