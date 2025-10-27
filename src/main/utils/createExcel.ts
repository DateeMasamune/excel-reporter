import ExcelJS from "exceljs";
import logo from "../assets/images/logo.jpg";

import { applyTableStyles } from "./applyTableStyles";
import { applyBlankStructure } from "./applyBlankStructure";
import { getLogoAsArrayBuffer } from "./getLogoAsArrayBuffer";
import { logger } from "../logger";
import { getBlankStructure } from "./getBlankStructure";
import { COLUMN_WIDTH, IMAGE_SIZE } from "../constants";

const calcWidthCol = (originalPixels: number[]) =>
  originalPixels.map((pixels) => ({
    width: Math.round(Math.max(1, pixels / 7.5)), // 7.5 - среднее значение
  }));

/**
 * Создает бланк ТОКИО в формате Excel
 */
export async function createExcel(): Promise<Buffer> {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Лист1");
    const blankStructure = getBlankStructure([
      {
        id: "1",
        name: "Котлета",
        price: 123,
        count: 2,
      },
      {
        id: "2",
        name: "Котлета",
        price: 123,
        count: 3,
      },
      {
        id: "3",
        name: "Котлета",
        price: 123,
        count: 4,
      },
      {
        id: "4",
        name: "Арбуз",
        price: 130,
        count: 15,
      },
      {
        id: "5",
        name: "Кола",
        price: 80,
        count: 34,
      },
    ]);

    logger.info("Создание бланка ТОКИО...");

    // Настройка ширины колонок
    worksheet.columns = calcWidthCol(COLUMN_WIDTH);

    // Добавляем логотип
    try {
      logger.info(" Добавление логотипа...");
      const logoBuffer = getLogoAsArrayBuffer(logo);

      const imageId = workbook.addImage({
        buffer: logoBuffer,
        extension: "png",
      });

      // Вставляем изображение в первую строку
      worksheet.addImage(imageId, {
        tl: { col: 0.5, row: 0.9 },
        ext: {
          width: IMAGE_SIZE.width,
          height: IMAGE_SIZE.height,
        },
      });

      logger.info("Логотип добавлен");
    } catch (imageError) {
      console.error("Ошибка при добавлении логотипа:", imageError);
    }

    // Применяем структуру бланка
    logger.info(" Применение структуры бланка...");
    applyBlankStructure(worksheet, blankStructure);

    // Применяем дополнительные стили
    logger.info(" Применение стилей...");
    applyTableStyles(worksheet, blankStructure);

    // Создаем дополнительные пустые листы
    workbook.addWorksheet("Лист2");
    workbook.addWorksheet("Лист3");

    // Генерируем буфер
    logger.info(" Генерация Excel файла...");
    const buffer = await workbook.xlsx.writeBuffer();
    const sendBuffer = Buffer.from(buffer);

    logger.info(" Бланк успешно создан, размер:", sendBuffer.length, "байт");
    return sendBuffer;
  } catch (error) {
    console.error("❌ Ошибка создания бланка ТОКИО:", error);
    throw new Error(`Не удалось создать бланк: ${error.message}`);
  }
}
