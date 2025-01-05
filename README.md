<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# **Decision-Making System**

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-F37626?style=for-the-badge&logo=typeorm&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)

The **Decision-Making System** is a robust and scalable NestJS-based application designed to facilitate decision-making processes, manage users, projects, and hierarchical questions. It leverages modern technologies like **JWT authentication**, **Passport.js**, and **TypeORM** to provide a secure and efficient backend solution.

---

## **Features**
### **1. Authentication & Authorization**
- Secure JWT-based authentication using **Passport.js**.
- Role-based access control (RBAC) for user permissions.
- Login, logout, and user session management.

### **2. User Management**
- **User Registration**: Create new users with secure password hashing.
- **Profile Management**: Update user details, including name, email, and password.
- **Role-Based Access**: Admins can manage user roles and permissions.
- **User Deletion**: Safely delete users and their associated data.

### **3. Project Management**
- **Project Creation**: Create and manage projects with details like client name, languages, and status.
- **Scammer Detection**: Automatically detect and flag scammer clients.
- **Decision Rates**: Track decision rates for projects.

### **4. Question Trees**
- **Hierarchical Questions**: Create and manage questions with parent-child relationships.
- **Caching**: Optimized performance with caching for question trees.
- **Bulk Creation**: Create multiple questions in a tree structure with a single API call.

### **5. RESTful API**
- Fully documented endpoints for easy integration with frontend or external systems.
- Supports CRUD operations for users, projects, questions, and more.

### **6. Caching**
- Efficient caching mechanisms to reduce database load and improve performance.

---

## **Technologies Used**
- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MySQL](https://www.mysql.com/) (via [TypeORM](https://typeorm.io/))
- **Authentication**: [JWT](https://jwt.io/) with [Passport.js](http://www.passportjs.org/)
- **Caching**: [NestJS Cache Manager](https://docs.nestjs.com/techniques/caching)
- **Validation**: [Class Validator](https://github.com/typestack/class-validator) and [Class Transformer](https://github.com/typestack/class-transformer)
- **Logging**: [Morgan](https://github.com/expressjs/morgan)

---

## **Getting Started**

### **Prerequisites**
Before running the project, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MySQL** (or any compatible database)
- **npm** (Node Package Manager)

---



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### You can view all the services endpoints  docs from [postman workspace](https://martian-satellite-271571.postman.co/workspace/diaries~9f1a8c53-170b-4ccd-81b0-fdaad1e0efdb/collection/28812009-f47e9000-fa3a-4c45-8c91-f20977a452f7?action=share&creator=28812009)

