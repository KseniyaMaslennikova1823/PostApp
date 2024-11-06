<template>
    <select v-model="modelValue" @change="sortOptions">
        <option disabled value="">Выберите из списка</option>
        <option v-for="filter in filters" :key="filter.id" :value="filter.val" >
            {{ filter.name }}
        </option>
    </select>
</template>

<script setup>
import { ref, defineEmits, inject } from 'vue'

let filters = inject('sortedValue');
const emit = defineEmits(['sortValue']);
const sortOptions = (event) => {    
    emit('sortValue', event.target.value);
}
</script>

<style scoped lang="scss">
select {
    height: 50px;
    width: 250px;
}
</style>