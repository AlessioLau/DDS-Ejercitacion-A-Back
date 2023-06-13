const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/clientes", async function (req, res) {
    try {
      let where = {};
      if (req.query.ApellidoYNombre != undefined && req.query.ApellidoYNombre !== "") {
        where.ApellidoYNombre = {
          [Op.like]: "%" + req.query.ApellidoYNombre + "%",
        };
        let clientesFiltrados = await db.clientes.findAll({
          attributes: [
            "IdCliente",
            "ApellidoYNombre",
            "DNI",
          ],
          where,
        });
        res.json(clientesFiltrados);
      } else {
        let clientes = await db.clientes.findAll({
          attributes: [
            "IdCliente",
            "ApellidoYNombre",
            "DNI",
          ],
          order: [["ApellidoYNombre", "ASC"]],
        });
        res.json(clientes);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
  });


module.exports = router;
