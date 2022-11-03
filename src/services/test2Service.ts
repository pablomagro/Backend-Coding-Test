import { reckonClient } from '../infrastructure';
import { ExpectedResult, ExpectedOutputDto } from '../dto/ReckonApiDto';

class Test2Service {
  private buildExpectedOutput(text: string, results: ExpectedResult[]): ExpectedOutputDto {
    return {
      candidate : 'Pablo Magro',
      text,
      results
    }
  }

  private findOccurrences(inputString: string, inputSubstring: string): number[] {
    let result: number[] = [];
    if (!inputString || !inputSubstring || inputSubstring.length > inputString.length) {
      return result;
    }
    let start = 1, word = '';

    for (let i = 0; i < inputString.length; i++) {
      if (inputString[i] === ' ') {
        start = (i + 2);
        word = '';
      } else {
        word += inputString[i];
      }

      if (word.toLocaleLowerCase() === inputSubstring.toLocaleLowerCase()) {
        result.push(start);
      }
    }

    return result;
  }

  public async submitTest2Result(): Promise<ExpectedOutputDto> {
    let resultList: ExpectedResult[] = [];
    // Get ranges and divisors information.
    const [textResponse, subTextsResponse] = await Promise.all([
      reckonClient.getTextToSearchWithRetry(),
      reckonClient.getSubTextsToSearchWithRetry()
    ]);
    const { text } = textResponse;
    const { subTexts } = subTextsResponse;

    subTexts.forEach(subtext => {
      const occurrences = this.findOccurrences(text, subtext);

      let result;
      if (occurrences.length) {
        result = occurrences.join(occurrences.length === 1 ? '' : ', ');
      } else {
        result = '<No Output>';
      }

      resultList.push({ subtext, result });
    });

    const expectedOutput = this.buildExpectedOutput(text, resultList);
    await reckonClient.postResultsWithRetry(expectedOutput);
    return expectedOutput;
  }
}

export default new Test2Service();
