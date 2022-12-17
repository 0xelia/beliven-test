<template>
    <div 
    class="fixed z-50 top-0 bottom-0 left-0 right-0 grid place-items-center bg-black/40 backdrop-blur-md">
        <div class="w-1/2 h-[450px] flex flex-col bg-gray-100 rounded-lg -translate-y-1/4  relative">
            <font-awesome-icon 
            @click="setVisible()"
            class="absolute -top-10 -left-10 p-4 cursor-pointer"
            icon="fa-solid fa-x" />
            <div class="w-full text-center rounded-t-lg py-2 bg-blue-800">
                <h4 class="text-white font-bold">
                    New Project
                </h4>
            </div>
            <div class="flex flex-col items-center gap-2 grow py-4">
                <div class="flex flex-col gap-1 items-center w-3/4">
                    <label class="self-start text-gray-800" for="project_name">Name the project</label>
                    <input 
                    class="text-md text-center focus:text-start px-4 py-2 rounded-lg w-full" type="text" name="project_name" placeholder="Here goes your new project name" id=""
                    v-model="name">
                    <p v-if="warning.visible" class="text-red-700">
                        {{warning.text}}
                    </p>
                </div>
                <div class="flex flex-col gap-1 items-center w-3/4 grow">
                    <label class="self-start text-gray-800" for="project_name">Describe the project</label>
                    <textarea name="prpject_description" id="" class="w-full text-gray-400 text-center rounded-md"  rows="5"
                    v-model="description"></textarea>
                    <p v-if="warning.visible" class="text-red-700">
                        {{warning.text}}
                    </p>
                </div>
                <button 
                @click="addProject(name, description)"
                class="px-6 py-2 bg-blue-800 text-white rounded-md">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'pinia';
    import { mapState } from 'pinia';
    import { useProjectStore } from '@/store/projects';
    export default {
        data(){
            return {
                name: '',
                description: '',
            }
        },
        computed: {
            ...mapState(useProjectStore,['warning'])
        },
        methods: {
            ...mapActions(useProjectStore, ['setVisible', 'addProject'])
        }
    }
</script>

<style lang="scss" scoped>

</style>