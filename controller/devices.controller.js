const db = require('../db');

class DevicesController {
    async createDevice(req, res) {
        const { name, at_work, img, division, number  } = req.body;
        const newDevice = await db`INSERT INTO devices(name, at_work, img, division, number) 
                                    VALUES(${name}, ${at_work}, ${img}, ${division}, ${number}) 
                                    RETURNING *`;
        res.json(newDevice);
    }

    async getDevices(req, res) {
        const devices = await db`SELECT * FROM devices`;
        res.json(devices);
    }

    async getOneDevice(req, res) {
        const id = req.params.id;
        const device = await db`SELECT devices.id as id, at_work, division, img, name, number, favorite_devices.id as favorite_id 
                                FROM devices LEFT JOIN favorite_devices ON devices.id = favorite_devices.device_id WHERE devices.id = ${id}`;
        res.json(device);
    }

    async updateDevice(req, res) {
        const { id, name, at_work, img, division, number } = req.body;
        const device = await db`UPDATE devices SET name = ${name}, at_work = ${at_work}, img = ${img}, division = ${division}, number = ${number} WHERE id = ${id}`;
        res.json({ message: "success" });
    }

    async deleteDevice(req, res) {
        const id = req.params.id;
        const device = await db`DELETE FROM devices WHERE id = ${id}`;
        res.json(device);
    }
}

module.exports = new DevicesController();