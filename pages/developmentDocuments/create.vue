<template>
    <div>

        <form @submit.prevent="createRecord" class="w-full ">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3  py-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Статус
                    </label>
                    <input v-model="statusRef" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="status" type="text">
                </div>
                <div class="w-full md:w-1/2 px-3 py-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Номер документа
                    </label>
                    <input v-model="numberRef" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="number" type="number">
                </div>
                <div class="w-full md:w-1/2 px-3 py-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Название документа
                    </label>
                    <input v-model="nameRef" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text">
                </div>
                <div class="w-full md:w-1/2 px-3 py-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Ссылка на документ
                    </label>
                    <input v-model="linkRef" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="link" type="text">
                </div>
                <div class="w-full md:w-1/2 px-3 py-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Описание
                    </label>
                    <textarea v-model="descriptionRef" rows="5" cols="80" id="description" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                </div>
                <div class="w-full md:w-1/2 px-3 py-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Вложение
                    </label>
                    <input v-on:change="getFile" type="file" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="attachments" multiple>
                </div>
            </div>

            <div class="flex items-center justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="$event => recordStore.createRecord(statusRef, nameRef, descriptionRef, numberRef, linkRef, fileInputValue)">
                    Сохранить
                </button>
            </div>
        </form>

    </div>
</template>

<script setup>

    const recordStore= useRecordStore()

    const fileInputValue = ref(null)
    
    async function getFile(event){
        fileInputValue.value = event.target.files
    }

</script>

<style scoped>

</style>