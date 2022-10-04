<template>
  <router-link class="p-button  p-button-rounded m-1" to="/">urql Issue</router-link>
  <router-link class="p-button  p-button-rounded m-1" to="/edit-error">Edit grid issue</router-link>
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
