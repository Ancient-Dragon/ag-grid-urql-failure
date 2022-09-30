<template>
  <router-link to="/">Home</router-link>
  <router-link to="/edit-error">Edit Error</router-link>
  <router-view />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { createClient, provideClient } from '@urql/vue';

const client = createClient({
  url: 'https://api.spacex.land/graphql/',
});

provideClient(client);

</script>
