# React-app

    npm install
    npm run dev

#### /dist1

后台使用node处理数据, 前端负责渲染 ./file/sp500hst.txt 的数据在[这里](https://github.com/100pah/ife/blob/master/2017Q1/echarts_data_preprocess/sp500hst.txt)下载

#### /dist2

异步渲染数据, 首次进入，显示 30 天时间窗口的数据, 每隔 200ms 将时间窗口往后推一天，动态更新图表
