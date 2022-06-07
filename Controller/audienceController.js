const mailchimp = require("../Config/mailchimpAPI");

//get audience
const GET_AUDIENCE = async (req, res) => {
  try {
    const response = await mailchimp.lists.getAllLists();
    console.log(response);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ status: 401, msg: "unable to find audience" });
  }
};

//add audience
const ADD_MEMBER = async (req, res) => {
  const { listId, firstname, lastname, email, phone, birthday, tag } = req.body;
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      email_type: "text",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname,
        PHONE: phone,
        BIRTHDAY: birthday,
      },
      tags: [tag],
    });
    const temp = { status: "ok" };
    return res.send(temp);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//get audience by id
const GET_MEMBER = async (req, res) => {
  const { listId } = req.body;
  try {
    const response = await mailchimp.lists.getListMembersInfo(listId, {
      /* fields:["members.email_address"], */
      count: 1000,
    });
    console.log(response.members.map((ele) => ele.id).length);
    return res.send(response);
  } catch {
    return res.status(200).json({ status: 401, msg: "unable to find members" });
  }
};

//subscribe and unsubscribe
const UPDATE_LIST_MEMBER = async (req, res) => {
  const { listId, subscriber_hash, status } = req.body;
  try {
    const response = await mailchimp.lists.updateListMember(
      listId,
      subscriber_hash,
      {
        status: status,
      }
    );
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//delete audience
const DELETE_MEMBER = async (req, res) => {
  const { listId, subscriber_hash } = req.body;
  try {
    const response = await mailchimp.lists.deleteListMember(
      listId,
      subscriber_hash
    );
    return res.send("Successful");
  } catch {
    return res.status(200).json({ status: 401, msg: "unable to find members" });
  }
};

//subscribe and archived
const SUBSCRIBED_AND_ARCHIVED = async (req, res) => {
  const { listId, subscriber_hash, status } = req.body;
  try {
    const response = await mailchimp.lists.updateListMember(
      listId,
      subscriber_hash,
      {
        status: status,
      }
    );
    console.log(response);
    if (response.status == "unsubscribed") {
      try {
        const response = await mailchimp.lists.deleteListMember(
          listId,
          subscriber_hash
        );
        console.log(response);
        res.send("Member Unsubscribed and Archived Successfully....");
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    } else {
      res.send("operation failed");
    }
    // res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = {
  GET_AUDIENCE,
  ADD_MEMBER,
  GET_MEMBER,
  DELETE_MEMBER,
  UPDATE_LIST_MEMBER,
  SUBSCRIBED_AND_ARCHIVED,
};
