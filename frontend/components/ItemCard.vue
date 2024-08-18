<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
<template>
  <div>
    <v-card
      class="mb-2 border"
      density="compact"
      prepend-avatar="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg"
      :title="item.title"
      :subtitle="item.subtitle"
      variant="flat"
      rounded="lg"
    >
      <v-img :aspect-ratio="1/1" src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg" cover></v-img>
      <v-card-text class="truncate-text">
        {{ item.price }} ฿
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="text">View More</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
