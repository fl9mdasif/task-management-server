import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";
import { authServices } from "./service.auth";
import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
  //   console.log(req.body);

  const result = await authServices.registerUser(req.body);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  const { data, accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfully!",
    data: {
      user: data.jwtPayload,
      token: accessToken,
    },
  });
});

// change password
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  // console.log(req.user);
  const result = await authServices.changePassword(req.user, passwordData);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password is updated successfully!",
    data: {
      data: result,
    },
  });
});

export const authControllers = {
  loginUser,
  changePassword,
  registerUser,
};
