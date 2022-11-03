import { reckonClient } from '../infrastructure';
import { BadRequestError } from '../infrastructure/errors';
import { DivisorInfoDetail } from '../dto/ReckonApiDto';

class Test1Service {
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

    if (!lower || !upper || (!outputDetails || !outputDetails.length)) {
      throw new BadRequestError('Invalid API response data provided');
    }

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
