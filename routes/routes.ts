//importar express y crear rutas
import { Router } from 'express';
import { getBashProcess } from '../controllers/bashController';
// import { indexController } from '../controllers/indexController';

const router = Router();

router.get('/process', getBashProcess);
router.get('/process/:id', (req, res) => {

});

export default router;
