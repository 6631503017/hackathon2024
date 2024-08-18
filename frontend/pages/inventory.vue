<template>
    <v-container>
        <v-card class="border" varaint="flat" rounded="lg" elevation="0">
            <v-card-title class="d-flex">
                Manage data
                <v-spacer />
                <v-btn prepend-icon="mdi-pencil" class="mb-2" color="primary" elevation="0" dark @click="openDialog()">
                    New Item
                </v-btn>
            </v-card-title>
            <v-divider />
            <v-data-table :headers="headers" :items="items" :loading="!loading">
                <template v-slot:item.number="{ index }">
                    {{ index + 1 }}
                </template>
                <template v-slot:item.image="{ item }">
                    <v-img :src="item.image" cover height="125px" width="125px" />
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon class="me-2" color="warning" size="small" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon size="small" color="error" @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
        <delete-dialog v-model="dialogDelete" :editedItem="editedItem" @close="closeDelete"
            @delete="deleteItemConfirm" />
        <item-dialog v-model="dialog" :editedItem="editedItem" :formTitle="formTitle" @close="close" @save="save" />
    </v-container>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        items: [],
        headers: [
            { title: "Title", key: "title" },
            { title: "Price", key: "price" },
            { title: "Actions", key: "actions", sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            title: "",
            price: "",
        },
        defaultItem: {
            title: "",
            price: "",
        },
        loading: true,
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
        },
    },

    created() {
        this.fetchItems();
    },

    methods: {
        async fetchItems() {
            this.loading = true; // Set loading to true before fetching
            try {
                const response = await fetch("http://localhost:8080/api/books");
                console.log(response);

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                this.items = data; // Assign fetched data to items
            } catch (error) {
                console.error("There has been a problem with your fetch operation:", error);
            } finally {
            }
        },

        openDialog() {
            this.dialog = true;
        },

        editItem(item) {
            this.editedIndex = this.items.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.items.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },



        async deleteItemConfirm() {
            const itemId = this.editedItem._id;
            try {
                await this.deleteBook(itemId);
                await this.fetchItems();
            } catch (error) {
                console.error("Error deleting book:", error);
            }
            this.closeDelete();
        },

        async deleteBook(bookId) {
            try {
                const response = await fetch(`http://localhost:8080/api/books/${bookId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete book: ${response.statusText}`);
                }
                return await response.json();
            } catch (error) {
                console.error("Error deleting book:", error);
                throw error;
            }
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
        },

        async save() {
            const itemData = { ...this.editedItem };
            try {
                if (this.editedIndex === -1) {
                    // Create new book
                    await this.createBook(itemData);
                } else {
                    // Update existing book
                    await this.updateBook(itemData);

                }
                await this.fetchItems();
            } catch (error) {
                console.error("Error saving item:", error);
            }
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })

            this.dialog = false;
        },

        // Function to create a new book
        async createBook(bookData) {
            try {
                const response = await fetch(`http://localhost:8080/api/books`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookData),
                });
                if (!response.ok) {
                    throw new Error(`Failed to create book: ${response.statusText}`);
                }
                return await response.json();
            } catch (error) {
                console.error("Error creating book:", error);
                throw error;
            }
        },

        // Function to update an existing book
        async updateBook(bookData) {
            try {
                const response = await fetch(`http://localhost:8080/api/books/${bookData._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookData),
                });
                if (!response.ok) {
                    throw new Error(`Failed to update book: ${response.statusText}`);
                }
                return await response.json();
            } catch (error) {
                console.error("Error updating book:", error);
                throw error;
            }
        },
    },
};
</script>