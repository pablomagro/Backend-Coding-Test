import test2Service from '../test2Service';
import { reckonClient } from '../../infrastructure';
import { BadRequestError } from '../../infrastructure/errors';

describe('Test 2 Service', () => {
  let getTextToSearchWithRetrySpy;
  let getSubTextsToSearchWithRetrySpy;
  let postResultsWithRetrySpy;

  beforeEach(() => {
    getTextToSearchWithRetrySpy = jest.spyOn(reckonClient, 'getTextToSearchWithRetry')
      .mockResolvedValue(null);
    getSubTextsToSearchWithRetrySpy = jest.spyOn(reckonClient, 'getSubTextsToSearchWithRetry')
      .mockResolvedValue(null);
    postResultsWithRetrySpy = jest.spyOn(reckonClient, 'postResultsWithRetry');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should submit the Test 2 result with the right payload', async () => {
    // GIVEN
    getTextToSearchWithRetrySpy.mockResolvedValue({
      text: 'An example test.'
    });
    getSubTextsToSearchWithRetrySpy.mockResolvedValue({
      subTexts: [
        'Test',
        'test',
        'X'
      ]
    });

    // WHEN
    const outcome = await test2Service.submitTest2Result();

    // THEN
    expect(postResultsWithRetrySpy).toHaveBeenCalledTimes(1);

    // Check returned object values and attributes.
    const { results } = outcome;
    expect(Array.isArray(results)).toBeTruthy();
    expect(results.length).toBeGreaterThan(0);
    expect(outcome.candidate).toBeTruthy();
    expect(outcome.text).toBeTruthy();
    expect(results[0]).toEqual({ subtext: 'Test', result: '12' });
    expect(results[1]).toEqual({ subtext: 'test', result: '12' });
    expect(results[2]).toEqual({ subtext: 'X', result: '<No Output>' });
  });

  it('should throw an exception when provided empty text and subtexts objects', async () => {
    // GIVEN
    getTextToSearchWithRetrySpy.mockResolvedValue({});
    getSubTextsToSearchWithRetrySpy.mockResolvedValue({});

    // WHEN
    try {
      await test2Service.submitTest2Result();
    } catch (err) {
    // THEN
      expect(err instanceof BadRequestError).toBe(true);
      expect(err.message).toMatch(/Invalid API response data provided/);
    }
  });
});
