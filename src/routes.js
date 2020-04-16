/**
 * API to pull origin/master to latest
 */
module.exports = function routes(app, kites) {
    const workdir = kites.options.GIT_WORKDIR;
    kites.logger.info('Git UI working on: ' + workdir);

    const git = require('simple-git/promise');

    app.get('git-ui/pull', (req, res) => {
        git(workdir)
        .pull('origin', 'master')
        .then(() => {
            res.send('Ok!');
        })
        .catch(err => {
            res.status(400).send(err);
        })
    });
}