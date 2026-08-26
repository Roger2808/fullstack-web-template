import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DomainError, InvariantViolationError, NotFoundDomainError } from '../domain/domain-error';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    const status =
      exception instanceof NotFoundDomainError
        ? HttpStatus.NOT_FOUND
        : exception instanceof InvariantViolationError
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.UNPROCESSABLE_ENTITY;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.name,
    });
  }
}
