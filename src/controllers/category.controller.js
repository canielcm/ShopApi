const {pool}= require('./index.controller');

const Categories = async ()=>{
    try {
        const query = await pool.query("SELECT * FROM category");
        return query.rows;
    } catch (error) {
        console.log(error);
    }
}

const CategoryById=async (id)=>{
    try {
        const query = await pool.query("SELECT * FROM category WHERE idcategory=$1", [id])
        return query.rows[0]
    } catch (error) {
        console.log(error);
    }
}

const CategoryByName=async (name)=>{
    try {
        const query = await pool.query("SELECT * FROM category WHERE namecategory=$1", [name])
        return query.rows[0]
    } catch (error) {
        console.log(error);
    }
}

const getCategories = async (req, res)=>{
    try {
        const resultVec = await Categories();
        res.status(200).json(resultVec);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "there are troubles",
            error
        })
    }
}

const getCategoryById = async (req, res)=>{
    try {
        const id= req.params.id;
        const result = await CategoryById(id);
        result? res.status(200).json(result):res.status(404).json({message: "Category not found"});
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "there are troubles",
            error
        })
    }
}

const getCategoryByName = async (req, res)=>{
    try {
        const name= req.params.name;
        const result = await CategoryByName(name);
        result? res.status(200).json(result):res.status(404).json({message: "Category not found"});
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "there are troubles",
            error
        })
    }
}

const addCategory = async (req, res)=>{
    try {
        const {namecategory, descriptioncategory} = req.body;
        const sql = await pool.query("INSERT INTO category (namecategory, descriptioncategory) VALUES ($1, $2)",[namecategory, descriptioncategory]);
        res.json({
            message: "Category added"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "there are troubles",
            error
        })
    }
}

const updateCategory = async (req, res)=>{
    try {
        const {namecategory, descriptioncategory} = req.body;
        const id=req.params.id;
        const sql = await pool.query("UPDATE category SET namecategory=$1, descriptioncategory=$2 WHERE idcategory=$3",[namecategory, descriptioncategory, id]);
        res.json({
            message: "Category updated"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "there are troubles",
            error
        })
    }
}

const deleteCategory = async (req, res)=>{
    try {
        const id= req.params.id;
        const sql = await pool.query("DELETE FROM category WHERE idcategory = $1",[id]);
        res.status(200).json({
            message: "category removed"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "there are troubles",
            error
        })
    }
}
module.exports={
    getCategories,
    getCategoryById,
    getCategoryByName,
    addCategory,
    updateCategory,
    deleteCategory
}