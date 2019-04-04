# Codefiction Stats Project

The project has two different application in this mono-repo project, and using `lerna` to maintain the dependencies and flow.

## Bootstrapping the dependencies using Lerna

Lerna helps you run `yarn` scripts for both projects. Bootstrapping is the first step to install the project dependencies. It will basically run the `yarn install` for both projects.

```sh
yarn
yarn bootstrap
```

## Running both projects

If you want to run the both projects together using lerna,

```sh
yarn start:all
```

This will kick `yarn start` on both projects. But you need to satisfy the environment variable for the lambda project before running the application. See the next sub-section for further details.

### Running the graphql application

Graphql lambda function is designed to make several requests to different services and aggregate the responses into one single HTTP response. The project is using Apollo Server to serve the graphql POST requests.

In order to succesfully run the full fledged graphql aggregator you need to create a file named `.env` under the `./packages/stats-lambda/` folder. Then put the required environment variables into it. You can checkout the [.env.sample](./packages/stats-lambda/.env.sample) as an example.

```env
SECRET=SECRET
YOUTUBE=SECRET
YOUTUBE_KEY=SECRET
TWITTER_CONSUMER_API_KEY=SECRET
TWITTER_CONSUMER_API_SECRET_KEY=SECRET
TWITTER_ACCESS_TOKEN=SECRET
TWITTER_ACCESS_SECRET=SECRET
AMAZON_AWS_ACCESS_KEY=SECRET
AMAZON_AWS_ACCESS_SECRET_KEY=SECRET
ENGINE_API_KEY=SECRET
```

After satifying the environment variables you can simply run the following command in the root folder to start the application.

```sh
yarn start
```

### Running the React pages

React application is the single page application that displays the results aggregated by the `Graphql Server`.

In order to run the application using lerna run the following command.

```sh
yarn start:react
```

React application is using the [react-scripts](https://www.npmjs.com/package/react-scripts). You can do whatever react-scripts allows you to do.

## The deployment of components

- [Build & Deployment Job for AWS](https://eu-west-1.console.aws.amazon.com/codesuite/codebuild/projects/codefictionStats/history?region=eu-west-1)
- [S3 Bucket](http://stats.codefiction.tech.s3-website-eu-west-1.amazonaws.com)

- [Build & deployment job for Heroku](https://dashboard.heroku.com/apps/codefiction-stats/)
- [Deployment Url](https://codefiction-stats.herokuapp.com/graphql)

## Docker Container

### Why docker?
Why not?

### Run the application

Read the `Running the graphql application` section before continue and make sure you have created the `.env` file.

To run the both containers run the `docker-compose up` command. This will brought up two docker containers for each application.