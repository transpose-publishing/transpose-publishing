import {JOURNAL_UID_PREFIX} from './constants';
import {generateUid} from './utils';

const spreadSheetUrl = 'https://docs.google.com/spreadsheets/d/1PRhySQOmCIb4VPTXJJESWBwnlS2ZwXlRnO2bNwG1umo';
export const downloadUrl = `${spreadSheetUrl}/export?format=xlsx&id=19fuw6MEVPgoTgqY5Vh8JFEvW_HA4oPaDE_g3BZhB7Ek`;
const gid = "#gid=0";
const firstEntryColumnIndex = 5;

export function fetchData () {
  return new Promise((resolve, reject) => {
    sheetrock({
      url: spreadSheetUrl + gid,
      callback: (errors, options, resp) => {
        const columnsLength = resp.rows[0].cellsArray.length;
        const dataArray = new Array(columnsLength - firstEntryColumnIndex).fill(null);
        for (const row of resp.rows) {
          let indexCounter = firstEntryColumnIndex;
          const label = row.cellsArray[1];
          while(indexCounter < columnsLength) {
            if(!dataArray[indexCounter - firstEntryColumnIndex]?.uid) {
              dataArray[indexCounter - firstEntryColumnIndex] = {uid: generateUid(JOURNAL_UID_PREFIX)}
            }
            dataArray[indexCounter - firstEntryColumnIndex][label] = row.cellsArray[indexCounter];
            indexCounter++
          }
        }
        resolve(dataArray)
      }
    });
  });
}
