<template>
    <li class="px-2 py-3 flex justify-between">
        <div class="flex flex-col gap-px">
            <p class="font-bold text-md text-gray-900">
                {{project.name}}
            </p>
            <p class="font-small text-gray-400">
                {{project.description}}
            </p>
        </div>
        <!-- stars counter -->
        <div>
            <p>
                {{project.stars}}
            </p>
        </div>
    </li>
</template>

<script>
    export default {
        props: {
            project: Object
        }
    }
</script>

<style lang="scss" scoped>

</style>