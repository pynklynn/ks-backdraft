import { BackdraftPO } from './backdraft.po';

fixture('Test basic usage')
  .page('http://localhost:5173');

test('Should slot content one level deep', async t => {
  await t
    .expect(BackdraftPO.oneLevel.exists)
    .eql(true)
    .expect(BackdraftPO.oneLevelSlottedContent.visible)
    .eql(true)
    .expect(BackdraftPO.oneLevelFallbackContent.visible)
    .eql(false);
});

test('Should show fallback content', async t => {
  await t.expect(BackdraftPO.oneLevelFallbackOnlyFallbackContent.visible).eql(true);
});

test('Should slot content two levels deep', async t => {
  await t
    .expect(BackdraftPO.twoLevel.exists)
    .eql(true)
    .expect(BackdraftPO.twoLevelContent.visible)
    .eql(true);
});

test('Should slot content three levels deep', async t => {
  await t
    .expect(BackdraftPO.threeLevel.exists)
    .eql(true)
    .expect(BackdraftPO.threeLevelContent.visible)
    .eql(true);
});

test('Should slot content in a Lit component', async t => {
  await t
    .expect(BackdraftPO.lit.exists)
    .eql(true)
    .expect(BackdraftPO.litContent.visible)
    .eql(true)
    .expect(BackdraftPO.litNamedContent.visible)
    .eql(true);
});

test('Should handle the slot change event', async t => {
  await t
    .expect(BackdraftPO.changeEventExample.exists)
    .eql(true)
    .expect(BackdraftPO.changeEventNotice.visible)
    .eql(true);
});
