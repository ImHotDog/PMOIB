<script setup lang="ts">
import { _white } from '#tailwind-config/theme/accentColor';

const documentStore = useDocumentStore()

</script>

<template>
  <UPagination 
    v-on:click="documentStore.getDocuments()"
    size="xl"
    :first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'Первая', color: 'gray' }"
    :last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Последняя', color: 'gray' }"
    :active-button="{ color: 'primary' }"
    :model-value="documentStore.meta.pagination.page"
    :page-count="documentStore.meta.pagination.pageSize"
    :total="documentStore.meta.pagination.total"
    show-first
    show-last
  />
</template>