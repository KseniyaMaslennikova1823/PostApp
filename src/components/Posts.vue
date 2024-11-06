<template>
    <transition-group name="flip-list">
        <div 
            class="post" 
            v-for="(post, index) in posts" 
            :key="index" 
            @click="updatePosts(post.id)"
        >
            <RouterLink :to="'/post/' + post.id"> 
                <div>
                    <div>
                        <h4>{{ post.title }}</h4>
                    </div>
                    <div> {{ post.body }} </div>
                    <div class="postTags" > 
                        <template v-for="(tag, id) in post.tags" :key="id">
                            #{{ tag }} 
                        </template>
                    </div>
                    <div class="statistic">
                        <div class="info">Likes: {{ post.reactions.likes }} |</div>
                        <div class="info">Дизлайки: {{ post.reactions.dislikes }} |</div>
                        <div class="info">Просмотры: {{ post.views }} </div>
                    </div>
                </div>
            </RouterLink>    
            <div class="post__btns">
                <el-button class="elBtn" plain @click="dialogVisible = true" @click.prevent="deletePost(post.id), emit('delPost', post.id)">
                        Удалить
                </el-button>
                <el-dialog
                    v-model="dialogVisible"
                    :before-close="handleClose"
                >
                    <span class="elDialog">Пост удален</span>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button class="elOkBtn" type="primary" @click="dialogVisible = false">
                                OK
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
            </div>
        </div>
    </transition-group> 
</template>

<script setup>
import { ref, inject, defineEmits } from 'vue'
import axios from 'axios'
import { deletePost } from '../services/posts.js'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
const handleClose =  () => {
  ElMessageBox.confirm('Закрыть окно?')
    .then(() => {
      done()
    })
    .catch((e) => {
      console.log(e)
    })
}
//Получение постов
let posts = inject('allPosts');
// Удаление постов
const emit = defineEmits(['delPost', 'updatePost']);
// Редактирование поста
const updatePosts = (postId) => {
    emit('updatePost', postId)
}
</script>

<style scoped lang="scss">
.post {
    border: 1px solid #38220f;
    padding: 15px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    &__btns {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
}
.statistic {
    display: flex;
}
.info {
    margin-top: 10px;
    margin-right: 30px;
}
.postTags {
    color: #3AAACF;
    margin-top: 15px;
    margin-bottom: 15px;
}

.flip-list-item {
    display: inline-block;
    margin-right: 10px;
}
.flip-list-enter-active,
.flip-list-leave-active {
    transition: all 0.4s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
.elBtn {
    width: 200px;
    font-size: 20px;
    height: 42px;
    border: none;
    background: rgba(#634832, 0.4);;
}
.elDialog {
    font-size: 28px;
    width: 500px;
}
.elOkBtn {
    font-size: 28px;
    background-color: #dbc1ac;
    border: none;
}
@media (max-width: 700px) {
    .post {
        flex-direction: column;
        &__btns {
            align-items: center;
        }
    }
}
@media (max-width: 600px) {
    .elBtn {
        width: 150px;
    }
}
@media (max-width: 500px) {
    .statistic {
        display: flex;
        flex-direction: column;
    }
}
</style>