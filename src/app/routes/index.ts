import { Router } from 'express';

// Import Routes
import brand from '../services/brand/_routes.brand';
import outlet from '../services/outlet/_routes.outlet';
import product from '../services/product/_routes.product';

const router = Router();

export default {
    brand: router.use('/brand', brand),
    outlet: router.use('/outlet', outlet),
    product: router.use('/product', product),
};
