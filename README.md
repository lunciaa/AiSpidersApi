
# AiSpiders' API

Api for my app to manage tarantulas

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [Resources](#resources)
4. [Error Handling](#error-handling)
5. [Usage Examples](#usage-examples)

## Introduction

TODO

## Authentication

To access protected resources of the API, you need to perform an authentication process, which requires passing a valid Bearer token in the request header.

### Obtaining a token

To obtain a Bearer token, call the API authenthication endpoint with the appropriate authentication data. Upon sucessfull authentication, you will receive a Bearer token containing information about the authorized access.

**Authentication endpoint:**
```http
POST /api/v1/account/login
```

**Sample request:**
```json
{
  "username": "username",
  "password": "password"
}
```

**Sample response:**
```json
{
  "token": "TOKEN",
  "id": "id_of_the_user",
  "expires_in": 3600
}
```

### Passing the token

To access protected API resources, pass the received Bearer token in the "Authorization" header in every API request.

**Example:**
```http
GET /api/v1/account/id
Authorization: Bearer token
```

## Resources

### Account

**Endpoint** `POST /api/v1/account/register`

Description: Create new account and returns Bearer token

Body parameters:
- `email`: User email (string)
- `password`: User password (string)

Returns:
- `token`: Bearer token
- `id`: User's id
- `expires_in`: Token expiration


**Endpoint** `POST /api/v1/account/login`

Description: Authorize user and return Bearer token

Body parameters:
- `email`: User email (string)
- `password`: User password (string)

Returns:
- `token`: Bearer token
- `id`: User's id
- `expires_in`: Token expiration

**Endpoint** `POST /api/v1/account/check-email`

Description: Check email availability

Body parameters:
- `email`: Email to check (string)

Returns:
- `available`: Is email available (boolean)

**Endpoint** `GET /api/v1/account/id`

Description: Return authorized user's id

Authorization required

Returns:
- `id`: User's id (string)

## Error handling

TODO

## Usage examples

TODO