<template>
  <div class="title">
    <h1 class="date">10食品群チェック</h1>
    <div class="day">
      <p><input type="date" style="margin-top:20px;" v-model="selectDay" /></p>
    </div>
    <p class="score">
      スコア {{ nowScore }}/10
      <v-btn @click="dayScoreRegister" :disabled="disabled" color="primary"
        >登録
      </v-btn>
    </p>

    <ul class="food">
      <li v-for="food in foodCategory" :key="food.id" class="food-category">
        <div class="back">
          <FoodClass
            @my-click="pushFood(food.id)"
            :foodImage="food.image"
            :isActive="food.isActive"
            :class="{ 'off-food': !food.isActive, 'on-food': food.isActive }"
          />
        </div>

        <P class="food-name">{{ food.name }}</P>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FoodClass from '../components/FoodClass.vue';
import axios from 'axios';
import { ItemCategory } from '../types/index';

@Component({
  components: {
    FoodClass,
  },
})
export default class FoodConfirm extends Vue {
  foodCategory: ItemCategory[] = this.$store.getters.foodCategory;
  scoreArray: ItemCategory[] = this.$store.getters.scoreArray;
  selectDay = '';
  pushFood(foodId: number): void {
    this.foodCategory[foodId - 1].isActive = !this.foodCategory[foodId - 1]
      .isActive;
    if (this.foodCategory[foodId - 1].isActive) {
      this.scoreArray.push(this.foodCategory[foodId - 1]);
    } else {
      const cancelScore = this.scoreArray.filter(
        (item: ItemCategory) => item.isActive === true
      );
      this.scoreArray = cancelScore;
    }
  }
  get nowScore(): number {
    return this.scoreArray.length;
  }
  get allDayScore(): ItemCategory {
    return this.$store.getters.user_score;
  }
  get disabled(): boolean {
    const disabled = this.selectDay === '' ? true : false;
    return disabled;
  }
  get getData() {
    return this.$store.getters.user_score;
  }
  get nowDay(): string | number {
    let today = new Date();
    let year: number = today.getFullYear();
    let month: number = today.getMonth() + 1;
    let day: number = today.getDate();

    return String(year + '-' + month + '-' + day);
  }
  dayScoreRegister(): void {
    if (confirm('登録しますか？')) {
      // 日付が登録されている場合 => 更新処理のHTTPリクエスト、日付が登録されていない場合 => 新規登録のHTTPリクエスト
      let x;
      for (let i = 0; i < this.getData.length; i++) {
        if (this.getData[i].date === this.selectDay) {
          x = 0;
        }
      }
      if (x === 0) {
        axios
          .post('http://localhost:3001/userScore/update-score', {
            score: this.scoreArray,
            date: this.selectDay,
          })
          .then((res) => {
            this.$store.commit('update_score', res);
          });
      } else {
        axios
          .post('http://localhost:3001/userScore/create-score', {
            date: this.selectDay,
            score: this.scoreArray,
          })
          .then((res) => {
            this.$store.commit('register_score', res);
          });
      }
    }
  }
  created(): void {
    axios.post('http://localhost:3001/userScore/fetch-score').then((res) => {
      if (res.data.user_score.length !== 0) {
        this.$store.commit('fetch_score', res.data.user_score);
      }
    });
  }
}
</script>

<style scoped>
.food {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
}
.food-category {
  list-style: none;
  margin: 5px 30px 5px 30px;
  text-align: center;
}
.date {
  text-align: center;
  margin-top: 5px;
}
.score {
  text-align: center;
  font-size: 24px;
}
.back {
  background: #000;
}

.off-food {
  display: block;
  opacity: 0.6;
}
.food-name {
  font-size: 20px;
}
.title {
  margin-top: 30px;
}
.day {
  margin-top: 10px;
  text-align: center;
}
</style>
