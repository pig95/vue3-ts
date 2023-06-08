<template>
  <router-view/>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
router.beforeEach((to, from, next) => {
  console.log(to.fullPath);
  const token = localStorage.getItem('token');

  if (to.fullPath === '/login') {
    next();
  } else if(!token) {
    next('/login');
  } else {
    next();
  }
})
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}

html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
