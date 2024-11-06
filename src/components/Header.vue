<template>
    <div class="header">
        <div class="header__logo">
            Posts
        </div>
        <div class="header__btns">
            <RouterLink to="/"><button class="header__btns__btn">Главная</button></RouterLink>
            <RouterLink to="/page2"><button class="header__btns__btn">Стр 2</button></RouterLink>
            <RouterLink to="/page3"><button class="header__btns__btn">Стр 3</button></RouterLink>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    &__logo {
        cursor: pointer;
    }
    &__btns {
        width: 40%;
        display: flex;
        justify-content: space-around;
        &__btn {
            margin-right: 10%;
        }
    }
}
@media (max-width: 700px) {
    .header {    
        justify-content: space-around;
        &__btns {
            width: 80%;
        }
    }
}
</style>