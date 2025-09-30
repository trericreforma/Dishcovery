const request = require("../request");
const endpoints = require("../endpoints");


const getRecipes = (params) => request.get(endpoints.RECIPES, params);

const searchRecipes = ({ external = false, criteria = "" }) => {
  return request.get(
    endpoints.RECIPE_SEARCH,
    { external, criteria }
  );
};

module.exports = {
  getRecipes,
  searchRecipes,
};
