define(["Inheritance","./SimpleLogAppender","./BufferAppender","Executor","Environment","IllegalArgumentException"],
    function(Inheritance,SimpleLogAppender,BufferAppender,Executor,Environment,IllegalArgumentException) {

  Environment.browserDocumentOrDie();
  
  /**
   * Constructor for AlertAppender.
   * @constructor
   * 
   * @param {String} [level] The threshold level at which the SimpleLogAppender is created.
   * It should be one of "DEBUG", "INFO", "WARN", "ERROR" and "FATAL". If not
   * or wrongly specified INFO is assumed.
   * @param {String} [category] The category this appender should listen to.
   * If not specified the appender will get log for every available category.
   * See {@link SimpleLogAppender#setCategoryFilter}.
   * @param {int} [dim] Number of log messages to wait before sending a cumulative alert.
   * This parameter is optional, if lower than 1 or no value is passed, 5 is assumed.
   * 
   * @exports AlertAppender
   * @class AlertAppender extends SimpleLogAppender and implements publishing of log messages
   * by issuing the specific browser alert.
   * AlertAppender instance objects can be configured with a window dimension, so as to wait 
   * for the specified number of messages before sending an alert.
   * 
   * @extends SimpleLogAppender
   */
  var AlertAppender = function(level, category, dim) {

    this._callSuperConstructor(AlertAppender, [level, category]);
  
    // log lines to be buffered before the alert is shown
    if ( !dim || dim < 0 ) {
      this.alertDim = 5; 
    } else {
      this.alertDim = dim;
    }
      
    // rows already buffered
    this.accumulated = 0; 
    // buffer
    this.buffer = new BufferAppender(level, category);

  };

  AlertAppender.prototype = {

    /**
     * @private
     */
    showAlert: function(text) {
      alert(text);
    },
  
    /**
     * Add a log message in a AlertAppender private instance. If the accumulated messages exceed the 
     * limit a show alert function is called.
     * 
     * @param {String} category the logger category that produced the given message.
     * @param {String} level the logging level of the given message. It should be one of DEBUG INFO WARN ERROR FATAL.
     * @param {String} mex the message to be logged. It could be a String instance, an Error instance or any other
     * object, provided that it has a toString method.
     * @param {String} header a header for the message
     */
    log: function(cat, level, mex, header) {
      this.accumulated++;
      this.buffer.log(cat, level, mex, header);
      if (this.accumulated >= this.alertDim) {
        this.accumulated = 0;
        
        Executor.addTimedTask(this.showAlert,0,this,[this.buffer.getLog(this.alertDim,"\n","",false,this.myLevel)]);
        
        this.buffer = new BufferAppender();
      }
    }

  };

  AlertAppender.prototype["log"] = AlertAppender.prototype.log;
  
  Inheritance(AlertAppender, SimpleLogAppender);
  return AlertAppender;
});