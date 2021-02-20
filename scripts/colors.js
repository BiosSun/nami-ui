const { generate } = require('@k-vyn/coloralgorithm')

// 生成颜色相关的 scss 代码

// 下面的颜色数据通过 [ColorBox](https://colorbox.io/) 生成，你可以将字符串内容导入该网站中以查看它们
const COLORS_DATA_JSONSTR = `
[
  {
    "properties": {
      "steps": 11,
      "hue": {
        "start": 205,
        "end": 220,
        "curve": "easeInQuint"
      },
      "saturation": {
        "start": 0.1,
        "end": 0.8,
        "rate": 1,
        "curve": "easeOutQuad"
      },
      "brightness": {
        "start": 1,
        "end": 0.2,
        "curve": "easeInQuart"
      }
    },
    "options": {
      "minorSteps": [],
      "name": "blue",
      "provideInverted": true,
      "rotation": "clockwise"
    }
  },
  {
    "properties": {
      "steps": 11,
      "hue": {
        "start": 115,
        "end": 135,
        "curve": "easeInQuint"
      },
      "saturation": {
        "start": 0.12,
        "end": 0.8,
        "rate": 1,
        "curve": "easeOutQuad"
      },
      "brightness": {
        "start": 1,
        "end": 0.13,
        "curve": "easeInQuad"
      }
    },
    "options": {
      "minorSteps": [],
      "name": "green",
      "provideInverted": true,
      "rotation": "clockwise"
    }
  },
  {
    "properties": {
      "steps": 11,
      "hue": {
        "start": 349,
        "end": 3,
        "curve": "easeInQuint"
      },
      "saturation": {
        "start": 0.07,
        "end": 0.86,
        "rate": 1,
        "curve": "easeOutQuad"
      },
      "brightness": {
        "start": 1,
        "end": 0.2,
        "curve": "easeInQuart"
      }
    },
    "options": {
      "minorSteps": [],
      "name": "red",
      "provideInverted": true,
      "rotation": "clockwise"
    }
  },
  {
    "properties": {
      "steps": 11,
      "hue": {
        "start": 36,
        "end": 20,
        "curve": "easeInQuint"
      },
      "saturation": {
        "start": 0.1,
        "end": 1,
        "rate": 1,
        "curve": "easeOutQuad"
      },
      "brightness": {
        "start": 1,
        "end": 0.2,
        "curve": "easeInQuart"
      }
    },
    "options": {
      "minorSteps": [],
      "name": "orange",
      "provideInverted": true,
      "rotation": "counterclockwise"
    }
  },
  {
    "properties": {
      "steps": 11,
      "hue": {
        "start": 171,
        "end": 189,
        "curve": "easeInSine"
      },
      "saturation": {
        "start": 0.1,
        "end": 0.8,
        "rate": 1,
        "curve": "easeOutQuad"
      },
      "brightness": {
        "start": 1,
        "end": 0.18,
        "curve": "easeInQuad"
      }
    },
    "options": {
      "minorSteps": [],
      "name": "cyan",
      "provideInverted": true,
      "rotation": "clockwise"
    }
  },
  {
    "properties": {
      "steps": 11,
      "hue": {
        "start": 275,
        "end": 257,
        "curve": "easeInQuint"
      },
      "saturation": {
        "start": 0.1,
        "end": 0.84,
        "rate": 0.9,
        "curve": "easeOutQuad"
      },
      "brightness": {
        "start": 1,
        "end": 0.22,
        "curve": "easeInQuart"
      }
    },
    "options": {
      "minorSteps": [],
      "name": "purple",
      "provideInverted": true,
      "rotation": "counterclockwise"
    }
  },
  {
    "properties": {
      "steps": 11,
      "hue": {
        "start": 206,
        "end": 214,
        "curve": "easeInQuad"
      },
      "saturation": {
        "start": 0,
        "end": 0.07,
        "rate": 1,
        "curve": "easeInQuad"
      },
      "brightness": {
        "start": 1,
        "end": 0.07,
        "curve": "easeInQuad"
      }
    },
    "options": {
      "minorSteps": [],
      "name": "gray",
      "provideInverted": true,
      "rotation": "clockwise"
    }
  }
]
`

const COLORS_DATA = JSON.parse(COLORS_DATA_JSONSTR)

const PICK_MAPS = {
    paper: 'gray',
    primary: 'blue',
    info: 'cyan',
    success: 'green',
    warning: 'orange',
    danger: 'red',
}

const lights = {}
const darks = {}

// 解析颜色数据
COLORS_DATA.forEach(({ properties, options }) => {
    generate(properties, options).forEach(({ name, inverted, colors }) => {
        const theme = inverted ? darks : lights
        theme[name] = colors
    })
})

const color_name = (name, prefix) => (prefix ? `${prefix}-${name}` : name)

const varname = (name, step, tag = true) => `${tag ? '$' : ''}${name}-${step * 100}`
const varst = (name, { step, hex }) => `${varname(name, step)}: ${hex};`
const refvarst = (name, refName, { step }) => `${varname(name, step)}: ${varname(refName, step)};`
const mapitem = (name, refName, { step }) => `    ${varname(name, step, false)}: ${varname(refName, step)},`

const colorset_varst = (name, colors) => {
    return colors.map((color) => varst(name, color)).join('\n')
}

const colorset_mapitems = (name, refName, colors) => {
    return colors.map((color) => mapitem(name, refName, color)).join('\n')
}

const refs_varst = (name, refName, colors) => {
    return colors.map((color) => refvarst(name, refName, color)).join('\n')
}

const theme_code = (theme, prefix) => {
    return Object.entries(theme)
        .map(([name, colors]) => `// ${name}\n${colorset_varst(color_name(name, prefix), colors)}`)
        .join('\n\n')
}

const ref_code = (theme, prefix) => {
    return Object.entries(PICK_MAPS)
        .map(([name, refName]) => {
            const colors = theme[refName]
            return `// ref: ${name}\n${refs_varst(
                color_name(name, prefix),
                color_name(refName, prefix),
                colors,
            )}`
        })
        .join('\n\n')
}

const map_code = (theme, prefix) => {
    const themeItems = Object.entries(theme)
        .map(([name, colors]) => colorset_mapitems(name, color_name(name, prefix), colors))
        .join('\n\n')

    const refItems = Object.entries(PICK_MAPS)
        .map(([name, refName]) => {
            const colors = theme[refName]
            return colorset_mapitems(name, color_name(name, prefix), colors)
        })
        .join('\n\n')

    return `\$${color_name(
        'colors',
        prefix,
    )}: (\n${themeItems}\n\n${refItems}\n);\n\n\$${color_name(
        'pub-colors',
        prefix,
    )}: (\n${refItems}\n);`
}

// 生成 scss 代码
let code = ''

code += `// Light Colors\n`
code += `// ---------------------------\n\n`
code += theme_code(lights) + '\n\n'
code += ref_code(lights) + '\n\n'
code += map_code(lights) + '\n\n'

code += `// Dark Colors\n`
code += `// ---------------------------\n\n`
code += theme_code(darks, 'dark') + '\n\n'
code += ref_code(darks, 'dark') + '\n\n'
code += map_code(darks, 'dark')

console.log(code)
