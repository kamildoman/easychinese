export interface Lesson {
  id: number;
  attributes: {
    Name: string;
    Number: number;
    Section: Sections;
    words?: {
      data: Word[]
    };
  };
}

export interface Word {
  id: number;
  attributes: {
    Chinese: string;
    English: string;
    Pinyin: string;

  }
}

export enum Sections {
  hsk1 = "HSK1",
  hsk2 = "HSK2",
  hsk3 = "HSK3"
}