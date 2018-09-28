Vue.use(VueFusionCharts);

var myDataSource = {
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
  
  // fetch don't work with file:// so url from github to work properly in local
  folderUrl = "https://api.github.com/repos/Arnotjevleesch/skill-quadrant/contents/skill-data?client_id=" + github_client_id + "&client_secret=" + github_client_secret;
  filesData = await parseJsonFromUrl(folderUrl);

  obj = await Promise.all(filesData.map(file => file.download_url).map(url => parseJsonFromUrl(url)));
  return obj;
}

async function buildDatasource(){
  skilldata = await buildSkillData();
  const prevDs = Object.assign({}, myDataSource);
  prevDs.dataset = skilldata;
  return prevDs;
}

var ds;

const chart = new Vue({
  el: '#app',
  data: {
    type: 'bubble',
    width: '1000', //to specify the width of the chart
    height: '600', //to specify the height of the chart
    dataFormat: 'json',
    dataSource: Object.assign({}, myDataSource),
    boxesData:{}
  },
  //async mounted () {
  //  ds = await buildDatasource()
  //  this.dataSource = Object.assign({}, ds);
  //  this.boxesData = this.dataSource.dataset;
  //},
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

      this.dataSource.dataset = Object.assign({}, ds).dataset.filter(item => ids.includes(item.id));
    }
  }
});
