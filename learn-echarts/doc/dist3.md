# [ECharts No.6 - 绘制人物关系图](http://ife.baidu.com/course/detail/id/49)

gml 格式分析

    adjnoun.gml 数据片段:

    Creator "Mark Newman on Fri Jul 21 13:00:02 2006"
    graph
    [
      node
      [
        id 0
        label "agreeable"
        value 0
      ]
      node
      [
        id 1
        label "man"
        value 1
      ]
      node
      [
        id 2
        label "old"
        value 0
      ]
      ...
      edge
        [
          source 1
          target 0
        ]
        edge
        [
          source 2
          target 0
        ]
        edge
        [
          source 3
          target 0
        ]
        ...
    ]

通过查找资料猜测gml是描述无向图的文件格式每个node表示
