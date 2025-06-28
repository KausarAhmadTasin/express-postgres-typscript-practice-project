const db = require("../db");

const createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.mesaage });
  }
};

const updateUser = async (req, res) => {
  const id = await req.params.id;
  const { name, email } = req.body;

  try {
    const result = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING name, email",
      [name, email, id]
    );

    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "Deleted!" });
  } catch (error) {
    res.status(500).json({ error: err.mesaage });
  }
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser, getUser };
