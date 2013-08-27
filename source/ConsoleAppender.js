define(["Inheritance","./SimpleLogAppender","IllegalStateException"], 
    function(Inheritance,SimpleLogAppender,IllegalStateException) {

  /**
   * Constructor for ConsoleAppender.
   * @constructor
   * 
   * @throws {IllegalStateException} if the environment does not have any console object 
   * or if such console is currently inaccessible. 
   * 
   * @param {String} [level] The threshold level at which the SimpleLogAppender is created.
   * It should be one of "DEBUG", "INFO", "WARN", "ERROR" and "FATAL". If not
   * or wrongly specified INFO is assumed.
   * @param {String} [category] The category this appender should listen to.
   * If not specified the appender will get log for every available category.
   * See {@link SimpleLogAppender#setCategoryFilter}.
   * 
   * @exports ConsoleAppender
   * @class ConsoleAppender extends SimpleLogAppender printing messages
   * on the console.
   * 
   * @extends SimpleLogAppender
   */
  var ConsoleAppender = function(level, category) {
    if (typeof console == "undefined") {
      throw new IllegalStateException("This appender can't work if a console is not available. Enable the Browser console if possible or change appender.");
    }
    
    this._callSuperConstructor(ConsoleAppender, [level, category]);
  };

 
  ConsoleAppender.prototype = {

    /**
     * Publish a log message on the console. 
     * 
     * @param {String} category the logger category that produced the given message.
     * @param {String} level the logging level of the given message. It should be one of DEBUG INFO WARN ERROR FATAL.
     * @param {String} mex the message to be logged. It could be a String instance, an Error instance or any other
     * object, provided that it has a toString method.
     * @param {String} header a header for the message
     * 
     */
    log: function(category, level, mex, header) {
      mex = this.composeLine(category, level, mex, header);
      switch(level) {
        case "DEBUG": 
          if (console.debug) {
            console.debug(mex);
            return;
          }
          break;
        case "INFO": 
          if (console.info) {
            console.info(mex);
            return;
          }
          break;
        case "WARN": 
          if (console.warn) {
            console.warn(mex);
            return;
          }
          //do not break
        default: //FATAL || ERROR
          if (console.error) {
            console.error(mex);
            return;
          }
      };
      console.log(mex);
    }
  };
  
  //c�losure compile exports
  ConsoleAppender.prototype["log"] = ConsoleAppender.prototype.log;  
  
  Inheritance(ConsoleAppender, SimpleLogAppender);
  return ConsoleAppender;
});