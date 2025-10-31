import ExcelJS from "exceljs";

export const numberFormatDishes = (
  dishRows: number[],
  worksheet: ExcelJS.Worksheet
) => {
  for (const row of dishRows) {
    const rowB = worksheet.getCell(`B${row}`);
    const rowD = worksheet.getCell(`D${row}`);
    const rowС = worksheet.getCell(`C${row}`);
    [rowB, rowD, rowС].forEach((row) => {
      row.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });
    worksheet.getCell(`B${row}`).numFmt = "#,##0.00";
    worksheet.getCell(`D${row}`).numFmt = "#,##0.00";
  }
};
