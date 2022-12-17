
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', { 
  state: () => ({ 
  projects: [
      {
      "name": "Awesome project",
      "description": "Lorem ipsum dolor sit amet",
      "createdAt": "2020-10-11",
      "stars": 100
      },
      {
      "name": "Rocket project",
      "description": "Dolor sit amet",
      "createdAt": "2020-10-12",
      "stars": 120
      },
      {
      "name": "Bull project",
      "description": "Ipsum lorem sit",
      "createdAt": "2020-09-10",
      "stars": 60
      },
      {
      "name": "Greek project",
      "description": "Felicit ipsum dolor",
      "createdAt": "2020-08-12",
      }
    ],
  projectsList: [],
  ratedProjects: [],
    navLinks: [
      {
        text: 'All',
        active: true
      },
      {
        text: 'Most Stars',
        active: false
      }
    ], 
    popupVisible: false,
    warning: {
      text: `This input can't be blank!`,
      visible: false
    }
  }),
  getters: {
    projectsWithStars(){
      return this.projects.map(el =>{
        if(!el.stars){
          el.stars = 0
        }
        return el
      })
    },
    mostRated(){
      const mostRated = this.projectsWithStars.sort((a,b) => {
        return b.stars - a.stars
      })
      return mostRated.slice(0,3)
    },
  },
  actions: {
    setVisible(){
      return this.popupVisible = !this.popupVisible
    },
    createProject(name, description){
      const newProject = {}
      newProject.name = name
      newProject.description = description
      newProject.stars = 0
      newProject.createdAt = 'Right Now'
      return newProject
    },
    addProject(name, description){
      if(name.trim() && description.trim()){
        const project = this.createProject(name, description)
        this.projects.unshift(project)
        this.warning.visible = false
        this.popupVisible = false
      } else{
        this.warning.visible = true
      }
    },
    setProjects(link){
      switch (link.text) {
        case 'Most Stars':
          this.projectsList = this.mostRated
          this.navLinks.forEach(link => {
            link.active = false
          })
          link.active = true
          break;
          
          case 'All':
            this.setDefault()
            this.navLinks.forEach(link => {
              link.active = false
            })
            link.active = true
            break;
      }
    },
    setDefault(){
      this.projectsList = this.projects
    },
    rate(project){
      if(!this.ratedProjects.includes(project)){
        project.stars++
        if(!project.stars){
          project.stars = 1
        }
        this.ratedProjects.push(project)
      }else{
        project.stars--
        const startIndex = this.ratedProjects.indexOf(project)
        this.ratedProjects.splice(startIndex, 1)
        console.log(this.ratedProjects)
      }
    }
  },
})
