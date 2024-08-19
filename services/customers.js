const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1, limit = config.listPerPage) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM customers LIMIT ${offset}, ${limit}`
  );

  const totalRow = await db.query(
    `SELECT COUNT(*) as countCustomer FROM customers;`
  );

  const data = helper.emptyOrRows(rows);

  const pageSize = Number(limit);
  const totalPages = Math.ceil(totalRow[0].countCustomer / limit, 0);
  const pagination = { page: Number(page), pageSize, totalPages };

  return {
    data,
    pagination,
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

function updateMultiple(customres) {
  let isCheck = true;

  customres.forEach(async (item) => {
    let result = await db.query(
      `UPDATE customers SET evaluate = '${item.evaluate}' , reason = '${item.reason}' WHERE customerId = ${item.customerId}`
    );
    if (!result.affectedRows) {
      isCheck = false;
    }
  });

  let message = "Error in updating Cutomer";

  if (isCheck) {
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
  updateMultiple,
  deleteCutomer,
};
