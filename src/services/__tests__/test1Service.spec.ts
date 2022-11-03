import test1Service from '../test1Service';
import { reckonClient } from '../../infrastructure';

describe('Test 1 Service', () => {
  let getRangeInfoWithRetrySpy;
  let getDivisorInfoWithRetrySpy;

  beforeEach(() => {
    getRangeInfoWithRetrySpy = jest.spyOn(reckonClient, "getRangeInfoWithRetry")
      .mockResolvedValue(null);
    getDivisorInfoWithRetrySpy = jest.spyOn(reckonClient, "getDivisorInfoWithRetry")
      .mockResolvedValue(null);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a divisible string', async () => {
    // GIVEN
    getRangeInfoWithRetrySpy.mockResolvedValue({
      lower: 1,
      upper: 6
    });
    getDivisorInfoWithRetrySpy.mockResolvedValue({
      "outputDetails": [
        {
          "divisor": 2,
          "output": "Unit"
        },
        {
          "divisor": 3,
          "output": "Test"
        }
      ]
    });

    // WHEN
    const outcome = await test1Service.getDivisibleString();

    // THEN
    expect(getRangeInfoWithRetrySpy).toHaveBeenCalledTimes(1);
    expect(getDivisorInfoWithRetrySpy).toHaveBeenCalledTimes(1);
    expect(outcome).not.toMatch(/1: /);
    expect(outcome).toMatch(/2: Unit/);
    expect(outcome).toMatch(/3: Test/);
    expect(outcome).toMatch(/4: Unit/);
    expect(outcome).not.toMatch(/5: /);
    expect(outcome).toMatch(/6: UnitTest/);
  });
});
