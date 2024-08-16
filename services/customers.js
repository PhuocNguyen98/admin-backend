const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const rows = await db.query(`SELECT * FROM customers`);

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
      FROM customers WHERE customerId = ${id}`
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function createCutomer(customer) {
  const result = await db.query(
    `INSERT INTO 
    customers ( firstName,lastName, email,phone, address,status) 
    VALUES ('${customer.firstName}','${customer.lastName}','${customer.email}','${customer.phone}', '${customer.address}',1)`
  );

  let message = "Error in creating Cutomer";

  if (result.affectedRows) {
    message = "Cutomer created successfully";
  }

  return { message };
}

async function updateCutomer(id, customer) {
  const result = await db.query(
    `UPDATE customers SET firstName = '${customer.firstName}' , lastName = '${customer.lastName}', email = '${customer.email}' , phone = '${customer.phone}', address= '${customer.address}' WHERE customerId = ${id}`
  );

  let message = "Error in updating Cutomer";

  if (result.affectedRows) {
    message = "Cutomer updated successfully";
  }

  return { message };
}

async function deleteCutomer(id) {
  const result = await db.query(
    `UPDATE customers SET status = 0 WHERE customerId =${id}`
  );

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
