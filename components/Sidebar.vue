<template>
    <!-- <div>
        <div class="flex min-h-screen">
            <div class="w-1/4 shrink-0 bg-gray-50 border-r border-gray-200 py-4">
                <nav class="mt-2 px-2">
                    <NavItem 
                        :item="item" 
                        v-for="item in navItems" 
                        :key="item.label" 
                    />
                </nav>
            </div>
        
        </div>
    </div> -->

    
    <div class="w-64 shrink-0 border-r border-gray-200 bg-gray-50 py-4">
        <nav class="mt-2 px-2">
            <NavItem
            :item="item"
            v-for="item in navItems"
            :key="item.label"
            />
        </nav>
    </div>

    
</template>

<script setup>

    import { HomeIcon, NewspaperIcon, PhotoIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'

    const navItems = [
        {
            href: '#', 
            active: true, 
            label: "Главная", 
            children: [], 
            icon: HomeIcon
        },
        {
            href: '#', 
            active: false, 
            label: "Сопровождение разработки документов по вопросам обеспечения ИБ и безопасности объектов КИИ", 
            children: [
                {
                    href: '/developmentdocuments/create', 
                    active: true, 
                    label: "Новая запись", 
                    children: [], 
                    icon: PlusCircleIcon
                },
                {
                    href: '/developmentdocuments', 
                    active: false, 
                    label: "Все записи", 
                    children: [], 
                    icon: null
                },
                {
                    href: '/developmentdocuments/panel', 
                    active: false, 
                    label: "Информационная панель", 
                    children: [], 
                    icon: null
                }
            ], 
            icon: NewspaperIcon
        },
        {
            href: '#', 
            active: false, 
            label: "Учет и предоставление документов по вопросам обеспечения ИБ и безопасности объектов КИИ", 
            children: [
                {
                    href: '#', 
                    active: true, 
                    label: "Новая запись", 
                    children: [], 
                    icon: PlusCircleIcon
                },
                {
                    href: '#', 
                    active: false, 
                    label: "Все записи", 
                    children: [], 
                    icon: null
                },
                {
                    href: '#', 
                    active: false, 
                    label: "Информационная панель", 
                    children: [], 
                    icon: null
                }
        ], 
            icon: PhotoIcon
        },
        {
            href: '#', 
            active: false, 
            label: "Информационная поддержка взаимодействия с государственными органами", 
            children: [
                {
                    href: '#', 
                    active: true, 
                    label: "Новая запись", 
                    children: [], 
                    icon: PlusCircleIcon
                },
                {
                    href: '#', 
                    active: false, 
                    label: "Все записи", 
                    children: [], 
                    icon: null
                },
                {
                    href: '#', 
                    active: false, 
                    label: "Информационная панель", 
                    children: [], 
                    icon: null
                }
        ], 
            icon: PhotoIcon
        }
    ]

</script>

<style lang="scss" scoped>

</style>