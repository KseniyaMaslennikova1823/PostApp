import request from './request.js';

/* Все посты */
export function getsPosts(skipPost) {
    return request({
        url: `/posts?limit=10&skip=${skipPost}`,
        method: 'GET',
    })
}

/* Один пост */
export function getPost(id) {
    return request({
        url: `/posts/${id}`,
        method: 'GET',
    })
}

/* Поиск постов */
export function searchPost(searchWord) {
    return request({
        url: `/posts/search?q=${searchWord}`,
        method: 'GET',
    })
}

/* Сортировка постов */
export function sortPost(sortValue, orderSort) {
    return request({
        url: `/posts?limit=0&sortBy=${sortValue}&order=${orderSort}`,
        method: 'GET',
    })
}

/* Добавление постов */
export function addPost(id, newTitle, newBody, newTags) {
    return request({
        url: `/posts/add`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: `${newTitle}`,
            userId: `${id}`,
            body: `${newBody}`,
            tags: [`${newTags}`],
        })
    })
}

/* Редактирование постов */
export function updatePost(id, updateTitle, updateBody, updateTags) {
    return request({
        url: `/posts/${id}`,
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: `${updateTitle}`,
            body: `${updateBody}`,
            tags: `${updateTags}`,
        })
    })
}

/* Удаление постов */
export function deletePost(id) {
    return request({
        url: `/posts/${id}`,
        method: 'DELETE',
    })
}