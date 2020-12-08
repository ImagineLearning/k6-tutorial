# k6 tutorial

A simple example project to help in getting started with k6.
Please refer to the [k6 documentation](https://k6.io/docs/) for more information.

## With Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Building

Build the mock API using the following command:

```bash
docker-compose build api
```

### Running

Run the mock API with Docker Compose with the following:

```bash
docker-compose up -d api
```

Then run the test with the following command:

```bash
docker-compose run --rm k6 run -e BASE_URL=http://api:3000 test/load/api.test.js
```

## Without Docker

### Prerequisites

- [Node/NPM](https://nodejs.org/en/download/)
- [k6](https://k6.io/docs/getting-started/installation)

### Setup

```bash
npm install
```

### Running

Start the mock API with the following:

```bash
npm start
```

Then in a different terminal window, use the following to run the load test:

```bash
k6 run test/load/api.test.js
```
