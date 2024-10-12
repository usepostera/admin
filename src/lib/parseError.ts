/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseApiError(error: any) {
  let message = "Something went wrong";

  if (error?.response?.data?.message) {
    message = error.response.data.message;
  } else if (error?.message) {
    message = error.message;
  }

  return message;
}
