import { TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleValidationError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  // console.log(err);
  return {
    statusCode,
    message: 'Validation Error',
    errorDetails: err,
  };
};

export default handleValidationError;
