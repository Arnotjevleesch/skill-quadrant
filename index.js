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
        "quadrantLabelTR": "FERVENT",
        "quadrantLabelBL": "CURIEUX",
        "quadrantLabelBR": "EXPERIMENTÉ",
        "bubbleScale": "0.5"
    },
    "categories": [{
        "category": [{
            "x": "0"
        }, {
            "x": "100"
        }]
    }]
};

async function parseJsonFromUrl(url) {
  return await (await fetch(url)).json();
}

async function buildSkillData() {
  folderUrl = "https://api.github.com/repos/Arnotjevleesch/skill-quadrant/contents/skill-data";
  filesData = await parseJsonFromUrl(folderUrl);

  obj = await Promise.all(filesData.map(file => file.download_url).map(url => parseJsonFromUrl(url)));
  return obj;
}


async function buildDataset(ids) {

  return await Promise.all(ids.map(function(id) {
      return parseJsonFromUrl("https://arnotjevleesch.github.io/skill-quadrant/skill-data/" + id + ".json")
      .then(function(result) {
          return result;
      });
  })).then(function(results) {
      // results is an array of skill json object
      return results;
  });
}

const chart = new Vue({
  el: '#app',
  data: {
    type: 'bubble',
    width: '1000', //to specify the width of the chart
    height: '600', //to specify the height of the chart
    dataFormat: 'json',
    dataSource: myDataSource,
    skilldata: []
  },
  async mounted () {
    this.skilldata = await buildSkillData();
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.updateSkills();
    });
  },
  methods: {
    async updateSkills() {
      ids = this.$refs.dynboxesref
        .filter(ref => ref.checked)
        .map(ref => ref.id);

      // check if one checkbox is on at least
      if (event && ids.length == 0) {
        alert("Choisissez au moins une compétence.");
        event.target.checked = true;
        return;
      }

      dataset = await buildDataset(ids);

      const prevDs = Object.assign({}, this.dataSource);
      prevDs.dataset = dataset;
      //prevDs.dataset = Object.freeze(this.skilldata);
      this.dataSource = prevDs;
    }
  }
});
