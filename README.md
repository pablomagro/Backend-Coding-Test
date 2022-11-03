# Backend Coding Test

This project serves as the API for a requested backend test code.

## Commands

- `npm run build`

Build the app for production to the `build` folder.

- `npm start`

Run the app in the development mode on port `9999`.

- `npm start:watch`

Run the app in the development mode checking for changes on port `9999`.

- `npm test`

Launch the unit tests.

## Test End-points

In the project root folder install project dependencies `npm i` and execute below command.

```bash
# Run server in development mode.
npm run start:watch

# Test first endpoint
curl --location --request GET 'localhost:9999'

# or open a browser and run http://localhost:9999.

# Test second endpoint
curl --location --request POST localhost:9999/test2
```

## Notes

- As there is no documentation regarding Reckon end-points responses it assumes that provided values are correct as the same type of the provided examples. I can include some validations from the API response for example check if the outputDetails list from the divisorInfo response is an Array object, but I consider that it's part of the scope of this test (maybe I am wrong); in the case that something fails the error will be handled by the controller.
- It assumes when those unreliable end-points provided fail, it's throwing an exception (nothing has been specified).
- Unit tests are ONLY completed for the required end-points development.
