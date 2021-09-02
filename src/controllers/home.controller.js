const {pool} = require('./index.controller');

const HomeById = async(id)=>{
    try {
        const query = await pool.query("SELECT * FROM home WHERE idhome=$1",[id]);
        return query.rows[0];
    } catch (error) {
        console.log(error)
    }
}

const HomeByAddress = async(city, address)=>{
    try {
        const query = await pool.query("SELECT * FROM home WHERE city=$1 AND homeaddress=$2",[city.toUpperCase(), address.toUpperCase()]);
        return query.rows[0];
    } catch (error) {
        console.log();
    }
}

const getHomeById = async (req, res)=>{
    try {
        const id = req.params.id;
        const result = await HomeById(id);
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: "Home not found"
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

const getHomeByAddress = async (req,res)=>{
    try {
        const {homeaddress, city} = req.params;
        const result = await HomeByAddress(city, homeaddress);
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: "Home not found"
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
const addHome = async (req, res)=>{
    try {
        const body = req.body;
        let {homeaddress, city, descriptionhome } = body;
        let homeValidation = await HomeByAddress(city, homeaddress);
        if(homeValidation){
            console.log("homeValidation", homeValidation)
            console.log("description: ", descriptionhome)
            if(descriptionhome){
                const {idhome}= homeValidation;
                console.log("id: ", idhome)
                const sql = await pool.query('UPDATE home SET descriptionhome=$1 WHERE idhome=$2',[descriptionhome, idhome]);
                homeValidation.descriptionhome=descriptionhome;
            }
            res.status(200).json({
                message: "home already exists",
                data: homeValidation
            })
        }else{
            const sql = await pool.query("INSERT INTO HOME (homeaddress, city, descriptionhome) VALUES ($1, $2, $3) RETURNING idhome, homeaddress, city, descriptionhome ", [homeaddress.toUpperCase(), city.toUpperCase(), descriptionhome])
            res.status(200).json({
                message: "home added",
                data: sql.rows[0]
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

module.exports = {
    addHome,
    getHomeById,
    getHomeByAddress
}