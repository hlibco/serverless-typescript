## Start

### Config

Update your `~/.aws/credentials` with your AWS credentials:

```
[CHOOSE_A_PROFILE_NAME]
aws_access_key_id = CHANGE_IT_HERE
aws_secret_access_key = CHANGE_IT_HERE
```


Create a file called `serverless.env.yml` on the root of this project with the following content:

```
default_env: &default_env
  SERVICE: 'myservice'
  REGION: 'us-west-2' # CHANGE YOUR REGION
  STAGE: 'dev'

dev:
  <<: *default_env
  PROFILE: 'CHANGE_IT_HERE'
  ACCOUNT_ID: 'CHANGE_IT_HERE'
  ACCOUNT_CANONICAL_ID: 'CHANGE_IT_HERE'
  STAGE: 'dev'
```


### Deploy

`npm run deploy`


### Remove

`npm run remove`


### Develop

In your project root run:

`serverless offline start` or `sls offline start`

to list all the options for the plugin run:

`sls offline --help`



## Read it later
https://www.npmjs.com/package/serverless-domain-manager