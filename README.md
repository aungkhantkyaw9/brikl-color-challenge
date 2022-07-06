# Brikl Color Challenge

## Pre-requisites

  - Node.js version 10.13 or later
  - Implemented using Next.JS and Typescript and Styled Component

<br/>

## Project Setup

Clone repository from `https://github.com/aungkhantkyaw9/brikl-color-challenge.git`

Then `cd` to project directory and switch the branch you want to run


After finished, open the project and run following:

```bash
> npm install
```

<br/>

When finished, start the server using `npm run dev` <br/><br/>

Go to `http://localhost:3000` in your browser. 

<br/>

Random 5 color swatches with different color space (mix RGB and HSL as default) will generate and show when form load. Clicking on `Generate` button will regenerate 5 random color swatches with different color space (mix RGB and HSL as default).

<br/>

## API

URI
```Javascript
http://localhost:3000/api/generate-color-swatch
```

Method
```Javascript
GET
```

Payload
-   `type`: (string) Name of custom color representation
-   `max_range`: (number) Must be greater than 0
-   `byte_range`: (number) Used to define total bytes representation (Eg. rgb(10,39,23) or rgba(49, 199, 54, 32) )

<br><br>

Example Payload
```Javascript
{
    type: brgb,
    max_range: 10000,
    byte_range: 3
}
```

<br><Br>

Response
-   `status`: (integer) HTTP Status Code
-   `error_message`: (string) Error message for error reponse
-   `data`: (array) Formatted JSON array
-   `type`: (string) Custom color representation name
-   `color_code`: (array) Generated color code. Default 3 bytes or custom bytes length base on user request


Example Response (Default)
```Javascript
{
    "status": 200,
    "data": [
        {
            "type": "rgb",
            "color_code": [
                199,
                41,
                220
            ]
        },
        {
            "type": "rgb",
            "color_code": [
                182,
                96,
                44
            ]
        },
        {
            "type": "hsl",
            "color_code": [
                140,
                2,
                32
            ]
        },
        {
            "type": "hsl",
            "color_code": [
                222,
                32,
                60
            ]
        },
        {
            "type": "hsl",
            "color_code": [
                30,
                56,
                12
            ]
        }
    ]
}
```

<br>

Example Response (w/Custom Payload)
```Javascript
{
    "status": 400,
    "data": [
        {
            "type": "brgb",
            "color_code": [
                1435,
                5282,
                9379
            ]
        },
        {
            "type": "brgb",
            "color_code": [
                6538,
                1552,
                9071
            ]
        },
        {
            "type": "brgb",
            "color_code": [
                5410,
                4253,
                58
            ]
        },
        {
            "type": "brgb",
            "color_code": [
                5731,
                3885,
                5958
            ]
        },
        {
            "type": "brgb",
            "color_code": [
                884,
                7056,
                5851
            ]
        }
    ]
}
```