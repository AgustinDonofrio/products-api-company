import {Router} from 'express'
const router = Router();

import * as authController from '../controllers/auth.controller'
import {verifySignup} from '../middlewares'

router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checRolesExisted], authController.singUp);

router.post('/signin', authController.singIn);

export default router;