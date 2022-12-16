<template>
    <div class="container">
        <ul class="w-full flex flex-col divide-y divide-gray-300  ">
            <Project v-for="(project, i) in projects" 
            :key="i"
            :project="project" />
        </ul>
    </div>
</template>

<script>
    import ProjectCard from './ProjectCard.vue';
    import { useProjectStore } from '@/store/projects';
    import { mapState } from 'pinia';
    export default {
        components: {
            Project: ProjectCard
        },
        computed: {
            ...mapState(useProjectStore,['projects'])
        },
        mounted(){

        }
    }
</script>

<style lang="scss" scoped>

</style>
