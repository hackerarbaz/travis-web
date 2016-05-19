import PageObject from 'travis/tests/page-object';

let {
  clickable,
  collection,
  fillable,
  hasClass,
  text,
  value,
  visitable
} = PageObject;

export default PageObject.create({
  visit: visitable(':organization/:repo/settings'),

  buildOnlyWithTravisYml: {
    scope: 'section.settings-section .builds_only_with_travis_yml.switch',

    isActive: hasClass('active'),
    toggle: clickable()
  },

  buildPushes: {
    scope: 'section.settings-section .build_pushes.switch',

    isActive: hasClass('active'),
    toggle: clickable()
  },

  limitConcurrentBuilds: {
    scope: 'section.settings-section .limit-concurrent-builds',

    isActive: hasClass('active', '.switch'),
    value: value('input'),
    fill: fillable('input'),
    toggle: clickable('.switch')
  },

  buildPullRequests: {
    scope: 'section.settings-section .build_pull_requests.switch',

    isActive: hasClass('active'),
    toggle: clickable()
  },

  environmentVariables: collection({
    scope: '.settings-list--envvars',
    itemScope: '.settings-envvar',

    item: {
      name: text('.env-var-name'),
      isPublic: hasClass('is-public'),
      value: value('input'),

      delete: clickable('.icon-delete')
    }
  }),

  environmentVariableForm: {
    scope: '.form--envvar',

    fillName: fillable('input[placeholder=Name]'),
    fillValue: fillable('input[placeholder=Value]'),
    makePublic: clickable('.switch'),
    add: clickable('input[type=submit]')
  },

  crons: collection({
    scope: '.settings-list--crons',
    itemScope: '.settings-cron',

    item: {
      branchName: text('.branch-name'),
      interval: text('.interval'),
      nextEnqueuing: text('.next-enqueuing'),
      disableByBuildText: text('.disable-by-build')
    }
  })
});
