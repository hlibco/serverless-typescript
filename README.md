## Start

### Config

Create a file called `serverless.env.yml` on the root of this project with the following content:

```
default_env: &default_env
  SERVICE: 'myservice'
  REGION: 'us-west-2'
  STAGE: 'dev'

dev:
  <<: *default_env
  PROFILE: 'CHANGE IT HERE'
  ACCOUNT_ID: 'CHANGE IT HERE'
  ACCOUNT_CANONICAL_ID: 'CHANGE IT HERE'
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