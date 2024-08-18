<template>
    <v-dialog v-model:model-value="internalDialog" max-width="500px">
      <v-card class="border" varaint="flat" rounded="xl">
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.title"
                variant="outlined"
                density="compact"
                rounded
                hide-details
                single-line
                label="Title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.price"
                label="Price"
                variant="outlined"
                density="compact"
                rounded
                hide-details
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mt-n2" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: {
        type: Boolean,
        required: true,
      },
      editedItem: {
        type: Object,
        required: true,
      },
      formTitle: {
        type: String,
        required: true,
      },
    },
    emits: ["update:model-value", "close", "save"],
    data: () => ({
      selectedItem: null,
    }),
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
      save() {
        this.$emit("save");
      },

    },
  };
  </script>
  