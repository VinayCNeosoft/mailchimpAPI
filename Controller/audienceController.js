const mailchimp = require("../Config/mailchimpAPI");

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
    return res.send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
};

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

module.exports = {
  GET_AUDIENCE,
  ADD_MEMBER,
  GET_MEMBER,
  DELETE_MEMBER,
};
