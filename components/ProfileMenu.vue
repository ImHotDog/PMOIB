<template>
    <HeadlessMenu as="div" class="relative">
        <HeadlessMenuButton class="focus:outline-none flex h-9 w-9 shrink-0 items-center justify-center rounded-full border">
            <img src="/assets/user.svg" alt="User" class="w-full h-full">
        </HeadlessMenuButton>
        <Transition
            enter-active-class="transition transform duration-150 ease-out"
            enter-from-class="opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition transform duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-75"
        >
            <HeadlessMenuItems class="focus:outline-none absolute right-0 bg-white rounded-md shadow-lg border z-10 mt-3 w-48 bg-background focus-visible:right-2">
                <HeadlessMenuItem v-slot="{active}">
                    <NuxtLink :class="{'bg-gray-100': active}" class="block px-4 py-2 text-sm text-gray-700">Профиль</NuxtLink>
                </HeadlessMenuItem>
                <HeadlessMenuItem v-slot="{active}">
                    <NuxtLink :class="{'bg-gray-100': active}" class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700">Настройки</NuxtLink>
                </HeadlessMenuItem>
                <hr />
                <HeadlessMenuItem v-slot="{active}">
                    <NuxtLink :class="{'bg-gray-100': active}" class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700">Выход</NuxtLink>
                </HeadlessMenuItem>
            </HeadlessMenuItems>
        </Transition>
                        
    </HeadlessMenu>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>