export interface RangeInfoDto {
  lower:number;
  upper: number;
}

export interface DivisorInfoDetail {
  divisor: number;
  output: string;
}

export interface DivisorInfoDto {
  outputDetails: DivisorInfoDetail[];
}

export interface TextToSearchDto {
  text: string;
}

export interface SubTextsToSearchDto {
  subTexts: string[];
}

export interface ExpectedResult {
  subtext: string;
  result: string;
}

export interface ExpectedOutputDto {
  candidate: string;
  text: string;
  results: ExpectedResult[];
}
