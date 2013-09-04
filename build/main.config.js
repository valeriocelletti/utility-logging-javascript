require({

    baseUrl: "../source",
    keepBuildDir: false,
    generateSourceMaps: true,
    optimize: "closure",
    closure: {
        CompilationLevel: 'ADVANCED_OPTIMIZATIONS',
        loggingLevel: 'SEVERE',
        externs: [
          "externs.js"
        ],
        ignoreDefaultExterns: false,
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
    
    removeCombined: true,
    
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
        
    preserveLicenseComments: false

})