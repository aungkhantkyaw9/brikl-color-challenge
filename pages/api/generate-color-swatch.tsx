import type { NextApiRequest, NextApiResponse } from "next";

type ColorFormat = {
  type: string;
  color_code: Array<number>;
};

type Error = {
  status: number,
  error_message: string;
};

type Response = {
  status: number,
  data: Array<ColorFormat>;
};

type QueryData = {
  type?: string;
  max_range?: number;
  byte_range?: number;
};

/**
 * Random Color Generate API handler
 * @param req NextApiRequest
 * @param res Either generated color array or error
 */
export default function generateRandomColor(
  req: NextApiRequest,
  res: NextApiResponse<Response | Error>
) {
  const defaultColorFormat: Array<string> = ["rgb", "hsl"];
  let result: Array<number>;
  let colorSwatch: Array<ColorFormat> = [];

  const queryData: QueryData = req.query;

  if (queryData.type) {
    if (queryData.type === "") {
      res.status(400).json({
        status: 400,
        error_message: "Please provide valid color type",
      });
    } else if (!queryData.max_range || isNaN(queryData.max_range)) {
      res.status(400).json({
        status: 400,
        error_message: "Max range is required for custom color space",
      });
    } else if (queryData.max_range < 1) {
      res.status(400).json({
        status: 400,
        error_message: "Max range value must be greater than 0",
      });
    } else if (!queryData.byte_range || isNaN(queryData.byte_range)) {
      res.status(400).json({
        status: 400,
        error_message: "Byte range is required for custom color space",
      });
    } else if (queryData.byte_range < 3) {
      res.status(400).json({
        status: 400,
        error_message: "Byte range must be at least 3 bytes",
      });
    } else {
      for (let i = 0; i < 5; i++) {
        result = customRandomColorGenerator(
          queryData.max_range,
          queryData.byte_range
        );

        colorSwatch.push({
          type: queryData.type,
          color_code: result,
        });
      }

      res.status(200).json({
        status: 200,
        data: colorSwatch,
      });
    }
  } else {
    for (let i = 0; i < 5; i++) {
      let randomFormat: string =
        defaultColorFormat[Math.floor(Math.random() * 2)];
      result = defaultRandomColorGenerator(randomFormat);

      colorSwatch.push({
        type: randomFormat,
        color_code: result,
      });
    }

    res.status(200).json({
      status: 200,
      data: colorSwatch,
    });
  }
}

/**
 * Generate default random color swatch if no value provide
 * by client side
 * @param colorFormat color representation (rgb, hls, etc...)
 */
function defaultRandomColorGenerator(colorFormat: string) {
  let colorCode: Array<number> = [];

  if (colorFormat === "rgb") {
    colorCode = [randomInteger(255), randomInteger(255), randomInteger(255)];
  } else if (colorFormat === "hsl") {
    colorCode = [randomInteger(360), randomInteger(100), randomInteger(100)];
  }

  return colorCode;
}

/**
 * Generate random color swatch with custom color space
 * by client side
 * @param max maximum range for custom color space
 */
function customRandomColorGenerator(max: number, byteRange: number) {
  let colorCode: Array<number> = [];

  for (let i = 0; i < byteRange; i++) {
    colorCode.push(randomInteger(max));
  }

  return colorCode;
}

/**
 * Random number generator
 * @param max upper bound for random number
 * @returns generated number
 */
function randomInteger(max: number) {
  return Math.floor(Math.random() * (++max));
}
