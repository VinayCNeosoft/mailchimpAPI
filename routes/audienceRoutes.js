const express = require("express");
const router = express.Router();
const {
  GET_AUDIENCE,
  ADD_MEMBER,
  GET_MEMBER,
  DELETE_MEMBER,
} = require("../Controller/audienceController");

router.get("/get-audience", GET_AUDIENCE);
router.post("/add-member", ADD_MEMBER);
router.post("/get-member", GET_MEMBER);
router.delete("/delete-member", DELETE_MEMBER);

module.exports = router;
