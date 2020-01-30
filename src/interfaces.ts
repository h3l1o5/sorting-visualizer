export interface Data {
  id: number;
  value: number;
  position: number;
  color?: string;
}

export type DataSet = Data[];

export interface Legend {
  description: string;
  color: string;
}

export interface SortingResult {
  movements: DataSet[];
  legends: Legend[];
}

export type Speed = "SLOW" | "NORMAL" | "FAST";
