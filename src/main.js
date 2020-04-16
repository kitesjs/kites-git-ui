const routes = require('./routes');

/**
 * Git UI Extension.
 * @param {IKites} kites
 */
function GitUIExtension(kites) {
  const workdir = kites.options.env.GIT_WORKDIR;
  kites.logger.info('Git UI working on: ' + workdir, kites.env);

    kites.on('express:config', routes);
}

module.exports = GitUIExtension;
