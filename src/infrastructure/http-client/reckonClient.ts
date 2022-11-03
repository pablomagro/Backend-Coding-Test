import axios from 'axios';
import { retry } from '../../utils';
import {
  DivisorInfoDto, RangeInfoDto,
  TextToSearchDto, SubTextsToSearchDto,
  ExpectedOutputDto
} from '../../dto/ReckonApiDto';

const RECKON_TESTING_API_URL = 'https://join.reckon.com';

class ReckonClient {
  public async getRangeInfo(): Promise<RangeInfoDto> {
    const { data } = await axios.get(`${RECKON_TESTING_API_URL}/test1/rangeInfo`);
    console.debug('🚀 ~ file: reckonClient.ts ~ line 14 ~ ReckonClient ~ getRangeInfo ~ data', data);
    return data;
  }

  public async getRangeInfoWithRetry(): Promise<RangeInfoDto> {
    return retry(this.getRangeInfo);
  }

  public async getDivisorInfo(): Promise<DivisorInfoDto> {
    const { data } = await axios.get(`${RECKON_TESTING_API_URL}/test1/divisorInfo`);
    console.debug('🚀 ~ file: reckonClient.ts ~ line 24 ~ ReckonClient ~ getDivisorInfo ~ data', data);
    return data;
  }

  public async getDivisorInfoWithRetry(): Promise<DivisorInfoDto> {
    return  retry(this.getDivisorInfo);
  }

  private async getTextToSearch(): Promise<TextToSearchDto> {
    const { data } = await axios.get(`${RECKON_TESTING_API_URL}/test2/textToSearch`);
    console.debug('🚀 ~ file: reckonClient.ts ~ line 32 ~ ReckonClient ~ getTextToSearch ~ data', data);
    return data;
  }

  public async getTextToSearchWithRetry(): Promise<TextToSearchDto> {
    return retry(this.getTextToSearch);
  }

  public async getSubTextsToSearch(): Promise<SubTextsToSearchDto> {
    const { data } = await axios.get(`${RECKON_TESTING_API_URL}/test2/subTexts`);
    console.debug('🚀 ~ file: reckonClient.ts ~ line 41 ~ ReckonClient ~ getSubTextsToSearch ~ data', data);
    return data;
  }

  public async getSubTextsToSearchWithRetry(): Promise<SubTextsToSearchDto> {
    return retry(this.getSubTextsToSearch);
  }

  public async postResults(payload: ExpectedOutputDto): Promise<void> {
    await axios.post(`${RECKON_TESTING_API_URL}/test2/submitResults`, payload);
  }

  public async postResultsWithRetry(payload: ExpectedOutputDto): Promise<void> {
    retry(this.postResults, [payload]);
  }
}

export default new ReckonClient();
