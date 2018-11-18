# Codefiction Stats Project

## Running the application

Two applications are merged together in this mono repository;

1. React application under [src](./src) folder.
2. Graphql Server under [resolvers](./resolvers) and [schema](./schema) folders.

### Running and compiling the react app

After the `npm install` you can run `npm run build` to build the react application to the `build` folder.

If you want to run the application you can simply run `npm run start:react`.

React application is using the [react-scripts](https://www.npmjs.com/package/react-scripts). You can do whatever react-scripts allows you to do.

### Running the Graphql Server

First you need to findout the following environment variables. It is not stored in the repository but injected to the application on the deployment time on heroku for security reasons.

```sh
  "SECRET": "API KEY FOR SIMPLECAST API",
  "YOUTUBE": "YOUTUBE KEY",
  "YOUTUBE_KEY": "YOUTUBE SECRET KEY",
  "TWITTER_CONSUMER_API_KEY": "TWITTER APP API KEY",
  "TWITTER_CONSUMER_API_SECRET_KEY": "TWITTER APP SECRET KEY",
  "TWITTER_ACCESS_TOKEN": "TWITTER APP ACCESS TOKEN",
  "TWITTER_ACCESS_SECRET": "TWITTER APP ACCESS SECRET",
  "AWS_ACCESS_KEY": "AWS ACCESS KEY WITH DYNAMODB ACCESS",
  "AWS_ACCESS_SECRET_KEY": "AWS ACCESS KEY WITH DYNAMODB ACCESS"
```

After the `npm install` you need to run the `npm start` to run the server on `http://localhost:4000/graphql`.

#### Debugging the application

If you want to debug the application using vscode you can modify the [launch.json](./.vscode/launch.json) file as the following. Then you can use the debugging features of vscodes as usual.

```json
 "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/server.js",
      "env": {
        "SECRET": "API KEY FOR SIMPLECAST API",
        "YOUTUBE": "YOUTUBE KEY",
        "YOUTUBE_KEY": "YOUTUBE SECRET KEY",
        "TWITTER_CONSUMER_API_KEY": "TWITTER APP API KEY",
        "TWITTER_CONSUMER_API_SECRET_KEY": "TWITTER APP SECRET KEY",
        "TWITTER_ACCESS_TOKEN": "TWITTER APP ACCESS TOKEN",
        "TWITTER_ACCESS_SECRET": "TWITTER APP ACCESS SECRET",
        "AWS_ACCESS_KEY": "AWS ACCESS KEY WITH DYNAMODB ACCESS",
        "AWS_ACCESS_SECRET_KEY": "AWS ACCESS KEY WITH DYNAMODB ACCESS"
      }
    }
  ]
```

### Deployment pipeline

#### React application

- [Build job](https://eu-west-1.console.aws.amazon.com/codesuite/codebuild/projects/codefictionStats/history?region=eu-west-1)
- [S3 Bucket](http://stats.codefiction.tech.s3-website-eu-west-1.amazonaws.com)

#### Graphql Server

- [Build & deployment job](https://dashboard.heroku.com/apps/codefiction-stats/)
- [Deployment Url](https://codefiction-stats.herokuapp.com/graphql)