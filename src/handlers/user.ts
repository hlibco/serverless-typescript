import { Handler, Context, Callback } from 'aws-lambda'
import {capitalize} from '../utils/format'

interface HelloResponse {
  statusCode: number
  body: string
}

const greeting: Handler = (event: any, context: Context, callback: Callback) => {

  const greetings = ['hi', 'hello', 'wassup']
  function getGreeting () {
     return greetings[Math.floor(Math.random() * greetings.length)]
  }

  const response: HelloResponse = {
    statusCode: 200,
    body: JSON.stringify({
      greeting: capitalize(getGreeting()),
      date: new Date()
    })
  }

  callback(undefined, response);
}

export { greeting }