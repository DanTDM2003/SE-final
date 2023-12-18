const db = require('../db.js');
const cn = require('../config/database.js');


const tbName = `Restaurants`;

module.exports = class Restaurant {
    static async findAll(attributes='*') {
        let con = null;
        try {
            con = await cn.connection.connect();
            const user = await con.any(`SELECT $1:name FROM "Users" JOIN "${tbName}" ON "${tbName}"."Owner_id" = "Users".id`, [attributes]);
            return user;
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    }
    
    static async findOne(restaurant, attributes='*') {
        let con = null;
        try {
            con = await cn.connection.connect();
            const restaurants = await con.oneOrNone(`SELECT $1:name FROM "Users" JOIN "${tbName}" ON "Users".id = "${tbName}"."Owner_id" WHERE "Owner_id" = $2`, [attributes, restaurant.Owner_id]);
            return restaurants;
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    }

    static async add(restaurant) {
        try {
            const rt = await db.add(tbName, restaurant);
            return rt;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            await db.delete(tbName, id);
        } catch (error) {
            throw error;
        }
    }
    
    static async update(newInfo) {
        try {
            await db.update(tbName, newInfo);
        } catch (error) {
            throw error;
        }
    }
}
