import Ember from 'ember';
import config from 'travis/config/environment';

const { service } = Ember.inject;
const { alias } = Ember.computed;

import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  auth: service(),
  flashes: service(),

  user: alias('auth.currentUser'),

  canActivate: function() {
    let user = this.get('user');
    if(user) {
      let permissions = user.get('pushPermissions'),
          repoId = parseInt(this.get('repo.id'));

      return permissions.contains(repoId);
    } else {
      return false;
    }
  }.property('user.pushPermissions.[]', 'repo'),

  activate: task(function * () {
    const apiEndpoint = config.apiEndpoint;
    const repoId = this.get('repo.id');

    try {
      const response = yield $.ajax(`${apiEndpoint}/v3/repo/${repoId}/enable`, {
        headers: {
          Authorization: `token ${this.get('auth').token()}`
        },
        method: 'POST'
      });

      if (response.active) {
        const pusher = this.get('pusher');
        pusher.subscribe(`repo-${repoId}`);
        this.get('repo').set('active', true);
        this.get('flashes').success('Repository has been successfully activated.');
      }
    } catch (e) {
      this.get('flashes').error('There was an error while trying to active the repository.');
    }
  })
});
