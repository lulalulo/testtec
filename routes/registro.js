const express = require("express");
const router = express.Router();
const db = require("../models/db");


router.post("/", (req, res) => {
  const { nombre, nomempresa, correo, telefono, cat, mensaje } = req.body;
  const insertQuery = "INSERT INTO registro (nombre, nomempresa, correo, telefono, cat, mensaje) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(insertQuery, [nombre, nomempresa, correo, telefono, cat, mensaje], (err, result) => {
    if (err) {
      console.error("Error al crear registro: " + err);
      res.status(500).json({ error: "Fallo al crear registro" });
    } else {
      res.status(201).json({ message: "Registro exitoso", id: result.insertId });
    }
  });
});


// POR SI ACASO 
router.get("/", (req, res) => {
  const selectQuery = "SELECT * FROM registro";
  db.query(selectQuery, (err, rows) => {
    if (err) {
      console.error("Error al leer registros: " + err);
      res.status(500).json({ error: "Fallo al leer registros" });
    } else {
      res.json(rows);
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const selectQuery = "SELECT * FROM registro WHERE iduser = ?";
  db.query(selectQuery, [id], (err, rows) => {
    if (err) {
      console.error("Error al leer registro: " + err);
      res.status(500).json({ error: "Fallo al leer registro" });
    } else {
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: "No se encontro registro" });
      }
    }
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, nomempresa, correo, telefono, cat, mensaje } = req.body;
  const updateQuery = "UPDATE registro SET nombre=?, nomempresa=?, correo=?, telefono=?, cat=?, mensaje=? WHERE iduser=?";
  db.query(updateQuery, [nombre, nomempresa, correo, telefono, cat, mensaje, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar registro: " + err);
      res.status(500).json({ error: "Fallo al actualizar registro" });
    } else {
      res.json({ message: "Registro actualizado" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const deleteQuery = "DELETE FROM registro WHERE iduser = ?";
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar registro: " + err);
      res.status(500).json({ error: "Fallo al eliminar registro" });
    } else {
      res.json({ message: "Registro eliminado" });
    }
  });
});


module.exports = router;
