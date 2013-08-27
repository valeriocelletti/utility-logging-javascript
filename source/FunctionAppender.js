define(["Inheritance","./SimpleLogAppender"], 
    function(Inheritance,SimpleLogAppender) {

  
  /**
   * Constructor for FunctionAppender.
   * @constructor
   * 
   * @param {String} [level] The threshold level at which the SimpleLogAppender is created.
   * It should be one of "DEBUG", "INFO", "WARN", "ERROR" and "FATAL". If not
   * or wrongly specified INFO is assumed.
   * @param {String} [category] The category this appender should listen to.
   * If not specified the appender will get log for every available category.
   * See {@link SimpleLogAppender#setCategoryFilter}.
   * @param {Function} functionToCall a well defined function to call passing log messages.
   * The function will be invoked with a single String argument.
   * @param {Object} [objectToApplyTo] an instance of object to apply the functionToCall to.
   * 
   * @exports FunctionAppender
   * @class FunctionAppender extends SimpleLogAppender and implements the publishing 
   * of log messages by invocation of a custom function.
   *
   * @extends SimpleLogAppender
   */
  var FunctionAppender = function(level, category, functionToCall, objectToApplyTo) {
    this._callSuperConstructor(FunctionAppender, [level, category]);
          
    this.functionToCall = functionToCall;
    this.objectToApplyTo = objectToApplyTo || null;
  };

    
  FunctionAppender.prototype = {
   
    /**
     * Publish a log message by calling the specified function.
     * 
     * @param {String} category the logger category that produced the given message.
     * @param {String} level the logging level of the given message. It should be one of DEBUG INFO WARN ERROR FATAL.
     * @param {String} mex the message to be logged. It could be a String instance, an Error instance or any other
     * object, provided that it has a toString method.
     * @param {String} header a header for the message
     * 
     */
    log: function(category, level, mex, header) {
      var toCall = this.functionToCall;
        
      if (toCall.apply) {
        var _line = this.composeLine(category, level, mex, header);
        try {
          toCall.apply(this.objectToApplyTo, [_line]);
        } catch(_e) {
          // Nothing to do.
        }
      } //else no way to call it, btw it should never be the case as all the supported browser have the apply method
    }
  };
  
  FunctionAppender.prototype["log"] = FunctionAppender.prototype.log;  

  Inheritance(FunctionAppender, SimpleLogAppender); 
  return FunctionAppender;
});