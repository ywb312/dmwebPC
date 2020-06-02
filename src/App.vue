<template>
    <div>
        <h2>Hellow!!!!</h2>
        <keep-alive>
            <router-view></router-view>
            <!-- <router-view v-if="$route.meta.keepAlive"></router-view> -->
        </keep-alive>
        <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    </div>
</template>

<script>
export default {
    name: "app"
};
</script>