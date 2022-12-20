<template>
    <li class="px-2 py-3 flex justify-between text-gray-400">
        <div class="flex flex-col gap-px">
            <p class="font-bold text-md text-gray-900">
                {{project.name}}
            </p>
            <p class="font-small w-40">
                {{project.description}}
            </p>
        </div>
        <!-- stars counter -->
        <p v-if="project.stars" class="flex gap-1 items-center">
            {{project.stars}}
            <font-awesome-icon @click="rate(project)" class="cursor-pointer" icon="fa-regular fa-star" />
        </p>
        <p class="text-center" v-else>
            No ratings yet <br>
            <span 
            @click="rate(project)"
            class="cursor-pointer hover:underline hover:text-blue-800">Rate</span>
        </p>
        <!-- realese date -->
        <p class="flex items-center">
            {{project.creation}}
        </p>
    </li>
</template>

<script>
    import { useProjectStore } from '@/store/projects';
    import { mapActions } from 'pinia';
    export default {
        props: {
            project: Object
        },
        methods: {
            ...mapActions(useProjectStore,['rate']),
        }
    }
</script>

<style lang="scss" scoped>

</style>