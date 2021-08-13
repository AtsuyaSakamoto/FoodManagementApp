<template>
  <div class="chart-container">
    <h1>今週のグラフ</h1>
    <ChartComponent
      :chartData="chartData"
      :chartOptions="chartOptions"
      :chartStyles="chartStyles"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChartComponent from '../components/ChartComponent.vue';
import axios from 'axios';

@Component({ components: { ChartComponent } })
export default class HealthGraph extends Vue {
  todayData: string[] = [];
  mapTodayData: number[] = [];
  weekData: string[] = [];

  allData = [
    '肉',
    '卵',
    '牛乳',
    '油',
    '魚',
    '大豆',
    '緑黄色野菜',
    '芋',
    '果物',
    '海藻',
  ];

  mapWeekData = this.allData.map((data) => {
    const result = this.weekData.filter((item) => data === item);
    return result.length;
  });
  get allDayScore() {
    return this.$store.getters.user_score;
  }

  beforeCreate(): void {
    axios.post('http://localhost:3001/userScore/fetch-score').then((res) => {
      this.$store.commit('fetch_score', res.data.user_score);
      this.todayData = this.$store.getters.todayData;
      this.allData.map((data) => {
        this.mapTodayData.push(this.todayData.includes(data) === true ? 1 : 0);
      });
      this.$store.commit('createTodayGraph', this.mapTodayData);
      this.chartData.datasets[0].data = this.$store.getters.todayGraphData;

      this.weekData = this.$store.getters.weekData;
      this.mapWeekData = this.allData.map((data) => {
        const result = this.weekData.filter((item) => data === item);
        return result.length;
      });
      this.$store.commit('createWeekGraph', this.mapWeekData);
      this.chartData.datasets[1].data = this.$store.getters.weekGraphData;
    });
  }

  // チャートのオプション
  chartOptions = {
    maintainAspectRatio: false,
    tooltips: {
      mode: 'index',
    },
    scales: {
      yAxes: [
        {
          id: '1',
          position: 'left',
        },
        {
          id: '2',
          position: 'right',
        },
      ],
    },
  };
  // チャートのスタイル: <canvas>のstyle属性として設定
  chartStyles = {
    height: '100%',
    width: '100%',
  };
  // チャートのデータ
  chartData = {
    labels: [
      '肉',
      '卵',
      '牛乳',
      '油',
      '魚',
      '大豆',
      '緑黄色野菜',
      '芋',
      '果物',
      '海藻',
    ],
    datasets: [
      {
        type: 'bar',
        label: 'Today Score',
        data: this.$store.getters.todayGraphData,
        fill: false,
        lineTension: 0,
        borderColor: '#00008b',
        yAxisID: '1', // Y軸のIDを指定
      },
      {
        type: 'line',
        label: 'Week Score',
        data: this.$store.getters.weekGraphData,
        fill: false,
        lineTension: 0,
        borderColor: '#ff0000',
        yAxisID: '2', // Y軸のIDを指定
      },
    ],
  };
}
</script>

<style scoped>
.chart-container {
  padding: 50px 200px 50px 200px;
  text-align: center;
}
</style>
