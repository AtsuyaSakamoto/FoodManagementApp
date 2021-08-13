<template>
  <div>
    <div class="foodForm">
      <h1>備忘録</h1>
      <input type="date" style="margin-top:20px;" v-model="selectDay" />
      <v-row style="margin-top:10px;" justify="center" align-content="center">
        <v-col cols="6" md="3">
          <v-textarea
            solo
            name="input"
            label="何を食べましたか？"
            v-model="outputText"
          ></v-textarea>
        </v-col>
      </v-row>
      <!-- eslint-disable-next-line -->
      <v-btn
        color="primary"
        @click="registerText"
        :disabled="disabled"
        class="registerButton"
        >登録</v-btn
      >
    </div>
    <div class="calendar">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span>My Calendar</span>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-row>
        <v-col>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              :now="today"
              :value="today"
              :events="events"
              color="primary"
              type="month"
              disable-page-swipe
              v-model="value"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </div></div
></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { EventTypes, CalendarData } from '../types/index';

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
@Component
export default class HealthCalendar extends Vue {
  nowMonth = year + '年' + month + '月';
  today: string = year + '-' + month + '-' + day;
  selectDay = '';
  outputText = '';
  value = '';

  get disabled(): boolean {
    const disabled =
      this.outputText === '' || this.selectDay === '' ? true : false;
    return disabled;
  }

  registerText(): void {
    if (confirm('登録しますか？')) {
      this.editor.name = this.outputText;
      this.editor.start = this.selectDay;
      this.events.push(this.editor);
      axios
        .post('http://localhost:3001/userCalendar/create-calendar', {
          date: this.editor.start,
          text: this.editor.name,
        })
        .then((res) => {
          this.$store.commit('create_calendar', res);
        });
      this.outputText = '';
      this.selectDay = '';

      this.editor = {
        name: '',
        start: '',
      };
    }
  }
  get allCalendar() {
    return this.$store.getters.user_calendar;
  }
  created(): void {
    axios
      .post('http://localhost:3001/userCalendar/fetch-calendar')
      .then((res) => {
        this.$store.commit('fetch_calendar', res.data.user_calendar);
        const allCalendar = this.$store.getters.user_calendar;
        allCalendar.map((calendar: CalendarData) => {
          const data = { name: calendar.user_text, start: calendar.date };
          this.events.push(data);
        });
      });
  }

  editor: EventTypes = {
    name: '',
    start: '',
  };
  events = [
    {
      name: 'パン',
      start: '2000-08-01',
    },
  ];
}
</script>

<style scoped>
.calendar {
  padding: 50px 200px 0px 200px;
  text-align: center;
}
.foodForm {
  text-align: center;
  margin-top: 20px;
}
h2 {
  text-align: center;
}
.registerButton {
  color: white;
}
</style>
