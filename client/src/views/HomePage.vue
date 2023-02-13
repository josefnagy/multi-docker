<template>
    <div>
        <form @submit.prevent="onSubmit">
            <label for="index">Enter your index:</label>
            <input type="text" id="index" v-model="index" />
            <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {{ seenIndexesText }}
        <h3>Calculated Values:</h3>
        <div v-for="(value, key, index) in values" :key="index">
            For index {{ key }} I calculated {{ value }}
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";

const seenIndexes = ref([]);
const values = ref({});
const index = ref("");

onMounted(() => {
    fetchValues();
    fetchIndexes();
});

const onSubmit = async (e) => {
    console.log(index.value);
    await axios.post("/api/values", {
        index: index.value,
    });
    index.value = "";
    fetchValues();
    fetchIndexes();
};
const fetchValues = async () => {
    const vals = await axios.get("/api/values/current");
    values.value = vals.data;
};
const fetchIndexes = async () => {
    const si = await axios.get("/api/values/all");
    seenIndexes.value = si.data;
};
const seenIndexesText = computed(() => {
    return seenIndexes.value.map(({ number }) => number).join(", ");
});
</script>

<style scoped></style>
