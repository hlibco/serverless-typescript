class Reply {

  private static response (httpCode: number, body: object, headers: null | {} ) {
    headers = headers || {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Expose-Headers': 'X-Amzn-Remapped-Authorization',
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    }

    return {
      statusCode: httpCode || 200,
      headers: headers || {},
      body: JSON.stringify(body)
    }
  }

  // 200
  static success (body, headers = null) {
    return this.response(200, body, headers)
  }

  static created (body, headers) {
    return this.response(200, body, headers = null)
  }

  static updated (body, headers) {
    return this.response(200, body, headers = null)
  }

  static deleted (body, headers) {
    return this.response(200, body, headers = null)
  }

  // 400
  static badRequest (body, headers = null) {
    return this.response(400, body, headers)
  }

  static unauthorized (body, headers = null) {
    return this.response(401, body, headers)
  }

  static notFound (body, headers = null) {
    return this.response(404, body, headers)
  }

  // 500
  static badImplementation (body, headers = null) {
    return this.response(500, body, headers)
  }
}

export default Reply
