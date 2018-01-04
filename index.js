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
    }]
};

function parseUrlResponse(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(xhr.status)
        }
      }
    }
    xhr.ontimeout = function () {
      reject('timeout')
    }
    xhr.open('get', url, true)
    xhr.send()
  })
}

async function parseUrlResponseUsingFetch(url) {

  let objRes;

  await fetch(url)
  .then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else {
        console.log("Oops, nous n'avons pas du JSON!");
      }
    }) // Transform the data into json
  .then(function(data) {
      objRes = data;
  })

  return objRes;
}

async function buildDataset(ids) {

  let dataset;

  await Promise.all(ids.map(function(id) {
      return parseUrlResponseUsingFetch("https://arnotjevleesch.github.io/skill-quadrant/skill-data/" + id + ".json")
      //return parseUrlResponseUsingFetch("./skill-data/" + id + ".json")
      .then(function(result) {
          return result
      });
  })).then(function(results) {
      // results is an array of skill json object
      dataset = results;
  })
  return dataset;
}

const chart = new Vue({
  el: '#app',
  data: {
    type: 'bubble',
    width: '1000', //to specify the width of the chart
    height: '600', //to specify the height of the chart
    dataFormat: 'json',
    dataSource: myDataSource
  },
  mounted: function () {
    this.updateSkills();
  },
  methods: {
    async updateSkills() {
      ids = Object.values(this.$refs)
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
      this.dataSource = prevDs;
    }
  }
});

// https://developer.github.com/v3/repos/contents/
async function getListSkillFileNames() {
  return await parseUrlResponseUsingFetch("https://api.github.com/repos/Arnotjevleesch/skill-quadrant/contents/skill-data");
}

const boxes = new Vue({
  el: '#boxes',
  mounted: function () {
    this.loadSkills();
  },
  methods: {
    async loadSkills() {
      console.log(getListSkillFileNames());
    }
  }

});


