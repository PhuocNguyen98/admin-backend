const express = require("express");
const router = express.Router();
const customres = require("../services/customers");

/* GET Cutomers */
router.get("/", async function (req, res, next) {
  try {
    res.json(await customres.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting cutomers `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await customres.getCustomerById(req.params.id));
  } catch (err) {
    console.error(`Error while getting cutomers `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await customres.createCutomer(req.body));
  } catch (err) {
    console.error(`Error while creating Cutomers`, err.message);
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    res.json(await customres.updateCutomer(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Cutomers`, err.message);
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await customres.deleteCutomer(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Cutomers`, err.message);
    next(err);
  }
});

module.exports = router;
