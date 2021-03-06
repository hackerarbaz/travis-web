import PageObject from 'travis/tests/page-object';

let {
  visitable,
  clickable,
  isVisible,
  text
} = PageObject;

export default PageObject.create({
  visit: visitable('travis-ci/travis-web/jobs/1'),

  branch: text('.commit-branch'),
  message: text('.build-title'),
  state: text('.build-status'),
  author: text('.commit-author'),
  log: text('#log'),
  logError: text('.job-log .notice'),

  hasTruncatedLog: isVisible('.log-container p.warning'),

  restartJob: clickable('.action-button--restart'),
  cancelJob: clickable('.action-button--cancel'),
  debugJob: clickable('.action-button--debug'),

  notification: text('p.flash-message')
});
