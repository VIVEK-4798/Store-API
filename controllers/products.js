const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const search = 'a'
    const products = await Product.find({}).sort('name price')
    res.status(200).json({products, nbHits:products.length})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort} = req.query;
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'};
    }
    // console.log(queryObject)
    let result = Product.find(queryObject);
    if(sort){
        const sortList = sort.split(',').join(' ');
        resukt = result.sort(sortList)
    }
    const products = await result;
    res.status(200).json({products, nbHits:products.length})
}

module.exports = {getAllProductsStatic, getAllProducts}