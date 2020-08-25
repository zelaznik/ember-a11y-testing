import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  a11yAuditIf,
  setEnableA11yAudit,
} from 'ember-a11y-testing/test-support';

module('Integration | Helper | a11yAuditIf', function (hooks) {
  setupRenderingTest(hooks);

  test('a11yAuditIf should not execute a11yAudit', async function (assert) {
    await render(hbs`{{#axe-component}}<button></button>{{/axe-component}}`);

    await a11yAuditIf(this.element);

    assert.ok(true, 'a11yAuditIf should not run a11yAudit');
  });

  test('a11yAudit should execute a11yAudit if enableA11yAudit=true is passed as query param', async function (assert) {
    await render(hbs`{{#axe-component}}<button></button>{{/axe-component}}`);

    setEnableA11yAudit(true);

    try {
      await a11yAuditIf(this.element);
      assert.ok(false, 'audit should have failed');
    } catch (error) {
      let foundExpectedError = error.message.startsWith(
        'The page should have no accessibility violations.'
      );
      assert.ok(foundExpectedError);
    }

    setEnableA11yAudit(false);
  });
});
