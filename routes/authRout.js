import { Router } from 'express';
import {
    registerController, loginController
} from '../../../controllers/authController.js';

//router object
const router = Router();


//routing
// REGISTER || METHOD POST
router.post("/register", registerController);
//LOGIN || POST
router.post('/login', loginController)

export default router;
