const db = require('../db');

class WorksController {
    async createWork(req, res) {
        const { start, type_work, works, result, device_id, user_id } = req.body;
        const newWork = await db`INSERT INTO works(start, type_work, works, result, device_id, user_id) VALUES(${start}, ${type_work}, ${works}, ${result}, ${device_id}, ${user_id}) RETURNING *`;
        res.json(newWork);
    }

    async getWorks(req, res) {
        const { device_id, firstDate, secondDate } = req.body;
        const works = await db`SELECT works.id as id, to_char(start, 'dd.mm.yyyy') as start, type_work, works, result, users.name as user_name
        FROM works JOIN users ON works.user_id = users.id
        WHERE device_id = ${device_id} AND works.start >= ${firstDate} AND start <= ${secondDate}`;
        res.json(works);
    }

    async getAllWorks(req, res) {
        const { device_id } = req.params;
        const works = await db`SELECT works.id as id, to_char(start, 'dd.mm.yyyy') as start, type_work, works, result, users.name as user_name
        FROM works JOIN users ON works.user_id = users.id
        WHERE device_id = ${device_id}`;
        res.json(works);
    }

    async updateWork(req, res) {
        const { id, start, type_work, works, result } = req.body;
        const work = await db`UPDATE works SET start = ${start}, type_work = ${type_work}, works = ${works}, result = ${result} WHERE id = ${id}`;
        res.json({ message: "success" });
    }

    async deleteWork(req, res) {
        const id = req.params.id;
        const work = await db`DELETE FROM works WHERE id = ${id}`;
        res.json(work);
    }
}

module.exports = new WorksController();