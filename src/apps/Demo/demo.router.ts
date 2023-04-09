import express from 'express';
import validator, { ValidationSource } from '@helpers/validator';

import { CreateDemo, DeleteDemo, GetDemo, UpdateDemo } from './demo.controller';
import schema from './demo.schema';

const router = express.Router();

/*
 * @method GET
 * @description returns all Demos
 * @param none
 * @body none
 * @return [Demos]
 * @example GET /demos
 */
router.get('/', GetDemo);

/*
 * @method POST
 * @description create Demo
 * @param none
 * @body {name:string}
 * @return Demo
 * @example POST /demos {name: ${name}}
 */

router.post('/', validator(schema.demoSchema), CreateDemo);

/*
 * @method PUT
 * @description Updates Demo
 * @param id of the demo to update
 * @body {name:string}
 * @return Demo
 * @example PUT /demos/${id} {name: ${name}}
 */
router.put(
    '/:id',
    validator(schema.demoId, ValidationSource.PARAM),
    validator(schema.demoSchema, ValidationSource.BODY),
    UpdateDemo
);

/*
 * @method DELETE
 * @description Delete Demo
 * @param id of the demo to delete
 * @body none
 * @return none
 * @example DELETE /demos/${id}
 */
router.delete(
    '/:id',
    validator(schema.demoId, ValidationSource.PARAM),
    DeleteDemo
);

export default router;
