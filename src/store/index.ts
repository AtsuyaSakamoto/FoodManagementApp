import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface ItemCategory {
  id: number;
  name: string;
  image: string;
  isActive: boolean;
}

interface RegisterData {
  _id: string;
  date: string;
  user_score: ItemCategory;
}

export default new Vuex.Store({
  state: {
    foodCategory: [
      { id: 1, name: '肉', image: '1.png', isActive: false },
      { id: 2, name: '卵', image: '2.png', isActive: false },
      { id: 3, name: '牛乳', image: '3.png', isActive: false },
      { id: 4, name: '油', image: '4.png', isActive: false },
      { id: 5, name: '魚', image: '5.jpg', isActive: false },
      { id: 6, name: '大豆', image: '6.jpg', isActive: false },
      { id: 7, name: '緑黄色野菜', image: '7.jpg', isActive: false },
      { id: 8, name: '芋', image: '8.jpg', isActive: false },
      { id: 9, name: '果物', image: '9.jpg', isActive: false },
      { id: 10, name: '海藻', image: '10.jpg', isActive: false },
    ],
    foodID: [],
    scoreArray: [],
    user_score: [
      {
        date: '',
        user_score: [{ id: '', name: '', image: '', isActive: true }],
      },
    ],
    user_calendar: [{ date: '', user_text: '' }],
    todayData: [''],
    weekData: [''],
    todayGraphData: [],
    weekGraphData: [],
  },
  mutations: {
    register_score(state, updateUserScore) {
      state.user_score.push(updateUserScore.data);
    },
    update_score(state, updateUserScore) {
      const updateScore = updateUserScore.data.resObj.userScoreToUpdate;
      const updateDay = updateUserScore.data.resObj.selectDay;
      state.user_score.forEach((score) => {
        if (score.date === updateDay) {
          score.user_score = updateScore;
        }
      });
    },
    fetch_score(state, allScore) {
      const todayArray: string[] = [];

      allScore.sort(function(a: RegisterData, b: RegisterData) {
        if (a.date < b.date) {
          return -1;
        } else {
          return 1;
        }
      });

      const dataLength = allScore.length;
      allScore[dataLength - 1].user_score.forEach((data: ItemCategory) => {
        todayArray.push(data.name);
      });
      const weekArray: string[] = [];
      if (dataLength >= 7) {
        for (let i = 1; i < 8; i++) {
          allScore[dataLength - i].user_score.forEach((data: ItemCategory) => {
            weekArray.push(data.name);
          });
        }
      }
      state.user_score = allScore;
      state.todayData = todayArray;
      state.weekData = weekArray;
    },
    createTodayGraph(state, todayGraphData) {
      state.todayGraphData = todayGraphData;
    },
    createWeekGraph(state, weekGraphData) {
      state.weekGraphData = weekGraphData;
    },
    fetch_calendar(state, res) {
      state.user_calendar = res;
    },
    create_calendar(state, calendarData) {
      state.user_calendar.push(calendarData.data);
    },
  },
  actions: {},
  getters: {
    foodCategory: (state) => state.foodCategory,
    scoreArray: (state) => state.scoreArray,
    user_score: (state) => state.user_score,
    user_calendar: (state) => state.user_calendar,
    todayData: (state) => state.todayData,
    weekData: (state) => state.weekData,
    todayGraphData: (state) => state.todayGraphData,
    weekGraphData: (state) => state.weekGraphData,
  },
});
