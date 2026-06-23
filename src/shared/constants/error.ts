export const ERROR_MESSAGES = {
  RECORD_ID_NOT_FOUND: "Record not found for the given ID",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  USER_NOT_FOUND_BY_EMAIL: "User with the provided email does not exist",
  USER_ALREADY_EXISTS_BY_EMAIL: "User with the provided email already exists",
  INVALID_CREDENTIALS: "Invalid credentials",
  API_ENDPOINT_NOT_FOUND: "API Endpoint not found",
  UNAUTHORIZED: "Unauthorized access, please login again",
  FORBIDDEN: "Access denied",
  INVALID_RESET_TOKEN: "Invalid or expired reset token",
  RATE_LIMIT_EXCEEDED: "Too many login attempts, Please try again later.",
  ROLE_NOT_FOUND: "Role not found",

  AUTH: {
    PROFILE_IMAGE_REQUIRED: "Profile image is required",
  },

  FILE: {
    REQUIRED: "Profile image is required",
    LIMIT_SIZE: "File size must not exceed 2MB",
    INVALID_TYPE: "Invalid file type. Only JPEG, PNG, and JPG are allowed",
    LIMIT_NAME: "File name is too long",
  },

  CLOUDINARY: {
    UPLOAD_FAILED: "Failed to upload image to Cloudinary",
    DELETE_FAILED: "Failed to delete image from Cloudinary",
  },
};
