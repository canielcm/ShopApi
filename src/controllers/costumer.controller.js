const {pool} = require('./index.controller');
const bcryptjs = require('bcrypt');

const allCostumers = async()=>{
    const query = await pool.query("SELECT * FROM costumer INNER JOIN costumerData USING (idcostumer)");
    const resultVec = query.rows;
    return resultVec;
}

const CostumerById=async(id)=>{
    const query = await pool.query("SELECT * FROM costumer INNER JOIN costumerData USING (idcostumer) WHERE idCostumer=$1",[id]);
    const result = query.rows[0];
    return result;
}

const getCostumers = async (req, res)=>{
    try {
        res.status(200).json(await allCostumers());
        console.log(await allCostumers());
    } catch (error) {
        res.json({
            messege: "There are troubles",
            error
        })
    }
}

const getCostumerById=async (req, res)=>{
    try {
        const id= req.params.id;
        const result = await CostumerById(id);
        if(result){
            res.status(200).json(result);
            console.log(await CostumerById(id));
        }else{
            res.status(404).json({
                messege: "No user found"
            });
    }
    } catch (error) {
        res.json({
            messege: "There are troubles",
            error
        })
    }
    
}
const addCostumer= async (req, res)=>{
    try {
        const body = req.body;
        const {emailcostumer, namecostumer, phonenumbercostumer, passwordcostumer} = body;
        const cryptedPassword = await bcryptjs.hash(passwordcostumer,8);
        const sql1 = await pool.query("insert into costumer ( emailCostumer) values ($1) RETURNING idcostumer",[emailcostumer])
        const idCostumer = sql1.rows[0].idcostumer;
        const sql2 = await pool.query("insert into costumerData (idCostumer, nameCostumer, phonenumberCostumer, passwordCostumer) values ($1, $2, $3, $4)",[idCostumer, namecostumer, phonenumbercostumer, cryptedPassword]);
        res.json({
            messege: "user added",
            data: {
                idcostumer: idCostumer,
                emailcostumer,
                namecostumer,
                phonenumbercostumer,
                passwordcostumer: cryptedPassword
                
            }
        });
    } catch (error) {
        res.json({
            messege: "There are troubles",
            error
        })
    }
}

const updateCostumerById = async(req, res)=>{
    try {
        const id = req.params.id;
        let body= req.body;
        const userData = await CostumerById(id);
        console.log("userData",userData)
        if(!body.namecostumer){
            body.namecostumer=userData.namecostumer;
        }
        if(!body.phonenumbercostumer){
            body.phonenumbercostumer=userData.phonenumbercostumer;
        }
        const {namecostumer, phonenumbercostumer}= body;
        const sql = await pool.query('UPDATE costumerdata SET namecostumer = $1, phonenumbercostumer=$2 WHERE idcostumer=$3',[namecostumer, phonenumbercostumer, id]);
        console.log(sql);
        if(phonenumbercostumer && namecostumer){
            res.json({
                message: "User updated",
                data:{
                    id,
                    namecostumer,
                    phonenumbercostumer
                }
            })
        }else{
            res.json({
                message: "There was an error"
            })
        }
    } catch (error) {
        res.json({
            messege: "There are troubles",
            error
        })
    }
    
}

const deleteCostumerById = async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await CostumerById(id);
        if(user){
            const sql = pool.query("DELETE FROM costumer WHERE idcostumer=$1",[id]);
            res.json({
                messege: "Costumer removed",
            })
        }else{
            res.status(404).json({
                messege: "Costumer not found",
            })
        }
    } catch (error) {
        res.json({
            messege: "There are troubles",
            error
        })
    }
}
module.exports={
    getCostumers,
    getCostumerById,
    updateCostumerById,
    addCostumer,
    deleteCostumerById
}