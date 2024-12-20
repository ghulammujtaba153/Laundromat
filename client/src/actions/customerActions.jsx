import axios from "axios";

export const loginUser = async (userData) => {
  console.log(userData);
  try {
    const response = await axios.post(
      "http://localhost:5000/api/login",
      userData
    );
    const { token, user } = response.data;

    return {
      success: true,
      message: "Login successful",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    };
  } catch (error) {
    console.error("Login error:", error.response.data);
    return {
      success: false,
      message: "Login failed. Please check your credentials.",
      token: null,
      user: null,
    };
  }
};
