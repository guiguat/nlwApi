import express, { Request, Response } from 'express';
import knex from './database/connection';

import PointsController from './controllers/pointsController';


const routes = express.Router();
const pointsController = new PointsController();

routes.get('/items', async(req:Request, res:Response)=>{
   const items = await knex('items').select('*');

   const serializedItems = items.map(item =>{
      return {
         id: item.id,
         title:item.title,
         image_url: `http://localhost:3333/uploads/${item.image}`
      };
   })

   return res.json(serializedItems);
});

routes.post('/points', pointsController.create);

export default routes;