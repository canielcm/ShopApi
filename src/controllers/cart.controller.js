const {pool} = require('./index.controller');
const {productById} = require('./product.controller');
const cartItems=async (idCostumer)=>{
    try {
        const query = await pool.query("SELECT * FROM cart WHERE idcostumer=$1",[idCostumer]);
        const resultVec = query.rows;
        return resultVec;
    } catch (error) {
        console.log(error)
    }
}

const getCart = async (req, res)=>{
    try {
        const idcostumer = req.params.idcostumer;
        const result = await cartItems(idcostumer);
        res.status(200).json(result); 
    } catch (error) {
        res.json({
            messege: "There are troubles",
            error
        });
    }
}

const updateCartProduct = async (req, res)=>{
    try {
        const body = req.body;
        let {idcostumer, idproduct, amount} = body;
        const product = await productById(idproduct);
        const availableAmount = product.amountproduct;
        if(amount<0){
            amount = 0;
        }
        else if(amount>availableAmount){
            amount = availableAmount;
        } 
        const sql = await pool.query('UPDATE cart SET amount=$1 WHERE idcostumer=$2 AND idproduct=$3',[amount, idcostumer, idproduct]);
        console.log(sql);

        res.status(200).json({
            messege: "cart updated",
            data: {
                idcostumer,
                idproduct,
                amount
            }
        })
    } catch (error) {
        res.json({
            messege: "There are troubles",
            error
        });
    }
}

const addToCart = async (req, res)=>{
    try {
        const body = req.body;
        let {idcostumer, idproduct, amount}= body;
        const product = await productById(idproduct);
        const availableAmount = product.amountproduct;
        const query = await pool.query("SELECT * FROM CART WHERE idcostumer=$1 AND idproduct=$2",[idcostumer,idproduct]);
        if(query.rows.length>0){
            console.log("inside if 1")
            const amountInCart = query.rows[0].amount;
            let newAmount = amount + amountInCart;
            if(newAmount>availableAmount){
                console.log("inside if 2")
                newAmount=availableAmount;
            }else if(newAmount<0){
                console.log("inside else if")
                newAmount=0;
            }
            const sql = await pool.query('UPDATE cart SET amount=$1 WHERE idcostumer=$2 AND idproduct=$3',[newAmount, idcostumer, idproduct]);
            console.log(sql)
            res.status(200).json({
                messege: "product added",
                data: {
                    idcostumer,
                    idproduct,
                    amount: newAmount
                }
            })
        }else{
            console.log("inside else 1")
            let productAmount = amount;
            if(productAmount>availableAmount){
                productAmount= availableAmount;
            }else if(productAmount<0){
                productAmount=0;
            }
            const sql = await pool.query("INSERT INTO cart (idcostumer, idproduct, amount) VALUES ($1, $2, $3)",[idcostumer, idproduct, productAmount]);
            console.log(sql);
            res.status(200).json({
                messege: "product added",
                data: {
                    idcostumer,
                    idproduct,
                    amount: productAmount
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            messege: "There are troubles",
            error
        });
    }
}

const deleteCartProduct = async (req, res)=>{
    try {
        const params = req.params;
        const {idcostumer, idproduct} = params;
        const query = await pool.query("SELECT * FROM cart WHERE idcostumer=$1 AND idproduct=$2",[idcostumer, idproduct]);
        if(query.rows.length>0){
            const sql = pool.query("DELETE FROM cart WHERE idcostumer=$1 AND idproduct=$2",[idcostumer, idproduct]);
            console.log(sql)
            res.status(200).json({
                messege: "product removed to cart",
            })
        }else{
            res.status(404).json({
                messege: "product not found",
            })
        }
        
    } catch (error) {
        console.log(error)
        res.json({
            messege: "There are troubles",
            error
        });
    }
}

const deleteCartfull = async (idcostumer)=>{
    try {
        const sql = pool.query("DELETE FROM cart WHERE idcostumer=$1 ",[idcostumer]);
        console.log(sql)
    } catch (error) {
        console.log(error)
    }
}

const deleteCart = async (req, res)=>{
    try {
        const params = req.params;
        const {idcostumer} = params;
        await deleteCartfull(idcostumer)
        res.status(200).json({
            messege: "products removed to cart",
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            messege: "There are troubles",
            error
        });
    }
}

module.exports = {
    getCart,
    addToCart,
    updateCartProduct,
    deleteCartProduct,
    deleteCart,
    deleteCartfull,
    cartItems
}