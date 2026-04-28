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

## 🌐 Live API

The API is deployed and available at:

```bash
https://card-validator-api-nm7i.onrender.com/
```

---

## Endpoint

### POST `/card/validate`

Validates whether a card number is valid.

---

## Request Body

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

```bash
4532-0151 1283-0366
```

Becomes:

```bash
4532015112830366
```

---

### 3. Numeric Validation

Ensures the sanitized value contains only digits.

---

### 4. Luhn Algorithm Check

The service validates the card number using the Luhn algorithm:

- Start from the rightmost digit  
- Double every second digit  
- Subtract 9 if result exceeds 9  
- Sum all digits  
- If `sum % 10 === 0` → card is valid  

---

## Live Testing

Test the deployed API:

```bash
curl -X POST https://card-validator-api-nm7i.onrender.com/card/validate \
  -H "Content-Type: application/json" \
  -d '{"cardNumber": "4532 0151 1283 0366"}'
```

---

## Running Locally

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

## Example Test Cards

### Valid

```bash
4532015112830366
```

### Invalid

```bash
1234567890123456
```

---

## Project Structure

```bash
src/
├── card/
│   ├── dto/
│   ├── card.controller.ts
│   ├── card.service.ts
│   ├── card.module.ts
│   └── card.service.spec.ts
```

---

## Improvements I Would Add With More Time

- Card type detection (Visa, Mastercard, Verve, etc.)
- Rate limiting
- Swagger API documentation

---

## Summary

This project demonstrates:

- clean backend architecture using NestJS  
- proper validation and sanitization  
- Luhn algorithm implementation  
- structured error handling  
- testing  
- live deployment