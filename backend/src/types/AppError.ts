export enum CustomError{
    DATABASE_ERROR = "An error ocurred in the database",
    LOGIN_PASSWORD_INCORRECT="Your password is incorrect, please enter the correct password",
    LOGIN_EMAIL_INCORRECT="There is no user with the email you entered, please register first",
    USER_ID_NONEXISTENT="There is no user with the email you entered, please register first",
    UPDATE_REQUEST_MISSING_ID="Your update/delete request is missing the ID",
    INVALID_JWT_TOKEN="Invalid or expired JWT token ",
    MISSING_JWT_TOKEN="JWT token missing ",
}

export default class AppError extends Error {
  public code: CustomError;
  public details?: any;

  constructor(code: CustomError, message: string, details?: any) {
    super(message);
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}