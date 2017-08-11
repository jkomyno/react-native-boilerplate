jest.useFakeTimers();
jest.unmock('app/utils'); // to use the actual implementation of app/utils

import {
  PromiseTimeout,
} from 'app/utils';

describe('PromiseTimeout', () => {
  it('waits x ms to before executing the promise', () => {
    const x = 10;
    PromiseTimeout(x, Promise);

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(x);
  });
});
