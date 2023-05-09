const db = require('../db');

class UsersController {
    async createUser(req, res){
        const {name} = req.body;
        const newUser = await db`INSERT INTO users(name) VALUES(${name}) RETURNING *`;
        res.json(newUser);
    }
    
    async getUsers(req, res){
        const users = await db`SELECT * FROM users`;
        res.json(users);
    }

    async getOneUser(req, res){
        const id = req.params.id;
        const user = await db`SELECT * FROM users WHERE id = ${id}`;
        res.json(user);
    }

    async updateUser(req, res){
        const {id, name} = req.body;
        const user = await db`UPDATE user SET name = ${name} WHERE id = ${id}`;
        res.json(user);
    }

    async deleteUser(req, res){
        const id = req.params.id;
        const user = await db`DELETE FROM users WHERE id = ${id}`;
        res.json(user);
    }
}

module.exports = new UsersController();