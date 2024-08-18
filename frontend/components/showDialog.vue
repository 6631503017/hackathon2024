<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  emits: ["update:model-value", "close"],
  computed: {
    internalDialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:model-value", value);
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<template>
  <v-dialog v-model:model-value="internalDialog" max-width="500px">
    <v-card rounded="lg">
      <v-card-title>{{ item?.title }}</v-card-title>
      <v-card-text>
        <v-img
          src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg"
          cover
          class="rounded-lg mb-3"
          :aspect-ratio="1 / 1"
        ></v-img>
        {{ item?.price }} ฿
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" variant="text" @click="close()">
          Close
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
