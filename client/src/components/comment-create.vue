<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const comment = ref('');

async function createComment() {
  if (!comment.value) return;

  try {
    const { data } = await axios.post(
      `http://posts.com/posts/${props.postId}/comments`,
      {
        content: comment.value,
      },
    );
    console.log('createComment | data:', data);
    resetForm();
  } catch (error) {
    console.log('createComment | error:', error);
  }
}

function resetForm() {
  comment.value = '';
}
</script>

<template>
  <form
    @submit.prevent="createComment"
    class="flex flex-col gap-3 items-end mt-3"
  >
    <input
      class="w-full rounded-md p-2 bg-zinc-9 ring-1 ring-zinc-6 border-none outline-none text-zinc-100 focus:border-none focus:ring-2 focus:ring-zinc-4"
      type="text"
      name="comment"
      id="comment"
      placeholder="Comment"
      v-model="comment"
    />

    <button
      class="max-w-fit rounded-md py-2 px-3 bg-green text-green-9 border-none hover:bg-green-9 hover:text-green-1 cursor-pointer transition duration-200"
      type="submit"
    >
      Comment
    </button>
  </form>
</template>

<style scoped></style>
