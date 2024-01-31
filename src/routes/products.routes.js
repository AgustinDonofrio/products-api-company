import {Router} from 'express'
const router = Router();

import * as productsController from '../controllers/products.controller.js'
import {authJwt} from '../middlewares/index.js'

router.get('/', productsController.getProducts);

router.get('/:productId', productsController.getProduct);

router.post('/', [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], productsController.createProduct);

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsController.updateProduct);

router.delete('/:productId',[authJwt.verifyToken, authJwt.isAdmin],  productsController.deleteProduct);

export default router;