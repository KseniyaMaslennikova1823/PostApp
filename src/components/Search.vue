<template>
    <div class="search">
        <input placeholder="Поиск..." v-model="searchQuery" @input="queryOptions"/>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['searchPosts']);
const queryOptions = (event) => {    
    emit('searchPosts', event.target.value);
}
</script>

<style scoped lang="scss">
input {
    height: 50px;
    width: 350px;
    font-size: 25px;
}
</style>