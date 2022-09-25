const logger = require('tracer');

module.exports = logger.colorConsole({
  format: '{{message}} (in {{file}}:{{line}})',
});

// By default Node js don' show line number wen using console.log()
// This function solves this problem
/*
    DOCS LINK:
    https://github.com/baryon/tracer
 */
