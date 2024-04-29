<script setup lang="ts">
import PostCreate from './components/post-create.vue';
import PostList from './components/post-list.vue';
</script>

<template>
  <main >
    <PostCreate />
    <hr class="border-zinc-6 my-6" />
    <PostList />
  </main>
</template>

<style scoped></style>
