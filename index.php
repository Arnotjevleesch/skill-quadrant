<html>
  <head>
    <meta charset="UTF-8">

    <link rel="stylesheet" href="index.css">

    <script type="text/javascript" src="https://unpkg.com/vue@2.3.3"></script>
    <script type="text/javascript" src="https://unpkg.com/fusioncharts/fusioncharts.js"></script>
    <script type="text/javascript" src="https://unpkg.com/fusioncharts/fusioncharts.charts.js"></script>
    <script type="text/javascript" src="https://unpkg.com/fusioncharts@3.12.1/themes/fusioncharts.theme.fint.js"></script>
    <script type="text/javascript" src="https://unpkg.com/vue-fusioncharts/dist/vue-fusioncharts.min.js"></script>

    <?php
      $github_client_id = getenv('GITHUB_CLIENT_ID');
      $github_client_secret = getenv('GITHUB_CLIENT_SECRET');
    ?>

  </head>
  <body>

    <div id="app">

      <div>
      <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :dataFormat="data-format"
        :dataSource="data-source"
      ></fusioncharts>
      </div>

      <div id="dynboxes">
        <p v-for="skill in boxesData">
          <input type="checkbox" :id="skill.id" ref="dynboxesref" checked @click="updateSkills"/>
          <label :for="skill.id" class="legend" v-bind:style="{ background: skill.color}">{{ skill.text }}</label>
        </p>
      </div>

    </div>

    <script type="text/javascript">
      var github_client_id = "<?php echo $github_client_id; ?>";
      var github_client_secret = "<?php echo $github_client_secret; ?>";
    </script>
    
    <script type="text/javascript" src="index.js"></script>
  </body>
</html>
