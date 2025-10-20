import XLSX from "xlsx";
//@ts-ignore
export const generateExcel = async (event, data, options) => {
  try {
    // Создаем рабочую книгу
    const wb = XLSX.utils.book_new();

    // Преобразуем данные в рабочий лист
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Добавляем лист в книгу
    XLSX.utils.book_append_sheet(wb, ws, options.sheetName || "Report");

    // Генерируем буфер
    const buffer = XLSX.write(wb, {
      type: "buffer",
      bookType: "xlsx",
      compression: true,
    });

    return { success: true, buffer };
  } catch (error) {
    //@ts-ignore
    return { success: false, error: error.message };
  }
};
