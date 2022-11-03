import { reckonClient } from '../infrastructure';
import { DivisorInfoDetail } from '../dto/ReckonApiDto';

class Test1Service {
  /**
   * It always assumes that it's going returned right values.
   * @return {*}  {Promise<string>}
   */
  public async getDivisibleString(): Promise<string> {
    const [
      rangeInfoResponse,
      divisorInfoResponse,
    ] = await Promise.all([
      reckonClient.getRangeInfoWithRetry(),
      reckonClient.getDivisorInfoWithRetry()
    ]);

    const { lower, upper } = rangeInfoResponse;
    const { outputDetails } = divisorInfoResponse;

    let outputString = '';
    let currentDivisor;

    for (let index = lower; index <= upper; index++) {
      currentDivisor = '';
      outputDetails.forEach((outputDetail: DivisorInfoDetail) => {
        if (index % outputDetail.divisor === 0) {
          currentDivisor += outputDetail.output;
        }
      });
      outputString += `${index}:${currentDivisor ? ` ${currentDivisor}` : ''}\n`;
    }

    return outputString;
  }
}

export default new Test1Service();
