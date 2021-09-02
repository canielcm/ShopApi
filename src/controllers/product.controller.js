const {pool} = require('./index.controller');

const allProduct = async()=>{
    const query = await pool.query("SELECT * FROM product");
    const resultVec = query.rows;
    return resultVec;
}

const allProductData = async()=>{
    const query = await pool.query("SELECT * FROM product INNER JOIN productdata USING (idproduct) INNER JOIN category USING (idcategory)");
    const resultVec = query.rows;
    return resultVec;
}

const productById=async(id)=>{
    const query = await pool.query("SELECT * FROM product INNER JOIN productData USING (idproduct) WHERE idproduct=$1",[id]);
    const result = query.rows[0];
    return result;
}

const getProducts = async (req, res)=>{
    try {
        const result =await  allProduct();
        res.status(200).json(result);
    } catch (error) {
        res.json({
            message: "There are troubles",
            error
        });
    }
}

const getProductsData = async (req,res)=>{
    try {
        const result = await allProductData();
        res.status(200).json(result);
    } catch (error) {
        res.json({
            message: "There are troubles",
            error
        });
    }
}

const getProductsDataByCategory = async (req,res)=>{
    try {
        const category=req.params.category
        console.log(category)
        const result = await allProductData();
        const dataByCategory = [];
        result.forEach(e=>{
                if(e.namecategory==category){
                    dataByCategory.push(e)
                }
        })
        console.log("printing; ",dataByCategory)
        if(dataByCategory.length>0){
            res.status(200).json(dataByCategory);
        }else{
            res.status(404).json([]);
        }
    } catch (error) {
        res.json({
            message: "There are troubles",
            error
        });
    }
}

const getProductById = async(req, res)=>{
    try {
        const id = req.params.id;
        const result = await productById(id);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(200).json({message: "product not found"});
        }
    } catch (error) {
        res.json({
            message: "There are troubles",
            error
        });
    }
}

const addProduct = async (req, res)=>{
    try {
        const body = req.body;
        const {descriptionproduct, nameproduct, amountproduct, idcategory, idprovider, price, urlimg} = body;
        const sql1 = await pool.query("insert into product ( descriptionproduct, nameproduct, amountproduct) values ($1, $2, $3) RETURNING idproduct",[descriptionproduct, nameproduct, amountproduct]);
        const idProduct = sql1.rows[0].idproduct;
        sql2 = await  pool.query("insert into productdata ( idproduct, idcategory, idprovider, price, urlimg) values ($1, $2, $3, $4, $5)",[idProduct, idcategory, idprovider, price, urlimg]);
        res.json({
            message: "user added",
            data: {
                idproduct: idProduct,
                nameproduct,
                descriptionproduct,
                amountproduct,
                idcategory,
                idprovider,
                price,
                urlimg
            }
        });
    } catch (error) {
        res.json({
            message: "There are troubles",
            error
        });
    }
}

const updateProductById = async (req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const productData=await productById(id);

        if(!body.descriptionproduct){
            body.descriptionproduct=productData.descriptionproduct;
        }
        if(!body.nameproduct){
            body.nameproduct=productData.nameproduct;
        } 
        if(!body.amountproduct){
            body.amountproduct=productData.amountproduct;
        }
        if(!body.idcategory){
            body.idcategory=productData.idcategory;
        }
        if(!body.idprovider){
            body.idprovider=productData.idprovider;
        }
        if(!body.price){
            body.price=productData.price;
        }
        if(!body.urlimg){
            body.urlimg=productData.urlimg;
        }
        const {descriptionproduct, nameproduct, amountproduct, idcategory, idprovider, price, urlimg} = body;
        const sql= await pool.query('UPDATE product SET nameproduct = $1, amountproduct=$2, descriptionproduct=$3 WHERE idproduct=$4 ',[nameproduct, amountproduct, descriptionproduct, id])
        const sql2= await pool.query('UPDATE productData SET idcategory = $1, idprovider=$2, price=$3, urlimg=$4 WHERE idproduct=$5 ',[idcategory, idprovider, price,urlimg, id])
        res.status(200).json({
            message: "product updated",
            data: {
                idproduct: id,
                nameproduct,
                amountproduct,
                descriptionproduct,
                idcategory,
                idprovider,
                price,
                urlimg
            }
        })
    } catch (error) {
        res.json({
            message: "There are troubles",
            error
        });
    }
}

const changeProductAmount = async (idproduct, amount)=>{
    //this method sums the amount from the param to product amount
    try {
        const product = await productById(idproduct);
        let newAmount = product.amountproduct+amount;
        if(newAmount<0){
            newAmount=0;
        }
        const sql= await pool.query('UPDATE product SET amountproduct=$1 WHERE idproduct=$2 ',[ newAmount, idproduct])
    } catch (error) {
        console.log(error)
    }
}

const deleteProductById = async (req,res)=>{
    try {
        const id = req.params.id;
        const product = await productById(id);
        if(product){
            const sql = pool.query("DELETE FROM product WHERE idproduct=$1",[id]);
            res.json({
                message: "Product removed",
            })
        }else{
            res.status(404).json({
                message: "product not found",
            })
        }
    } catch (error) {
        res.json({
            message: "There are troubles",
            error
        });
    }
}
module.exports = {
    productById,
    getProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
    getProductsData,
    getProductsDataByCategory,
    changeProductAmount
}