<template>
  <div>
    <Header />
    <Projects />
  </div>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue';
import ProjectsList from './components/ProjectsList.vue';
// import {useProjectStore} from '@/store/projects';
// const projectStore = useProjectStore();

export default {
  name: 'App',
  components: {
    Header: HeaderComp,
    Projects: ProjectsList
  }

}
</script>

<style lang="scss">
#app {

}
</style>
