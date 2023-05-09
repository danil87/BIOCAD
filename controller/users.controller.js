const db = require('../db');

class UsersController {
    async createUser(req, res){
        const {name} = req.body;
        const sql = `INSERT INTO users(name) VALUES($1) RETURNING *`
        const newUser = await db.query(sql, [name]);
        res.json(newUser.rows[0]);
    }
    
    async getUsers(req, res){
        const sql = `SELECT * FROM users`
        const users = await db.query(sql);
        res.json(users.rows);
    }

    async getOneUser(req, res){
        const id = req.params.id;
        const sql = `SELECT * FROM users WHERE id = ${id}`
        const user = await db.query(sql);
        res.json(user.rows[0]);
    }

    async updateUser(req, res){
        const {id, name} = req.body;
        const sql = `UPDATE user SET name = '${name}' WHERE id = ${id}`;
        const user = await db.query(sql);
        res.json(user.rows[0]);
    }

    async deleteUser(req, res){
        const id = req.params.id;
        const sql = `DELETE FROM users WHERE id = ${id}`;
        const user = await db.query(sql);
        res.json(user.rows[0]);
    }
}

module.exports = new UsersController();