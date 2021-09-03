const {pool} = require('./index.controller');
const bcrypts = require('bcrypt');
const {generateJWT} = require('../helpers/generate-jwt');


const login = async (req, res)=>{

    const {emailcostumer, passwordcostumer} = req.body;
    const email = emailcostumer+'';
    try {
        //verificar email and password
        const response = await pool.query("select * from costumer natural join costumerData where emailcostumer like $1",[email]);
        const dataVec = await response.rows;
        console.log(dataVec);
        
        // en teoria asi  se deberia verificar el usuario
        if(!dataVec[0].emailcostumer){
            res.status(400).json({
                msg: 'user | password incorrect - email'
            })
        }
        
        //verificar password
        const validPassword = bcrypts.compareSync(passwordcostumer, dataVec[0].passwordcostumer)
        if(!validPassword){
            res.status(400).json({
                msg: 'user | password incorrect - password'
            })
        }

        //generar el jwt
        const token = await generateJWT(dataVec[0].idcostumer);

        res.status(200).json({
            dataVec,
            token,
        });

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            // lo que ocurre es que como la consulta no sale bine nos devuleve error al no
            // encontrar el usuario, tambien nos puede dar error si no se esta conectada a la db jeje 
            msg: 'user | password incorrect'
        })
    }
}

module.exports = {
    login,
}