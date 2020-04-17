const git = require('simple-git/promise');

/**
 * API to pull origin/master to latest
 */
module.exports = function routes(app) {

  app.get('/git-ui/pull', (req, res) => {
    const { kites } = req;
    const workdir = kites.options.GITWORKDIR;
    kites.logger.info('Git UI working on: ' + workdir);

    if (!workdir) {
      return res.send('GITWORKDIR is not set!');
    }

    git(workdir)
      .pull('origin', 'master')
      .then((ret) => {
        // TODO: render to view
        res.send(ret);
      })
      .catch(err => {
        kites.logger.error('Cannot pull origin master: ' + workdir);
        res.status(400).send(err);
      })
  });
}
