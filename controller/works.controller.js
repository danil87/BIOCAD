const db = require('../db');

class WorksController {
    async createWork(req, res) {
        const { start, type_work, works, result, device_id, user_id } = req.body;
        const sql = `INSERT INTO works(start, type_work, works, result, device_id, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`
        const newWork = await db.query(sql, [start, type_work, works, result, device_id, user_id]);
        res.json(newWork.rows[0]);
    }

    async getWorks(req, res) {
        const { device_id, firstDate, secondDate } = req.body;
        const sql = `SELECT works.id as id, to_char(start, 'dd.mm.yyyy') as start, type_work, works, result, users.name as user_name
                     FROM works JOIN users ON works.user_id = users.id
                     WHERE device_id = $1 AND works.start >= $2 AND start <= $3`
        const works = await db.query(sql, [device_id, firstDate, secondDate]);
        res.json(works.rows);
    }

    async getAllWorks(req, res) {
        const { device_id } = req.params;
        const sql = `SELECT works.id as id, to_char(start, 'dd.mm.yyyy') as start, type_work, works, result, users.name as user_name
                     FROM works JOIN users ON works.user_id = users.id
                     WHERE device_id = $1`
        const works = await db.query(sql, [device_id]);
        res.json(works.rows);
    }

    async updateWork(req, res) {
        const { id, start, type_work, works, result } = req.body;
        const sql = `UPDATE works SET start = $1, type_work = $2, works = $3, result = $4 WHERE id = $5`;
        const work = await db.query(sql, [start, type_work, works, result, id]);
        res.json({ message: "success" });
    }

    async deleteWork(req, res) {
        const id = req.params.id;
        const sql = `DELETE FROM works WHERE id = $1`;
        const work = await db.query(sql, [id]);
        res.json(work.rows[0]);
    }
}

module.exports = new WorksController();