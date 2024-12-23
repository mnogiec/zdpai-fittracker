/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  details?: any;
}

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus;
    let errorResponse: ErrorResponse;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        errorResponse = {
          statusCode: status,
          message: exceptionResponse,
          error: exception.name,
        };
      } else if (typeof exceptionResponse === 'object') {
        errorResponse = {
          statusCode: status,
          message: (exceptionResponse as any).message || exception.message,
          error: exception.name,
          details: (exceptionResponse as any).details,
        };
      }
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse = {
        statusCode: status,
        message: 'Internal Server Error',
        error: exception.name,
        details: exception.message, // You can add more details from the exception here
      };
    } else if (Array.isArray(exception) && exception[0] instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      errorResponse = {
        statusCode: status,
        message: exception.flatMap((error) => Object.values(error.constraints || {})),
        error: 'Validation Error',
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse = {
        statusCode: status,
        message: 'Internal Server Error',
        error: exception.name || 'InternalServerError',
        details: exception.message,
      };
    }

    response.status(status).json(errorResponse);
  }
}
