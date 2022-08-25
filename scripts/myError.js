class myError extends Error {
    constructor(code = 500, messageID = '00000', errorMessage = 'Internal server error', exceptionMessage = 'Internal server error', allStack = null) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(code, messageID, errorMessage);
    
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, myError)
        }
    
        // Custom debugging information
        this.code = code
        this.messageID = messageID
        this.errorMessage = errorMessage
        this.exceptionMessage = exceptionMessage
        this.allStack = allStack
        this.date = new Date()
      }
}

module.exports = myError