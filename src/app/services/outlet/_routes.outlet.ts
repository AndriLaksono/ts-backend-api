import { Router } from 'express';
import { OutletController } from './controller.outlet';

const router = Router();
const controller = new OutletController();

router.get('/', controller.getOutlet);
router.get('/:id', controller.getOutletById);
router.get('/brand/:id', controller.getOutletByBrand);
router.post('/', controller.insertOutlet);
router.put('/:id', controller.updateOutletById);
router.delete('/:id', controller.deleteOutletById);

export default router;
