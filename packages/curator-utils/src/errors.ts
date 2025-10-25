import { HttpApiSchema } from '@effect/platform';
import { Schema } from 'effect';

export class InternalServerError extends Schema.TaggedError<InternalServerError>()(
  'InternalServerError',
  {
    message: Schema.String.pipe(
      Schema.optionalWith({
        default: () => 'Internal server error',
      }),
    ),
  },
  {
    [HttpApiSchema.AnnotationStatus]: 500,
  },
) {}

/**
 * Authentication-related errors
 */
export class AuthenticationError extends Schema.TaggedError<AuthenticationError>()('AuthenticationError', {
  message: Schema.String,
}) {}

export class AuthorizationError extends Schema.TaggedError<AuthorizationError>()('AuthorizationError', {
  message: Schema.String,
  accountAddress: Schema.optional(Schema.String),
}) {}

/**
 * Resource-related errors
 */
export class ResourceNotFoundError extends Schema.TaggedError<ResourceNotFoundError>()('ResourceNotFoundError', {
  resource: Schema.String,
  id: Schema.String,
}) {}

export class ResourceAlreadyExistsError extends Schema.TaggedError<ResourceAlreadyExistsError>()(
  'ResourceAlreadyExistsError',
  {
    resource: Schema.String,
    id: Schema.String,
  },
) {}

/**
 * Validation errors
 */
export class ValidationError extends Schema.TaggedError<ValidationError>()('ValidationError', {
  field: Schema.String,
  message: Schema.String,
}) {}

/**
 * External service errors
 */
export class PrivyConfigError extends Schema.TaggedError<PrivyConfigError>()('PrivyConfigError', {
  message: Schema.String,
}) {}

export class PrivyTokenError extends Schema.TaggedError<PrivyTokenError>()('PrivyTokenError', {
  message: Schema.String,
}) {}

export class KnowledgeGraphQueryError extends Schema.TaggedError<KnowledgeGraphQueryError>()(
  'KnowledgeGraphQueryError',
  {
    message: Schema.String,
  },
) {}
