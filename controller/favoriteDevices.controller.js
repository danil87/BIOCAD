const db = require('../db');

class FavoriteDevicesController {
    async createFavoriteDevice(req, res){
        const {user_id, device_id} = req.body;
        const sql = `INSERT INTO favorite_devices(user_id, device_id) VALUES($1, $2) RETURNING *`
        const newFavoriteDevices = await db.query(sql, [user_id, device_id]);
        res.json(newFavoriteDevices.rows[0]);
    }
    
    async getFavoriteDevices(req, res){
        const sql = `SELECT devices.id, name, at_work, division, number FROM favorite_devices JOIN devices ON devices.id = device_id`
        const favoriteDevices = await db.query(sql);
        res.json(favoriteDevices.rows);
    }

    async getOneFavoriteDevices(req, res){
        const {device_id, user_id} = req.params;
        const sql = `SELECT * FROM favorite_devices WHERE device_id = ${device_id} AND user_id = ${user_id}`
        const favoriteDevices = await db.query(sql);
        res.json(favoriteDevices.rows);
    }

    async deleteFavoriteDevice(req, res){
        const {device_id, user_id} = req.params;
        const sql = `DELETE FROM favorite_devices WHERE device_id = ${device_id} AND user_id = ${user_id}`;
        const device = await db.query(sql);
        res.json(device.rows[0]);
    }
}

module.exports = new FavoriteDevicesController();