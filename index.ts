import routes from "./routes/routes";
import express from 'express';
import {ejecutable} from "./tests/process.test";


const app = express();

ejecutable();


// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(routes);
//
// app.listen(3000, () => {
// 	console.log('Server on port 3000');
// });
