const request = require("../request");
const endpoints = require("../endpoints");

const getRecipes = (params) => request.get(endpoints.RECIPES, params);

module.exports = {
  getRecipes,
};
