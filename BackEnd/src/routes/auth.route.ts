import {Router} from 'express';
import { validatorSchema } from '../middlewares/zodValidator.middleware';
import { createUser } from '../schemas/user.schema';
import { SchemaType } from '../types/schemaType';
import AuthController from '../controllers/auth.controller';

const router:Router = Router();
const {handleLogin, handleRegisterUser, handleSoftDeleteUser, handleUpdateUser} = new AuthController();


router.post('/register', validatorSchema(createUser, SchemaType.body), handleRegisterUser);
router.post('/login' );
router.get('profile');
router.put('user/:id');
router.delete('user/:id');



