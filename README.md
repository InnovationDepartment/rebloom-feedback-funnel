## reBloom

Customer feedback and bonus offer for [reBloom](https://rebloom.com/).


## Run Locally (Dev)
`yarn dev` without backend debugger

`yarn dev debug` with backend debugger

## Deployment to Staging/Production
1. `yarn build` Builds and optimizes the pages, generates unique build ID
2. `eb deploy <server-name>` Deploys to AWS Elastic Beanstalk
- `rb-review-staging` for staging
- `rb-review-prod` for production
