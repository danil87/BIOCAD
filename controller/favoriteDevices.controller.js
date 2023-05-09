const db = require('../db');

class FavoriteDevicesController {
    async createFavoriteDevice(req, res){
        const {user_id, device_id} = req.body;
        const newFavoriteDevices = await db`INSERT INTO favorite_devices(user_id, device_id) VALUES(${user_id}, ${device_id}) RETURNING *`;
        res.json(newFavoriteDevices);
    }
    
    async getFavoriteDevices(req, res){
        const favoriteDevices = await db`SELECT devices.id, name, at_work, division, number FROM favorite_devices JOIN devices ON devices.id = device_id`;
        console.log(favoriteDevices);
        res.json(favoriteDevices);
    }

    async getOneFavoriteDevices(req, res){
        const {device_id, user_id} = req.params;
        const favoriteDevices = await db`SELECT * FROM favorite_devices WHERE device_id = ${device_id} AND user_id = ${user_id}`;
        res.json(favoriteDevices);
    }

    async deleteFavoriteDevice(req, res){
        const {device_id, user_id} = req.params;
        const device = await db`DELETE FROM favorite_devices WHERE device_id = ${device_id} AND user_id = ${user_id}`;
        res.json(device);
    }
}

module.exports = new FavoriteDevicesController();