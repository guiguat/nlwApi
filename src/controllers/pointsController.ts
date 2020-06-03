import knex from '../database/connection';
import { Request, Response } from 'express';
class PointController{
    async create(request:Request, response:Response){
        const {
           name,
           email,
           whatsapp,
           latitude,
           longitude,
           city,
           uf,
           items
        } = request.body; 
     
        const trx = await knex.transaction();
        const point ={
            image:'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
         }
        const ids = await trx('points').insert(point);
        const point_id = ids[0];
        const pointItems = items.map((item_id:number) =>{
           return{
              item_id,
              point_id
           }
        })
     
        await trx('point_items').insert(pointItems);
        
        return response.json({
            point_id,
            ...point
        });
     }
}
export default PointController;