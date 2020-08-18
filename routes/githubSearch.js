var express = require('express');
var router = express.Router();
const { search } = require('./../controllers/GitHubSeachController')
const redisHelper = require('./../helpers/redis.helper')


/**
 * Seach Method
 * 
 * @swagger
 * /api/search:
 *   post:
 *    tags:
 *      - GitHub Searcher
 *    summary: Get GitHub User/Repository
 *    description: Request Object sample </br>
 *                  searchTxt - user name/repository name 
 *                  <br>
 *                   entityType - type of search (users/repositories)
 *    consumes:
 *       - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Provide paramters to get result and consume rest of the API's
 *        required: true
 *        schema:
 *          properties:
 *            searchTxt:
 *              type: string
 *            entityType:
 *              type: string
 *    responses:
 *      200:
 *        description: Return object
 *      400:
 *       description: Bad Request
 *      401:
 *        description: Not Authrized
 *      500:
 *         description: Something went wrong
 */
router.post('/search', search);
router.post('/clear-cache', redisHelper.flushAll);

module.exports = router;
