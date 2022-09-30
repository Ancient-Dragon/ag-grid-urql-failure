<template>
  <Checkbox inputId="binary" v-model="params.value" :binary="true" :disabled="true" class="mb-2" />
</template>

<script lang="ts" setup>
import { toRef } from 'vue';

const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
});

const params = toRef(props, 'params');
</script>
