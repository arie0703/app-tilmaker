// Dateをもとにした乱数からユニークなIDを生成する
// [参考] https://qiita.com/coa00/items/679b0b5c7c468698d53f

function getUniqueStr(myStrong?: number): string {
    let strong = 1000;
    if (myStrong) strong = myStrong;
    return (
      new Date().getTime().toString(16) +
      Math.floor(strong * Math.random()).toString(16)
    );
}

export default getUniqueStr