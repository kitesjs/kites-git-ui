const routes = require('./routes');

/**
 * Git UI Extension.
 * @param {IKites} kites
 */
function GitUIExtension(kites) {
  kites.on('express:config', routes);
}

module.exports = GitUIExtension;
