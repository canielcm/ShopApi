const {Pool} = require('pg');

const pool= new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: "postgres",
    database: 'myShop'

});

const getUser = async (req, res)=>{
    const response = await pool.query('SELECT * FROM costumer  INNER JOIN costumerData USING (idCostumer)');
    const resultVec = response.rows;
    res.status(200).json(resultVec);
    console.log(resultVec.length)
    // res.send(response.rows.length)
   
}

module.exports = {
    getUser,
    pool
}