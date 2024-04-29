<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const title = ref('');

async function createPost() {
  if (!title.value) return;

  try {
    const { data } = await axios.post('http://posts.com/posts/create', {
      title: title.value,
    });

    console.log('createPost | data:', data);

    resetForm();
  } catch (error) {
    console.log('createPost | error:', error);
  }
}

function resetForm() {
  title.value = '';
}
</script>

<template>
  <div class="space-y-4">
    <h1>Create Post!</h1>
    <form
      class="flex gap-3"
      @submit.prevent="createPost"
    >
      <input
        class="rounded-md p-2 bg-zinc-9 ring-1 ring-zinc-6 border-none outline-none text-zinc-100 focus:border-none focus:ring-2 focus:ring-zinc-4"
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        v-model="title"
      />

      <button
        class="rounded-md py-2 px-3 bg-green text-green-9 border-none hover:bg-green-9 hover:text-green-1 cursor-pointer transition duration-200"
        type="submit"
      >
        Create
      </button>
    </form>
  </div>
</template>

<style scoped></style>
