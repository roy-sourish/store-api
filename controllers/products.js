const Product = require("../models/product");
/**
 * Product Testing Route
 */
const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "product testing route" });
};

/**
 * Get all products
 *
 */
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObj = {};
  if (featured) {
    queryObj.featured = featured;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    const regex = /\b(>=|<=|>|<|=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObj);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
