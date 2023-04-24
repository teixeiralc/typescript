export interface ICountList {
  [key: string]: number;
}

export default function countBy(arr: (string | number)[]) {
  return arr.reduce((acc: ICountList, cur) => {
    if (!acc[cur]) acc[cur] = 0;
    acc[cur] += 1;
    return acc;
  }, {});
}
