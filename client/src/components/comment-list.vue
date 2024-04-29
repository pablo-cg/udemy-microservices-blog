<script setup lang="ts">
export interface Comment {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Props {
  comments?: Comment[];
}

defineProps<Props>();
</script>

<template>
  <span class="font-italic">{{ comments?.length }} comments</span>

  <hr class="border-zinc-6 my-2" />
  <ul class="px-4 list-none">
    <li
      class="p-1 border"
      v-for="comment in comments"
      :key="comment?.id"
    >
      <span v-if="comment?.status === 'approved'">
        {{ comment?.content }}
      </span>

      <span v-if="comment?.status === 'rejected'">
        This comment has been rejected.
      </span>

      <span v-if="comment?.status === 'pending'">
        This comment is pending approval.
      </span>
    </li>
  </ul>
</template>

<style scoped></style>
