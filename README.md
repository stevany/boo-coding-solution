# Profile
1. NodeJS installation min v16.17.1
2. ExpressJS
3. MongoDB in-memory
4. Mongoose
5. JsonWebToken for user login
6. Bcrypt to encrypt password
7. Cucumber testing
8. Dotenv for custom variable
9. Nodemon
10. Fastest Validator for validation

### Install packages
`npm i`

### Set env
`cp .env.example .env`


### Running Project
```
npm run start
npm run test
```

### Import Postman Collection
`.postman`

### Run test
`npm run test`


## Project Flow
### No Authorization
1. Create Profile
`{{BASE_URL}}/profile`
2. Get Profile By Id -> return view
`{{BASE_URL}}/profile/{{profileId}}`

After Profile created, then login to comment and react
### Login
1. `{{BASE_URL}}/login/` -> user will get token

### Comment
Using token from login
1. Create Comment
`{{BASE_URL}}/profile/{{profileId}}/comment`
2. Get Comment
    a. sort by latest (upatedAt)
    `{{BASE_URL}}/profile/{{profileId}}/comment?sort=updatedAt`
    b. sort by most of like comment
    `{{BASE_URL}}/profile/{{profileId}}/comment?sort=like`
3. Update Comment
    `{{BASE_URL}}/profile/{{profileId}}/comment/{{commentId}}`

### React
Like/Dislike
Using token from login and commentId from create or get comment
`{{BASE_URL}}/profile/{{profileId}}/comment/{{commentId}}/react`




