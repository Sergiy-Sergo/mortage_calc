var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const api = require("../constants/apiEndpoints")
const mongoose = require("mongoose");
const Bank = require('../models/banks')

// console.log("api================>", api);
// mongodb+srv://admin_test_:admin@cluster1.1h9tp.mongodb.net/test
// console.log(parsed.NODE_APP_DB_URL);

mongoose.connect(api.thisBank, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


router.get("/", (req, res, next) => {
    Bank.find({}, (err, docs) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Fetch failed!" } });
      res.status(200).json({ success: true, data: docs });
    });
});

router.post( "/add",
  body("bankName")
    .isLength({ min: 1, max: 20 })
    .trim()
    .withMessage("bankName must be.")
    .escape(),
  body("interestRate")
    .isInt({ min: 1 })
    .withMessage("interestRate must be.")
    .toInt(),
  body("maximumLoan")
    .isInt({ min: 1 })
    .withMessage("maximumLoan must be.")
    .toInt(),
  body("minimumDownPayment")
    .isInt({ min: 1 })
    .withMessage("minimumDownPayment must be.")
    .toInt(),
  body("loanTerm").isInt({ min: 1 }).withMessage("loanTerm must be.").toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, err: errors.array() });
    }
    const bank = new Bank({
      bankName: req.body.bankName,
      interestRate: parseFloat(req.body.interestRate),
      maximumLoan: parseInt(req.body.maximumLoan),
      minimumDownPayment: parseInt(req.body.minimumDownPayment),
      loanTerm: parseInt(req.body.loanTerm),
    });
    bank.save((err, docs) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Fetch failed!" } });
      res.status(200).json({ success: true, data: docs });
    });
  }
);

router.get("/find/:id", (req, res) => {
  Bank.findById(req.params.id, (err, doc) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Fetch failed!" } });
    res.status(200).json({ success: true, data: doc });
  });
});

router.put(
  "/update",
  body("bankName")
    .isLength({ min: 1, max: 10 })
    .trim()
    .withMessage("bankName must be.")
    .escape(),
  body("interestRate")
    .isInt({ min: 1 })
    .withMessage("interestRate must be.")
    .toInt(),
  body("maximumLoan")
    .isInt({ min: 1 })
    .withMessage("maximumLoan must be.")
    .toInt(),
  body("minimumDownPayment")
    .isInt({ min: 1 })
    .withMessage("minimumDownPayment must be.")
    .toInt(),
  body("loanTerm").isInt({ min: 1 }).withMessage("loanTerm must be.").toInt(),
  (req, res) => {
    Bank.findByIdAndUpdate(
      req.body.id,
      {
        bankName: req.body.bankName,
        interestRate: parseFloat(req.body.interestRate),
        maximumLoan: parseInt(req.body.maximumLoan),
        minimumDownPayment: parseInt(req.body.minimumDownPayment),
        loanTerm: parseInt(req.body.loanTerm),
      },
      (err, doc) => {
        if (err)
          return res
            .status(500)
            .json({ success: false, err: { msg: "Saving failed!" } });
        res.status(200).json({ success: true, data: doc });
      }
    );
  }
);

router.delete("/delete/:id", (req, res) => {
  Bank.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Fetch failed!" } });
    res.status(200).json({ success: true, data: doc });
  });
});

module.exports = router;
