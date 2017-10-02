/**
 * Created by Administrator on 2017/9/30 0030.
 */
import echarts from 'echarts'

export function ecInit(el) {
  if (!el) return null
  const chart = echarts.init(document.querySelector(el))
  chart.showLoading()
  return chart
}

const upColor = '#ec0000'
const upBorderColor = '#8A0000'
const downColor = '#00da3c'
const downBorderColor = '#008F28'

export function setCandlestickOption(chart, initialData, id) {

  const data0 = splitData(initialData)
  const option = {
    title: {
      text: id + '指数',
      left: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: data0.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: {onZero: false},
      splitLine: {show: false},
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    /*dataZoom: [
     {
     type: 'inside',
     start: 50,
     end: 100
     },
     {
     show: true,
     type: 'slider',
     y: '90%',
     start: 50,
     end: 100
     }
     ],*/
    series: [
      {
        name: '日K',
        type: 'candlestick',
        data: data0.values,
        itemStyle: {
          normal: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor
          }
        },
        markPoint: {
          label: {
            normal: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) : '';
              }
            }
          },
          data: [
            {
              name: 'XX标点',
              coord: ['2013/5/31', 2300],
              value: 2300,
              itemStyle: {
                normal: {color: 'rgb(41,60,85)'}
              }
            },
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest'
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest'
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close'
            }
          ],
          tooltip: {
            formatter: function (param) {
              return param.name + '<br>' + (param.data.coord || '');
            }
          }
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: {show: false},
                  emphasis: {show: false}
                }
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: {show: false},
                  emphasis: {show: false}
                }
              }
            ],
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close'
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close'
            }
          ]
        }
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },
      {
        name: 'MA30',
        type: 'line',
        data: calculateMA(30),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },

    ]
  }

  chart.setOption(option)
  chart.hideLoading()

  function splitData(rawData) {
    const categoryData = []
    const values = []

    for (let i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i][0].replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'))
      values.push([
        +rawData[i][1],
        +rawData[i][4],
        +rawData[i][3],
        +rawData[i][2]
      ])
    }

    return {
      categoryData,
      values
    }
  }

  function calculateMA(dayCount) {
    const result = []
    for (let i = 0, len = data0.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-')
        continue
      }
      let sum = 0
      for (let j = 0; j < dayCount; j++) {
        sum += data0.values[i - j][1]
      }
      result.push(sum / dayCount)
    }
    return result
  }
}

const DATA0 = {
  categoryData: [],
  values: []
}
export function setCandlestickBaseOption(chart, data, id, initialNum) {
  initialNum = initialNum || 30
  const baseOption = {
    title: {
      text: id + '指数',
      left: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: DATA0.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: {onZero: false},
      splitLine: {show: false},
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    /*dataZoom: [
     {
     type: 'inside',
     start: 50,
     end: 100
     },
     {
     show: true,
     type: 'slider',
     y: '90%',
     start: 50,
     end: 100
     }
     ],*/
    series: [
      {
        name: '日K',
        type: 'candlestick',
        data: DATA0.values,
        itemStyle: {
          normal: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor
          }
        },
        markPoint: {
          label: {
            normal: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) : '';
              }
            }
          },
          data: [
            {
              name: 'XX标点',
              coord: ['2013/5/31', 2300],
              value: 2300,
              itemStyle: {
                normal: {color: 'rgb(41,60,85)'}
              }
            },
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest'
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest'
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close'
            }
          ],
          tooltip: {
            formatter: function (param) {
              return param.name + '<br>' + (param.data.coord || '');
            }
          }
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: {show: false},
                  emphasis: {show: false}
                }
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: {show: false},
                  emphasis: {show: false}
                }
              }
            ],
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close'
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close'
            }
          ]
        }
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },
      {
        name: 'MA30',
        type: 'line',
        data: calculateMA(30),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },

    ]
  }

  chart.setOption(baseOption)

  const items = data.slice(0, initialNum)
  if (items.length) {
    items.forEach(item => DATA0AddFormat(item))
    addData(chart)
  }
  chart.hideLoading()

  function calculateMA(dayCount) {
    const result = []
    for (let i = 0, len = DATA0.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-')
        continue
      }
      let sum = 0
      for (let j = 0; j < dayCount; j++) {
        sum += DATA0.values[i - j][1]
      }
      result.push(sum / dayCount)
    }
    return result
  }
}

export function addSyncData(chart, initialData, delay, num, initialIndex) {
  const data = initialData.slice()
  let currentIndex = initialIndex || 0
  const timer = setInterval(() => {
    const items = data.slice(currentIndex, currentIndex + num)

    if (items.length) {
      items.forEach(item => {
        DATA0.categoryData = DATA0.categoryData.slice(num)
        DATA0.values = DATA0.values.slice(num)
        DATA0AddFormat(item)
      })
      addData(chart)

      currentIndex += num
    } else {
      clearInterval(timer)
    }
  }, delay)
}

function DATA0AddFormat(item) {
  DATA0.categoryData.push(item[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'))
  DATA0.values.push([
    +item[1],
    +item[4],
    +item[3],
    +item[2]
  ])
}

function addData(chart) {
  const option = {
    xAxis: {
      type: 'category',
      data: DATA0.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: {onZero: false},
      splitLine: {show: false},
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
    },
    series: [
      {
        name: '日K',
        type: 'candlestick',
        data: DATA0.values,
        itemStyle: {
          normal: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor
          }
        },
        markPoint: {
          label: {
            normal: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) : '';
              }
            }
          },
          data: [
            {
              name: 'XX标点',
              coord: ['2013/5/31', 2300],
              value: 2300,
              itemStyle: {
                normal: {color: 'rgb(41,60,85)'}
              }
            },
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest'
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest'
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close'
            }
          ],
          tooltip: {
            formatter: function (param) {
              return param.name + '<br>' + (param.data.coord || '');
            }
          }
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: {show: false},
                  emphasis: {show: false}
                }
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: {show: false},
                  emphasis: {show: false}
                }
              }
            ],
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close'
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close'
            }
          ]
        }
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      },
      {
        name: 'MA30',
        type: 'line',
        data: calculateMA(30),
        smooth: true,
        lineStyle: {
          normal: {opacity: 0.5}
        }
      }
    ]
  }
  chart.setOption(option)
  function calculateMA(dayCount) {
    const result = []
    for (let i = 0, len = DATA0.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-')
        continue
      }
      let sum = 0
      for (let j = 0; j < dayCount; j++) {
        sum += DATA0.values[i - j][1]
      }
      result.push(sum / dayCount)
    }
    return result
  }
}

export function addGraphOption(chart, graph) {

  const categories = [];
  for (let i = 0; i < 5; i++) {
    categories[i] = {
      name: '类目' + i
    };
  }
  graph.nodes.forEach(node => {
    node.value = ~~(Math.random() * 100)
    node.category = ~~(Math.random() * 5)
  })
  const option = {
    title: {
      text: 'adjnoun',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    legend: [{
      // selectedMode: 'single',
      data: categories.map(function (a) {
        return a.name
      })
    }],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'adjnoun',
        type: 'graph',
        layout: 'none',
        data: graph.nodes,
        links: graph.links,
        categories: categories,
        roam: true,
        label: {
          normal: {
            position: 'right',
            formatter: '{b}'
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0.3
          }
        }
      }
    ]
  };

  chart.setOption(option)
  chart.hideLoading()
}
