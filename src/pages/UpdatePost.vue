<template>
        <div class="updatePost">
        <div class="updatePost__info">
            <p>Название поста</p>
            <input 
                required 
                v-model="newTitle" 
            />
            <p>Описание поста</p>
            <textarea 
                required 
                class="updatePost__info__description"  
                v-model="newBody" 
            />
            <p>Теги</p>
            <textarea required v-model="newTags" />
        </div>
        <div class="updatePost__btns">
            <RouterLink to="/">
                <button>
                    Отменить
                </button>
            </RouterLink>
            <RouterLink to="/">
                <el-button 
                    class="elBtn" 
                    plain 
                    @click="dialogVisible = true" 
                    @click.prevent="sendPost(post.id, post.tags)"
                >
                    Сохранить
                </el-button>
                <el-dialog
                    v-model="dialogVisible"
                    :before-close="handleClose"
                >
                    <span class="elDialog">Пост сохранен</span>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button 
                                class="elOkBtn" 
                                type="primary" 
                                @click="dialogVisible = false"
                            >
                                OK
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPost, updatePost, addPost } from '../services/posts.js'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
const handleClose =  () => {
  ElMessageBox
    .then(() => {
      done()
    })
    .catch((e) => {
      console.log(e)
    })
}

const post = ref('');
let idPost;
const newTitle = ref('');
const newBody = ref('');
const newTags = ref('');
const selectedPost = async (idPost) => {
    try {
        const route = useRoute();
        idPost = route.params.postID;
        const data = await getPost(idPost);
        post.value = data;
        newTitle.value = data.title;
        newBody.value = data.body;
        newTags.value = data.tags;
    } catch (e) {
        console.log(e)
    }
}
onMounted(selectedPost);
let newId;
function sendPost(sendId, postTags) {
    let body = newBody.value;
    let title = newTitle.value;
    let tags =[];
    if(postTags != tags) {
        tags = newTags.value.split(',');
    } else {
        tags = newTags.value;
    }
    if(!sendId) {
        newId = Date.now();
        addPost(newId, title, body, tags)
    } else {
        updatePost(sendId, title, body, tags)
    }
}
</script>

<style scoped lang="scss">
.updatePost {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__info {
        width: 60%;
        margin: 0 auto;
        &__description {
            height: 300px;
        }
    }
    &__btns {
        width: 60%;
        display: flex;
        justify-content: space-around;
        margin-top: 25px;
        margin-bottom: 25px;
    }
}
input, textarea {
    width: 100%;
    resize: none;
    background: rgba(255, 255, 255, 0.3);
    padding: 15px;
    border-radius: 15px;
}
button {
    width: 350px;
}
.elBtn {
    width: 350px;
    font-size: 20px;
    height: 42px;
    border: none;
    background: transparent;
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
@media (max-width: 1350px) {
    .updatePost {
        &__btns {
            button {
                width: 200px;
            }
            .elBtn {
                width: 200px;
            }
        }
    } 
}
@media (max-width: 800px) {
    .updatePost {
        &__info {
            width: 100%;
        }
        &__btns {
            width: 100%;
        }
    }
}
@media (max-width: 600px) {
    .updatePost {
        &__btns {
            button {
                width: 150px;
            }
            .elBtn {
                width: 150px;
            }
        }
    }
}
</style>