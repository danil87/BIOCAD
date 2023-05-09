const db = require('../db');

class DevicesController {
    async createDevice(req, res) {
        const { name, at_work } = req.body;
        const sql = `INSERT INTO devices(name, at_work) VALUES($1, $2) RETURNING *`
        const newDevice = await db.query(sql, [name, at_work]);
        res.json(newDevice.rows[0]);
    }

    async getDevices(req, res) {
        const sql = `SELECT * FROM devices`
        const devices = await db.query(sql);
        res.json(devices.rows);
    }

    async getOneDevice(req, res) {
        const id = req.params.id;
        const sql = `SELECT * FROM devices WHERE id = $1`
        const device = await db.query(sql, [id]);
        res.json(device.rows);
    }

    async updateDevice(req, res) {
        const { id, name, at_work, img, division, number } = req.body;
        const sql = `UPDATE devices SET name = $1, at_work = $2, img = $3, division = $4, number = $5 WHERE id = $6`;
        const device = await db.query(sql, [name, at_work, img, division, number, id]);
        res.json({ message: "success" });
    }

    async deleteDevice(req, res) {
        const id = req.params.id;
        const sql = `DELETE FROM devices WHERE id = $1`;
        const device = await db.query(sql, [id]);
        res.json(device.rows[0]);
    }
}

module.exports = new DevicesController();