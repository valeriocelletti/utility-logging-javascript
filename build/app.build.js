({
    baseUrl: "../source",
    dir: "../built/",
    keepBuildDir: false,
    generateSourceMaps: true,
    optimize: "closure",
    closure: {
        CompilationLevel: 'ADVANCED_OPTIMIZATIONS',
        loggingLevel: 'SEVERE',
        avoidGlobals: true
    },

    paths: {
        "Inheritance": "empty:",
        "Executor": "empty:",
        "Environment": "empty:",
        "IllegalArgumentException": "empty:",
        "IllegalStateException": "empty:",
        "Helpers": "empty:"        
    },
    
    modules: [
      {
        name: "utility-logging",
        include: ["AlertAppender",
                  "BufferAppender",
                  "ConsoleAppender",
                  "DOMAppender",
                  "FunctionAppender",
                  "Logger",
                  "LoggerManager",
                  "LoggerProvider",
                  "LoggerProxy",
                  "SimpleLogAppender",
                  "SimpleLogger",
                  "SimpleLoggerProvider",
                  "SimpleLogLevels"
              ]
      }
    ],
    
    /*
    wrap: {
        start: "(function(o) {var l='weswit/';var define = function(c,a,d){for(var b=0;b<a.length;b++)a[b]=l+a[b];o(l+c,a,d)};",
        end: "}(define));"
    },
    */
    
    preserveLicenseComments: false
    
    
})