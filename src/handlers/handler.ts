import * as jwt from 'jsonwebtoken'
import Reply from '../utils/reply'


// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {
    principalId
  };

  if (effect && resource) {
    const statementOne = {
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    };

    const policyDocument = {
      Version: '2012-10-17',
      Statement: [statementOne]
    };

    authResponse['policyDocument'] = policyDocument;
  }
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.auth = (event, context, cb) => {
  console.log(event)

  if (event.authorizationToken) {
    // remove "bearer " from token
    const token = event.authorizationToken.substring(7);
    const options = {
      // algorithms: ['HS256'],
      ignoreNotBefore: true,
      clockTolerance: 30 * 60
    };

    console.log('>> Token: ', token);

    try {
      var decoded = jwt.verify(token, 'YOUR_SECRET_HERE', options);

      console.log('>> TOKEN IS VALID!')
      cb(null, generatePolicy(decoded['sub'], 'Allow', event.methodArn));
    } catch (err) {
      // console.log(err)
      console.log('Unauthorized: invalid token')
      // cb({message: 'Unauthorized: invalid token'});
      cb(new Error('Unauthorized: invalid token'));
    }
  } else {
    console.log('Unauthorized: token is missing');
    // cb({message: 'Unauthorized: token is missing'});
    cb(new Error('Unauthorized: token is missing'));
  }
};

// Public API
module.exports.publicEndpoint = (event, context, cb) => {
  cb(null, { message: 'Welcome to your Public API!' });
};

// Token API
module.exports.tokenEndpoint = (event, context, cb) => {
  const token = jwt.sign({
    data: 'foobar',
    food: 'pizza',
    planet: 'earth'
  }, 'YOUR_SECRET_HERE', { expiresIn: '1h' });

  cb(null, Reply.success({
    token
  }));
};

// Private API
module.exports.privateEndpoint = (event, context, cb) => {
  cb(null, Reply.success({
    message: 'Only logged in users can see this.'
  }));
};
