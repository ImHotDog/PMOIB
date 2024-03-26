<template>
    <NuxtLink 
        v-if="!item.children.length"
        :class="[
            'group flex w-full items-center py-2 px-3 test-sm',
            'hover:bg-gray-100 rounded-md',
            item.active ? 'text-gray-800 font-semibold' : 'text-gray-600 font-medium'
        ]" 
        :href="item.href">
        
        <component 
            :class="[
                'w-6 h-6 shrink-0 mr-2 group-hover:text-gray-600',
                item.active ? 'text-gray-600' : 'text-gray-400'
            ]"
            :is="item.icon" 
            v-if="item.icon"
        ></component>
    
        <span>
            {{ item.label }}
        </span>
    </NuxtLink>
    
        
    <HeadlessDisclosure 
        v-else 
        v-slot="{ open }"
        :defaultOpen="hasActiveChild"
    >
      <HeadlessDisclosureButton :class="[
            'group text-left flex w-full items-center rounded-md py-2 px-3 test-sm',
            'hover:bg-gray-100',
            open ? 'font-semibold text-gray-800' : 'font-medium text-gray-600'
        ]">
        <component 
            :class="[
                'w-6 h-6 shrink-0 mr-2 text-gray-400 group-hover:text-gray-600',
                open ? 'text-gray-600' : 'text-gray-400'
            ]"
            :is="item.icon" 
            v-if="item.icon"
        ></component>
    
        <span class="flex-1">
            {{ item.label }}
        </span>
        <ChevronDownIcon :class="[
            'w-6 h-6 shrink-0', 
            open ? '-rotate-180 text-gray-600' : 'text-gray-400',
        ]" />
      </HeadlessDisclosureButton>
      <HeadlessDisclosurePanel class="ml-4">
        <NavItem
            v-for="child in item.children" 
            :item="child"
        />      
      </HeadlessDisclosurePanel>
    </HeadlessDisclosure>
</template>

<script setup>
    
    import { ChevronDownIcon } from '@heroicons/vue/24/outline'

    const props = defineProps({
        item: Object,
    })

    const hasActiveChild = computed(() => 
        props.item.children.some(item => item.active)
    )
 
</script>

<style lang="scss" scoped>

</style>