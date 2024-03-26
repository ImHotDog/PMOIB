<template>
    <div v-if="recordStore.loading">
        <Preloader />
    </div>
    <div v-else-if="recordStore.pageMode === 'View'">
        <div class="text-black">
            <div class="flex justify-between">
                <div class="flex items-center justify-start">
                    <button class="flex justify-end items-center py-2 px-3 test-sm transition ease-in-out duration-500 text-[#1a498e] hover:text-[#1ec4bc]" @click="$event => recordStore.changePageMode()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <span>Редактировать</span>
                    </button>
                    <button v-if="recordStore.record.attributes.status != 'Согласовано'" class="flex justify-end items-center py-2 px-3 test-sm transition ease-in-out duration-500 text-[#1a498e] hover:text-[#1ec4bc]" @click="$event => recordStore.comundaSendAction(id, Boolean(recordStore.record.attributes.attachments))">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>

                        <span>Согласовать</span>
                    </button>
                </div>
                <div class="flex items-center justify-end">
                    <NuxtLink to="/developmentDocuments/create" class="flex justify-end items-center py-2 px-3 test-sm transition ease-in-out duration-500 text-[#1a498e] hover:text-[#1ec4bc]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </NuxtLink>
                    <button class="flex justify-end items-center py-2 px-3 test-sm transition ease-in-out duration-500 text-[#1a498e] hover:text-red-500" @click="$event => documentStore.deleteDocument(id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
            
            <form @submit.prevent="createRecord" class="w-full py-2 px-3">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3  py-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Статус
                        </label>
                        <span>{{ recordStore.record.attributes.status }}</span>
                    </div>
                    <div v-if="recordStore.record.attributes.status == 'Согласовано'" class="w-full md:w-1/2 px-3  py-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Дата и время согласования
                        </label>
                        <span>{{ recordStore.record.attributes.approvalDate }}</span>
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Номер документа
                        </label>
                        <span>{{ recordStore.record.attributes.number }}</span>
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Название документа
                        </label>
                        <span>{{ recordStore.record.attributes.name }}</span>
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Ссылка на документ
                        </label>
                        <span>{{ recordStore.record.attributes.link }}</span>
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Описание
                        </label>
                        <span>{{ recordStore.record.attributes.description }}</span>
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Вложение
                        </label>
                        <div class="flex items-center justify-between border-b" v-for="attachment in recordStore.record.attributes.attachments">
                            <a :href="attachment.attributes.url" target="_blank">{{attachment.attributes.name}}</a>
                            
                            <button class="py-2 px-3 test-sm transition ease-in-out duration-500 text-[#1a498e] hover:text-red-500" @click="$event => recordStore.deleteAttachment(id, attachment.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6 text-right">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </button>
                        </div>
                        <!-- <a href="${}" target="_blank">{{ recordStore.record.attributes.description }}</a> -->
                    </div>
                </div>
            </form>

        </div>
    </div>
    <div v-else>
        <div>
            <div class="flex justify-between">
                <div class="flex items-center justify-start">
                    <button class="flex justify-end items-center py-2 px-3 test-sm transition ease-in-out duration-500 text-[#1a498e] hover:text-[#1ec4bc]" @click="$event => recordStore.changePageMode()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 mr-2"> <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /> 
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /> 
                        </svg>
                        <span>Просмотр</span>
                    </button>
                </div>
                <div class="flex items-center justify-end">
                    <button class="flex justify-end items-center py-2 px-3 test-sm transition ease-in-out duration-500 text-[#1a498e] hover:text-[#1ec4bc]" @click="$event => recordStore.editRecord(recordStore.record.attributes.status, recordStore.record.attributes.name, recordStore.record.attributes.description, id, recordStore.record.attributes.number, recordStore.record.attributes.link, fileInputValue)" tittle="Сохранить">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <form @submit.prevent="createRecord" class="w-full ">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3  py-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Статус
                        </label>
                        <span>{{ recordStore.record.attributes.status }}</span>
                    </div>
                    <div v-if="recordStore.record.attributes.status == 'Согласовано'" class="w-full md:w-1/2 px-3  py-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Дата и время согласования
                        </label>
                        <span>{{ recordStore.record.attributes.approvalDate }}</span>
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Номер документа
                        </label>
                        <input v-model="recordStore.record.attributes.number" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text">
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Название
                        </label>
                        <input v-model="recordStore.record.attributes.name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text">
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Ссылка на документ
                        </label>
                        <input v-model="recordStore.record.attributes.link" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text">
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Описание
                        </label>
                        <textarea v-model="recordStore.record.attributes.description" rows="5" cols="80" id="tittle" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                    </div>
                    <div class="w-full md:w-1/2 px-3 py-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Вложение
                        </label>
                        <input v-on:change="getFile" type="file" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="attachments" multiple>
                    </div>
                </div>

                <!-- <div class="flex items-center justify-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="$event => recordStore.changePageMode()">
                        Сохранить
                    </button>
                </div> -->
            </form>

        </div>
    </div>
</template>

<script setup>

    const { id } = useRoute().params

    const documentStore = useDocumentStore()

    
    const recordStore = useRecordStore()

    recordStore.getRecord(id)

    // console.log(recordStore.record.attributes.attachments)
    // console.log(Boolean(recordStore.record.attributes.attachments))

    const fileInputValue = ref(null)
    
    async function getFile(event){
        fileInputValue.value = event.target.files
        console.log(fileInputValue.value)
    }

    const props = defineProps({
            pageMode: Boolean,
        })

    
    
</script>

<style scoped>

</style>