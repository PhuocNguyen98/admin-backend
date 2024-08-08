const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const rows = await db.query(
    `SELECT id, name, address
      FROM customers`
  );

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getCustomerById(id) {
  const rows = await db.query(
    `SELECT *
      FROM customers WHERE id = ${id}`
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function createCutomer(customer) {
  const result = await db.query(
    `INSERT INTO customers ( name, address) VALUES ('${customer.name}', '${customer.address}')`
  );

  let message = "Error in creating Cutomer";

  if (result.affectedRows) {
    message = "Cutomer created successfully";
  }

  return { message };
}

async function updateCutomer(id, customer) {
  const result = await db.query(
    `UPDATE customers SET name = '${customer.name}' , address = '${customer.address}' WHERE id = ${id}`
  );

  let message = "Error in updating Cutomer";

  if (result.affectedRows) {
    message = "Cutomer updated successfully";
  }

  return { message };
}

async function deleteCutomer(id) {
  const result = await db.query(`DELETE FROM customers WHERE id =${id}`);

  let message = "Error in deleting Cutomer";

  if (result.affectedRows) {
    message = "Cutomer deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  getCustomerById,
  createCutomer,
  updateCutomer,
  deleteCutomer,
};
