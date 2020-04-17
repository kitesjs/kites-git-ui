const git = require('simple-git/promise');

/**
 * API to pull origin/master to latest
 */
module.exports = function routes(app) {

  /**
   * Webhook endpoint (get)
   */
  app.get('/git-ui/pull', (req, res) => {
    const { kites } = req;
    const workdir = kites.options.GITWORKDIR;
    kites.logger.info('Git UI working on: ' + workdir);

    if (!workdir) {
      return res.status(400).send('GITWORKDIR is not set!');
    }

    git(workdir)
      .silent(true)
      // .reset('hard')
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

  /**
   * Webhook endpoint (post)
   */
  app.post('/git-ui/pull', (req, res) => {
    const { kites } = req;
    const workdir = kites.options.GITWORKDIR;

    if (!workdir) {
      kites.logger.error('GITWORKDIR is not set!');
      return res.status(400).send('GITWORKDIR is not set!');
    } else {
      kites.logger.info('Git UI working on: ' + workdir);
    }

    // send signal ok!
    res.send('OK');

    git(workdir)
      .silent(true)
      .pull('origin', 'master')
      .then((ret) => {

        kites.logger.info(`Git pull origin master success!
          Summary: Changes(${ret.summary.changes}), Insertions(${ret.summary.insertions}), Deletions(${ret.summary.deletions})
          Files: ${ret.files.join(',')}
        `);
      })
      .catch(err => {
        kites.logger.error('Cannot pull origin master: ' + workdir);
        kites.logger.error('ERROR: ' + err && err.message);
      })
  })
}
