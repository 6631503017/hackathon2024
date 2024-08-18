<script>
export default {
    data: () => ({
        search: "",
        dialog: false,
        selectedItem: null,
        items: [],
        loading: true,
    }),
    computed: {
        filteredItems() {
            return this.items.filter((item) => {
                const searchText = this.search.toLowerCase();
                return (
                    item.title.toLowerCase().includes(searchText) ||
                    item.subtitle.toLowerCase().includes(searchText)
                );
            });
        },
    },
    created() {
        this.fetchItems();
    },

    methods: {
        openDialog(item) {
            this.selectedItem = item;
            this.dialog = true;
        },
        close() {
            this.dialog = false;
        },
        async fetchItems() {
            this.loading = true;
            try {
                const response = await fetch("http://localhost:8080/api/books");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                this.items = data;
            } catch (error) {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
<template>
    <div>

        <v-container>

            <v-card rounded="lg" variant="flat" elevation="0">
                <v-img :aspect-ratio="21 / 9" cover src="../public/banner.png" />
            </v-card>


            <v-row dense class="mb-1 mt-3">
                <v-col cols="12">
                    <h2 class="text-center">Recommended Books</h2>
                </v-col>

            </v-row>
            <v-row dense>
                <v-col cols="6" md="2" sm="3" v-for="item in items"
                    :key="item.title">
                    <item-card :item="item" @click="openDialog(item)" />
                </v-col>
            </v-row>
            <v-row dense class="mb-1 mt-3">
                <v-col cols="12" md="5">
                    <h2>All Books</h2>
                </v-col>
                <v-col cols="12" md="7">
                    <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="search"
                        variant="outlined" rounded hide-details single-line />
                </v-col>
            </v-row>
            <v-skeleton-loader v-if="loading" :loading="loading" class="mt-4">
                <template #default>
                    <v-row dense>
                        <v-col cols="12" md="" sm="4" v-for="n in 6" :key="n">
                            <v-card>
                                <v-skeleton-loader type="card" />
                            </v-card>
                        </v-col>
                    </v-row>
                </template>
            </v-skeleton-loader>
            <v-row dense v-else>
                <v-col v-if="filteredItems.length" cols="6" md="2" sm="3" v-for="item in filteredItems"
                    :key="item.title">
                    <item-card :item="item" @click="openDialog(item)" />
                </v-col>
                <v-col v-else cols="12" class="text-center">
                    <span class="mt-2">no data</span>
                </v-col>
            </v-row>
        </v-container>
    </div>

    <show-dialog v-model="dialog" :item="selectedItem" @close="close" />
</template>
