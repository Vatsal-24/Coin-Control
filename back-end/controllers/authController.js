const { promisify } = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("./../utils/sendEmail");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    // instead of putting entire body, put 4 fields individually because a hacker might sent role as admin
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });
  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email: email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // 3) if everything is ok, send token to client
  createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not loged in!", 401));
  }

  // 2) Verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token no more exists!", 401)
    );
  }

  // 4) Check if user changed password after the token was expired
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! please login again", 401)
    );
  }
  // All OK, grant access
  req.user = freshUser;

  next();
});

// exports.restrictTo = (...roles) => {
//   // roles: ['admin', 'lead-guide']
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError("You do not have access to perform this action!", 403)
//       );
//     }
//     next();
//   };
// };

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   // 1) get user based on posted email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return next(new AppError("No user with that email found", 404));
//   // 2) generate random token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });
//   // 3) send that token in an email
//   const resetURL = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/users/resetPassword/${resetToken}`;
//   const message = `Forgot your password, submit a patch request with your new password and passwordConfirm to ${resetURL}.\n If you didn't forgot your password, ignore this email.`;
//   try {
//     console.log("zzz");
//     await sendEmail({
//       email: user.email,
//       subject: "Password reset token (valid for 10 min only)",
//       message: message,
//     });
//     res.status(200).json({
//       status: "success",
//       message: "Token sent to user",
//     });
//   } catch (error) {
//     console.log(error);
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(
//       new AppError("There was an error sending mail to the user", 500)
//     );
//   }

//   next();
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   // 1) get user based on token
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");
//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   // 2) If token has not expired and there is a user, set the new password
//   if (!user) {
//     return next(new AppError("Token is invalid or expired!", 400));
//   }

//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();

//   // 3) Update changedPasswordAt property for the user
//   // 4) Log the user in, send JWT
//   createAndSendToken(user, 200, res);
//   next();
// });

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   // 1) Get user from collection
//   const user = await User.findById(req.user.id).select("+password");
//   // 2) Check if password is correct
//   if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//     return next(new AppError("Wrong Password", 401));
//   }
//   // 3) Update password
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();

//   // 4) Log user in, send JWT
//   createAndSendToken(user, 200, res);
// });
