<template>
    <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
            <div class="md:container md:mx-auto flex h-16 items-center justify-between">
                <div class="flex items-center gap-3">
                    <NuxtLink to="/">
                        <img src="/assets/logoRU.png" class="h-14 w-14 object-contain">
                    </NuxtLink>
                    
                </div>

                <div class="flex items-center gap-5">
                    <ProfileMenu />
                </div>


            </div>
    </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>