# Node JS Intermediate Test for TalentQL

## Pre-Requisities
- [Node JS](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- [MongoDB](https://docs.mongodb.com/manual/installation/) 

## Installation
- Run `yarn` to install dependencies
- Run `yarn test` to test application endpoints

## Usage
- Run `yarn start` to start application

## API Documentation
- You can view API documentation [here](https://documenter.getpostman.com/view/15113295/TzRa648Y)
- Alternatively you can import it into your desktop Postman from `/fixtures/api/v1`

## Special Libraries Used
- [@meltwater/phi](https://github.com/meltwater/phi) - This lib combines Ramda and Ramda Adjunct libraries
- [ava](https://github.com/avajs/ava) - This lib is for unit testing
- [supertest](https://github.com/visionmedia/supertest) - This lib is for e2e testing API
- [awilix](https://github.com/jeffijoe/awilix) - This lib is for dependency injection

## Notes
I run out of time so I did not write as much tests as I'd have liked to but
- There is a test in `lib/util/authentication.spec.js` to showcase my approach to unit tests
- There is a test in `tests/e2e.spec.js` to showcase my approach to integration tests
- There is a test in `lib/storage/mongodb/models.spec.js` to showcase my approach to snapshot tests