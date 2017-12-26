Vue.use(VueFusionCharts);

const myDataSource = {
  "chart": {
        "caption": "Compétences",
        "subcaption": "",
        "xAxisMinValue": "0",
        "xAxisMaxValue": "100",
        "yAxisMinValue": "0",
        "yAxisMaxValue": "100",
        "showYAxisValues": "0",
        "showToolTip": "0",
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "Acquis ->",
        "yAxisName": "Intérêt ->",
        "numDivlines": "0",
        "showValues": "1",
        "drawQuadrant": "1",
        "quadrantLabelTL": "ENTHOUSIASTE",
        "quadrantLabelTR": "ÉVANGÉLISTE",
        "quadrantLabelBL": "CURIEUX",
        "quadrantLabelBR": "EXPERIMENTÉ"
    },
    "categories": [{
        "category": [{
            "x": "0"
        }, {
            "x": "100"
        }]
    }],
    "dataset":
    [{
        "color": "#00aee4",
        "data": [{
            "x": "90",
            "y": "90",
            "z": "10",
            "name": "Git"
        },{
            "x": "20",
            "y": "30",
            "z": "10",
            "name": "SVN"
        }]
    },
    {
        "color": "#aabbcc",
        "data": [{
            "x": "50",
            "y": "50",
            "z": "10",
            "name": "Java"
        }, {
            "x": "40",
            "y": "10",
            "z": "10",
            "name": "Python"
        }]
    },
    {
        "color": "#dd1111",
        "data": [{
            "x": "80",
            "y": "50",
            "z": "10",
            "name": "Scrum"
        }]
    }]
};

const chart = new Vue({
  el: '#app',
  data: {
      type: 'bubble',
      width: '1000', //to specify the width of the chart
      height: '600', //to specify the height of the chart
      dataFormat: 'json',
      dataSource: myDataSource
  },
  methods: {
      switchSkill(n) {
          //const prevDs = Object.assign({}, this.dataSource);
          //prevDs.chart.captionAlignment = 'left';
          //this.dataSource = prevDs;
      }
  }
});
