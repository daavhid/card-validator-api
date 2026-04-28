# Card Validator API

A NestJS API that validates card numbers using the Luhn algorithm.

---

## Tech Stack

- NestJS
- TypeScript (`strict: true`)
- Jest
- class-validator

---

## Why NestJS?

I chose NestJS because of its modular architecture, dependency injection, and scalability for production backend services.

Even for a small service, I wanted clear separation of concerns:

- Controller → handles HTTP requests/responses
- Service → handles business logic
- DTOs → validates request payloads
- Module → encapsulates card validation feature

---

## Endpoint

### POST `/card/validate`

Validates whether a card number is valid.

### Request Body

```json
{
  "cardNumber": "4532 0151 1283 0366"
}
```

---

## Success Response

```json
{
  "valid": true,
  "code": "CARD_VALID",
  "message": "valid card number"
}
```

---

## Failure Responses

### Invalid checksum

```json
{
  "valid": false,
  "code": "CARD_INVALID",
  "message": "invalid card number"
}
```

### Invalid characters

```json
{
  "valid": false,
  "code": "INVALID_CARD_NUMBER",
  "message": "Card number must contain only digits"
}
```

### Invalid length

```json
{
  "valid": false,
  "code": "INVALID_CARD_LENGTH",
  "message": "Card number must be between 13 and 19 digits"
}
```

---

## Validation Flow

### 1. Input Validation
Handled using DTO validation:

- ensures `cardNumber` exists
- ensures it is a string

---

### 2. Sanitization

The service removes:

- spaces
- hyphens

Example:

`4532-0151 1283-0366`

becomes:

`4532015112830366`

---

### 3. Numeric Validation

Ensures the sanitized value only contains digits.

---

### 4. Luhn Algorithm Check

The service validates the card number using the Luhn algorithm.

Steps:

- Start from the rightmost digit
- Double every second digit
- Subtract 9 if doubled value exceeds 9
- Sum all digits
- If total modulo 10 equals 0 → card is valid

---

## Running the Project

```bash
pnpm install
pnpm start:dev
```

Server runs on:

```bash
http://localhost:3003
```

---

## Running Tests

```bash
pnpm test
```

---

## Example Test Card

Valid:

```bash
4532015112830366
```

Invalid:

```bash
1234567890123456
```

---

## Project Structure

src/
├── card/
│   ├── dto/
│   ├── card.controller.ts
│   ├── card.service.ts
│   ├── card.module.ts
│   └── card.service.spec.ts

---

## Improvements I Would Add With More Time

- Card type detection (Visa, Mastercard, Verve, etc.)
- Rate limiting
- API documentation with Swagger