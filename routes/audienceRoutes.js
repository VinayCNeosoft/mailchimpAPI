const express = require("express");
const router = express.Router();
const {
  GET_AUDIENCE,
  ADD_MEMBER,
  GET_MEMBER,
  DELETE_MEMBER,
  UPDATE_LIST_MEMBER,
  SUBSCRIBED_AND_ARCHIVED,
} = require("../Controller/audienceController");

router.get("/get-audience", GET_AUDIENCE);
router.post("/add-member", ADD_MEMBER);
router.post("/get-member", GET_MEMBER);
router.patch("/update-list-member", UPDATE_LIST_MEMBER);
router.delete("/delete-member", DELETE_MEMBER);
router.patch("/subscribed-or-archived-member", SUBSCRIBED_AND_ARCHIVED);

module.exports = router;
