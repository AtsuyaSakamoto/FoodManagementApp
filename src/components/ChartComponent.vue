<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import Chart from 'chart.js';
import { Line, Bar, mixins } from 'vue-chartjs';

@Component({})
export default class ChartComponent extends Mixins(
  Line,
  Bar,
  mixins.reactiveProp
) {
  @Prop() ChartData!: Chart.ChartData;
  @Prop() chartOptions!: Chart.ChartOptions;

  chart = this.chartData;

  @Watch('chartData')
  onChartDataChanged(): void {
    this.load();
  }

  todayData: string[] = [];
  weekData: string[] = [];
  mapTodayData: number[] = [];
  mapWeekData: number[] = [];

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

  mounted(): void {
    setTimeout(this.load, 500);
  }

  load(): void {
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>
