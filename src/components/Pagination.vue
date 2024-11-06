<template>
    <div class="pagination" >
        <div 
            class="pagination__page" 
            :class="{
                'current-page': page === pageNum
            }"
            v-for="pageNum in totalPage" 
            :key="pageNum"
            @click="changePage(pageNum)"
        > 
            {{ pageNum }} 
        </div>
    </div>
</template>

<script setup>
import { ref, inject, defineEmits } from 'vue'

const totalPage = inject('allPage');
const page = ref(1);
let skipPost = 0;
const emit = defineEmits(['pageSelect']);
const changePage = (pageNum) => {    
    page.value = pageNum;
    skipPost = pageNum * 10 - 10;
    emit('pageSelect', skipPost);
}
</script>

<style scoped lang="scss">
.pagination {
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    &__page {
        border: 1px solid #38220f;
        width: 40px;
        height: 40px;
        margin-right: 15px;
        margin-bottom: 15px;
        text-align: center;
        cursor: pointer;
    }
}
.current-page {
    border: 2px solid #38220f;
    background-color: #967259;
}
</style>