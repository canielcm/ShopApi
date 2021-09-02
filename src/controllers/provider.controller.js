const {pool} = require('./index.controller');

const allproviders = async()=>{
    const query = await pool.query("SELECT * FROM providers");
    const resultVec = query.rows;
    return resultVec;
}

const providerById=async(id)=>{
    const query = await pool.query("SELECT * FROM providers WHERE idprovider=$1",[id]);
    const result = query.rows[0];
    return result;
}

const getproviders = async (req, res)=>{
    try {
        res.status(200).json(await allproviders());
        console.log(await allproviders());
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "There are troubles",
            error
        })
    }
}

const getproviderById=async (req, res)=>{
    try {
        const id= req.params.id;
        const result = await providerById(id);
        if(result){
            res.status(200).json(result);
            console.log(await providerById(id));
        }else{
            res.status(404).json({
                message: "No provider found"
            });
    }
    } catch (error) {
        res.status(400).json({
            message: "There are troubles",
            error
        })
    }
    
}

const addProvider = async(req, res)=>{
    try {
        const {nameprovider, emailprovider, phonenumber} = req.body;
        const sql = await pool.query("INSERT INTO providers (nameprovider, emailprovider, phonenumber) VALUES ($1, $2, $3) RETURNING idprovider", [nameprovider, emailprovider, phonenumber]);
        const idprovider = sql.rows[0].idprovider;
        res.status(200).json({
            message: "provider added",
            data: {
                idprovider,
                nameprovider, 
                emailprovider, 
                phonenumber
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "there are trobles",
            error
        });
    }
}

const updateProviderById = async (req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const providerData=await providerById(id);

        if(!body.nameprovider){
            body.nameprovider=providerData.nameprovider;
        }
        if(!body.emailprovider){
            body.emailprovider=providerData.emailprovider;
        } 
        if(!body.phonenumber){
            body.phonenumber=providerData.phonenumber;
        }
        
        const {nameprovider, emailprovider, phonenumber} = body;
        const sql= await pool.query('UPDATE providers SET nameprovider = $1, emailprovider=$2, phonenumber=$3 WHERE idprovider=$4 ',[ nameprovider, emailprovider, phonenumber, id])
        res.status(200).json({
            message: "provider updated",
            data: {
                idprovider: id,
                nameprovider,
                emailprovider,
                phonenumber
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "There are troubles",
            error
        });
    }
}

module.exports = {
    getproviders,
    getproviderById,
    updateProviderById,
    addProvider
}