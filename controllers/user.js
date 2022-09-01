const User = require("../models/user");
const RestRequest = require("../models/resetrequest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v1: uuidv1 } = require("uuid");
const { createUser, getUser, updateUser } = require("../helpers/users");
const {
  getResetRequest,
  createResetRequest,
} = require("../helpers/restRequests");
const sendResetLink = require("../helpers/sendEmail");
exports.signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.JWT_SECRET;
  if (!user) {
    return res.status(400).send("המשתמש לא נמצא");
  }
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        business: user.business,
      },
      secret,
      { expiresIn: "1d" }
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    return res.status(400).send("סיסמא לא נכונה ");
  }
};
exports.signup = async (req, res) => {
  const user = await new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    role: req.body.role,
    business: req.body.business,
  }).save();
  if (!user) {
    res.status(404).send({ message: "הקטגוריה לא יכולה להיווצר" });
  }
  res.status(200).send(user);
};

exports.list = async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) {
    res.status(500).json({ succes: false });
  }
  res.send(userList);
};

exports.count = async (req, res) => {
  const userCount = await User.countDocuments((count) => count);

  res.send({ userCount });
};

exports.userById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(500).json({ message: "משתמש עם הסממן זהוי הזהה לא נמצא" });
  }
  res.send(user);
};

exports.forgot = async (req, res) => {
  const thisUser = await User.findOne({ email: req.body.email });
  if (thisUser) {
    const id = uuidv1();
    const request = {
      id,
      user: thisUser,
    };
    let restrequest = new RestRequest(request);
    restrequest = await restrequest.save();

    if (!restrequest) {
      res.status(404).send({ message: "ההזמנה לא יכולה להיווצר" });
    }
    res.status(200).send(restrequest);

    sendResetLink(thisUser.email, id);
  }
  res.status(200).json();
};

exports.reset = async (req, res) => {
  console.log(req.body._id);
  const thisRequest = await RestRequest.find().where({ id: req.body.id }).populate('user');
  if (!thisRequest) {
    res.status(500).json({ message: "משתמש עם הסממן זהוי הזהה לא נמצא" });
  }
  res.send(thisRequest);
  console.log(thisRequest);
  if (thisRequest) {
    const user = thisRequest[0].user;
    console.log('user',thisRequest[0].user)
    bcrypt.hash(req.body.password, 10).then((hashed) => {
      user.password = hashed;
      
       User.findByIdAndUpdate(
        user._id,
        {
          passwordHash: user.password,
        },
        { new: true }
      );
    
    
      
   
    });
    res.status(204).json();
  } else {
    res.status(404).json();
  }
};
