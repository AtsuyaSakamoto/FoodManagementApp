<template>
  <div>
    <v-sheet color="white" elevation="1" height="250" width="250">
      <v-img class="style-image" :src="foodImage" @click="count" />
    </v-sheet>
    <p>{{ foodName }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FoodClass extends Vue {
  @Prop({ default: '' })
  foodImage?: string;

  @Prop({ default: '' })
  foodName?: string;

  count(): void {
    this.$emit('my-click');
  }
}
</script>

<style scoped>
.style-image {
  height: 230px;
  width: 250px;
}
</style>
