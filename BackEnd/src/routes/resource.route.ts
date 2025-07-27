import {Router} from 'express';
import ResourceController from '../controllers/resource.controller';

const router:Router = Router();
const {handleCreateResource, handleSoftDeleteResource, handleGetResources, handleUpdateResource} = new ResourceController();

router.get("/resource/:id", handleGetResources)
router.post("/resource", handleCreateResource)
router.put("/resource/:id", handleUpdateResource)
router.delete("/resource/:id", handleSoftDeleteResource)


export {router as resourceRouter};
