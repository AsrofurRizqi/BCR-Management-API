## BCR-Management-API

Express RestFull API Data mobil yang dilengkapi dengan Auth Controller menggunakan bcrypt dan jwt

#### Published OpenAPI Documentation
[Swagger Documentation](https://app.swaggerhub.com/apis/AsrofurRizqi/challenge-6/1.0)
#### Superadmin Data
    nama : asrop
    email : asrop@gmail.com
    password : 123456
#### Endpoints
- OpenAPI Swagger UI
    - ```GET /openapi```
- Auth
    - ```POST /auth/login```
    - ```POST /auth/register```
    - ```POST /auth/reg-admin```
    - ```GET /auth/WhoAmI```
- Cars Admin
    - ```GET /cars```
    - ```POST /cars```
    - ```GET /cars/:id```
    - ```PUT /cars/:id```
    - ```DELETE /cars/:id```
- Cars Member
    - ```GET /cars/member```