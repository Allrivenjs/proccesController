//importar express y crear rutas
import { Router } from 'express';
const bashController = require('../controllers/bashController') ;
// import { indexController } from '../controllers/indexController';

const router = Router();

router.get('/process', bashController.getBashProcess);
router.get('/process/:id', function (req, res, next) {

});

export default router;