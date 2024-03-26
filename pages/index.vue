<template>
    <div class="flex min-h-screen">
        <div>
            <Sidebar />
        </div>
        <main class="p-4 w-full">
            <div v-if="documentStore.loading">
        <Preloader />
    </div>
    <div v-else>
        <div class="relative overflow-x-auto">
 
            <div class="container text-right text-[#12b488]">
                <NuxtLink to="developmentDocuments/create" class="flex justify-end w-full items-center py-2 px-3 test-sm ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>Новая запись</span>
                </NuxtLink>
            </div>
            
            
            <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название документа</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действие</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 text-black">
                    <tr v-for="document in documentStore.documents">
                        <td class="px-6 py-4 whitespace-nowrap" href>
                            <NuxtLink :to="`/developmentdocuments/${document.id}`">
                                {{ document.id }}
                            </NuxtLink>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ document.attributes.status }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ document.attributes.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <NuxtLink :to="`/developmentdocuments/${document.id}`" class="px-4 pt-[9.5px] pb-[9.5px] text-center font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" @click="$event => recordStore.changePageMode()">Редактировать</NuxtLink>
                            <button class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" @click="$event => documentStore.deleteDocument(document.id)">Удалить</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center p-10 text-red">
            <Pagination
                v-model="documentStore.meta.pagination.page"
            />
        </div>
    </div>
        </main>
    </div>
    
</template>

<script setup>

    definePageMeta({
        layout: 'main'
    })
    const documentStore = useDocumentStore()

    documentStore.getDocuments('main')

    const recordStore = useRecordStore()

    recordStore.pageMode = 'View'

    documentStore.getDocumentModel()
</script>

<style scoped>
    h2 {
        margin-bottom: 20px;
        font-size: 36px;
    }
    p {
        margin: 20px 0;
    }
</style>