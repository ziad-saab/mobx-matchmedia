import { autorun } from 'mobx';
import MatchMediaMock from 'jest-matchmedia-mock';
import { matchMedia } from '../src';

let mmm: MatchMediaMock;
beforeEach(() => {
  if (mmm) {
    mmm.destroy();
  }
  mmm = new MatchMediaMock();
});

test("Returns false when media query doesn't match", () => {
  const mq = '(min-width: 500px)';
  const itMatches = matchMedia(mq);
  expect(itMatches).toStrictEqual(false);
});

test('Returns true when media query matches', () => {
  const mq = '(min-width: 500px)';
  mmm.useMediaQuery(mq);
  const itMatches = matchMedia(mq);
  expect(itMatches).toStrictEqual(true);
});

test('Reacts to changes in media query matching', () => {
  const mq = '(min-width: 500px)';
  let itMatches: boolean | undefined;
  const dispose = autorun(() => {
    itMatches = matchMedia(mq);
  });
  expect(itMatches).toStrictEqual(false);
  mmm.useMediaQuery(mq);
  expect(itMatches).toStrictEqual(true);
  dispose();
});