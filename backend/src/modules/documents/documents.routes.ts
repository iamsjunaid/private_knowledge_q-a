import { Router } from 'express';
import * as controller from './documents.controller';

const router = Router();

router.post('/', controller.createDocument);
router.get('/', controller.getDocuments);

export default router;
