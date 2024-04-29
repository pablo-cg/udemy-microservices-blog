<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import CommentCreate from './comment-create.vue';
import CommentList, { type Comment } from './comment-list.vue';

type Post = {
  id: string;
  title: string;
  comments: Comment[];
};

const posts = ref<Post[]>([]);

async function getPosts() {
  try {
    const { data } = await axios.get<Record<string, Post>>(
      'http://posts.com/posts',
    );

    posts.value = Object.values(data);
    console.log('getPosts | posts.value:', posts.value);
  } catch (error) {
    console.log('getPosts | error:', error);
  }
}

onMounted(async () => await getPosts());
</script>

<template>
  <section class="grid lg:grid-cols-3 gap-3">
    <div
      v-for="post in posts"
      :key="post?.id"
    >
      <h1 class="text-lg font-bold">{{ post?.title }}</h1>

      <CommentList :comments="post?.comments" />

      <hr class="border-zinc-6 my-2" />

      <CommentCreate :postId="post?.id" />
    </div>
  </section>
</template>

<style scoped></style>
