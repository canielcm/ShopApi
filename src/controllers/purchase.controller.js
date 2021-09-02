const {pool} = require('./index.controller');
const {cartItems, deleteCartfull}= require('./cart.controller');
const {changeProductAmount} = require('./product.controller');

const purchasesById = async (id)=>{
    try {
        const query = await pool.query("SELECT * FROM purchase INNER JOIN purchaseproduct USING (idpurchase) INNER JOIN product USING (idproduct) INNER JOIN productdata USING (idproduct) WHERE idpurchase=$1",[id]);
        return await query.rows;
    } catch (error) {
        console.log(error)
    }
}

const getPurchases = async (req, res)=>{
    try {
        const query = await pool.query("SELECT * FROM purchase");
        let purchasesVec=[];
        for (const element of query.rows){
            purchasesVec.push(await purchasesById(element.idpurchase))
        }
        res.status(200).json(
            purchasesVec
        );
    } catch (error) {
        console.log(error)
        res.json({
            message: "There are troubles",
            error
        });
    }
}
const getPurchasesByCostumerId = async (req, res)=>{
    try {
        const id = req.params.idcostumer;
        const query = await pool.query("SELECT * FROM purchase WHERE idcostumer=$1",[id]);
        if(query.rows.length>0){
            let purchasesVec=[];
            for (const element of query.rows){
                purchasesVec.push(await purchasesById(element.idpurchase))
            }
            res.status(200).json(purchasesVec);
        }else{
            res.status(404).json({
                message: `no purchases for costumer with id ${id}`
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            message: "There are troubles",
            error
        });
    }
}

const getPurchasesById = async (req, res)=>{
    try {
        const id = req.params.id;
        const resultVec= await purchasesById(id);
        console.log(resultVec)
        if(resultVec.length>0){
            res.status(200).json(resultVec);
        }else{
            res.status(404).json({
                message: `no purchases for costumer with id ${id}`
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            message: "There are troubles",
            error
        });
    }
}

const updatePurchaseStatus = async (req, res)=>{
    try {
        const idpurchase = req.params.id;
        console.log(idpurchase)
        const {processed} = req.body;
        const sql = await pool.query('UPDATE purchase SET processed=$1 WHERE idpurchase=$2',[processed, idpurchase]);
        res.status(200).json({
            message: "Status updated for purchase with id "+idpurchase,
            data: {
                idpurchase,
                processed
            }
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "There are troubles",
            error
        });
    }
}

const makePurchase = async (req, res)=>{
    try {
        const body = req.body;
        const {idcostumer, idhome} = body;
        const costumerCart = await cartItems(idcostumer);
        if(costumerCart.length>0){
            const sql = await pool.query("INSERT INTO purchase (idcostumer,idhome, datepurchase, timepurchase, processed) VALUES ($1,$2,current_date, current_time, false)  RETURNING idpurchase",[idcostumer, idhome])
            const idpurchase = sql.rows[0].idpurchase;
            console.log("costumerCart: ",costumerCart);
            costumerCart.forEach(async (element) => {
                if(element.amount>0){
                    console.log("element: ",element);
                    const sql=await pool.query("INSERT INTO purchaseproduct (idproduct,idpurchase, amount) VALUES ($1, $2, $3)",[element.idproduct, idpurchase, element.amount])
                    await changeProductAmount(element.idproduct, -element.amount);
                    console.log("sql", await sql)
                }
            });
            await deleteCartfull(idcostumer);
            res.status(200).json({
                message: "purchase done"
            })
        }else{
            res.status(200).json({
                message: "cart for this costumer is empty"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            message: "There are troubles",
            error
        });
    }
}

module.exports= {
    makePurchase,
    getPurchases,
    getPurchasesById,
    getPurchasesByCostumerId,
    updatePurchaseStatus
}