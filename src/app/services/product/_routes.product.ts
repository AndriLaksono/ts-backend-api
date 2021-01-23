import { Router } from 'express';
import { ProductController } from './controller.product';

const router = Router();
const controller = new ProductController();

router.get('/', controller.getProduct);
router.get('/brand/:id', controller.getProductByBrand);
router.get('/total', controller.getTotalProduct);
router.get('/total/:id', controller.getTotalProductByBrand);
router.get('/:id', controller.getProductById);
router.post('/', controller.insertProduct);
router.delete('/:id', controller.deleteProductById);
router.put('/:id', controller.updateProductById);

export default router;
