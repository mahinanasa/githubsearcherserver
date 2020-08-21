const axios = require('axios')
const apiResponse = require("../helpers/apiResponse");
const redisHelper = require('./../helpers/redis.helper')
const config = require('./../config')
//Search For User, Repository

exports.search = async (req, res) => {

	try {
		let { entityType, searchTxt } = req.body
		let response = {}
		let cachedResponse = JSON.parse(await redisHelper.get(`${searchTxt}_in_${entityType}`)) 
		if (cachedResponse === null) {
			response = await axios.get(`${config.axios_baseUrl}/search/${entityType}`, {
				params: {
					q: searchTxt,
					order: 'desc'
				}
			})
			await redisHelper.set(`${searchTxt}_in_${entityType}`,JSON.stringify(response.data)) 
		} else {

			response = {
				data: cachedResponse
			}
		}
		return apiResponse.successResponseWithData(res, "sucess", response.data);
	} catch (error) {
		//throw error in json response with status 500. 
		return apiResponse.ErrorResponse(res, error);
	}


}
