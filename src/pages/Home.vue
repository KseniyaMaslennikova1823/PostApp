<template>
    <div class="app__section1 searchQuery">
        <Search v-model="searchQuerys" @searchPosts="searchedPosts"/>
        <Sort v-model="selectedSort" @sortValue="sortedPost"/>
    </div>
    <div class="app__section1">
        <RouterLink to="/post"><button>Написать пост</button></RouterLink>
    </div>
    <div class="app__posts">
        <Posts @delPost="delToPost" @updatePost="postID" />
    </div>
    <Pagination @pageSelect="selectPage" />
</template>

<script setup>
import { ref, onMounted, provide, watch, computed } from 'vue'
import axios from 'axios'
import Search from '../components/Search.vue'
import Sort from '../components/Sort.vue'
import Posts from '../components/Posts.vue'
import Pagination from '../components/Pagination.vue'
import { sortPost, searchPost, getsPosts } from '../services/posts.js'

function postID(idPost) {
  console.log("home post id ", idPost)
  provide('postID', idPost);
}
// Получение постов
const posts = ref([]);
const totalPage = ref(0);
const limit = 10;
const selectPage = async (numPage) => {
    try {
        if (numPage === undefined || numPage === 1) {
            numPage = 0;
        } 
        const data = await getsPosts(numPage);
        posts.value = data.posts;
        totalPage.value = Math.ceil(data.total / limit);      
    } catch (e) {
        console.log(e)
    }
}
onMounted(selectPage);
provide('allPosts', posts);
provide('allPage', totalPage);
// Удаление 
function delToPost(id) {
    posts.value = posts.value.filter(p => p.id !== id)
}
// Сортировка постов
const selectedSort = ref('');
const filters = [
    {id: 1, name: 'По названию', val: 'title', orderSort: 'asc'},
    {id: 2, name: 'По содержимому', val: 'body', orderSort: 'asc'},
    {id: 3, name: 'По просмотрам', val: 'views', orderSort: 'desc'},
];
provide('sortedValue', filters);
watch(selectedSort, async (newValue) => {
    try {
        let fil = filters.find(filters => filters.val === newValue);
        const data = await sortPost(newValue, fil.orderSort);
        posts.value = data.posts;
    } catch (e) {
        console.log(e)
    }
});
// Поиск постов
const searchQuerys = ref('');
function searchedPosts(val) {
    searchQuerys.value = val;
}
watch(searchQuerys, async (newWord) => {
    try {
        const data = await searchPost(newWord);
        posts.value = data.posts;
    } catch (e) {
        console.log(e)
    }
});
</script>

<style scoped lang="scss">
.app__section1 {
    margin-top: 15px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.app__posts {
    margin-top: 15px;
}
@media (max-width: 700px) {
    .searchQuery {
        height: 120px;
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>