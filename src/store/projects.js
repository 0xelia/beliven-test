
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons'
export const useProjectStore = defineStore('project', { 
  state: () => ({ 
  rawProjects: [
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
      "name": "Fantasy project",
      "description": "Ipsum lorem sit",
      "createdAt": "2021-09-10",
      "stars": 60
      },
      {
      "name": "Greek project",
      "description": "Felicit ipsum dolor",
      "createdAt": "2020-08-12",
      }
    ],
  currentList: [],
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
  query: '',
  popupVisible: false,
  warning: {
      text: `This input can't be blank!`,
      visible: false
    }
  }),
  getters: {
    projects(){
      return this.rawProjects.map((project) =>{
        let prjct = {
          id: project.id,
          name: project.name,
          description: project.description,
          creation: project.createdAt,
          stars: project.stars
        }

        if(!prjct.stars)
          prjct.stars = 0;

        return prjct
      })
    },
    mostRated(){
      const mostRated = this.projects.sort((a,b) => {
        return b.stars - a.stars
      })
      return mostRated.slice(0,3)
    },
    orderInputs(){
      const keys = Object.keys(this.projects[0])
      const x = keys.indexOf('description')
      const y = keys.indexOf('id')
      keys.splice(x,1)
      keys.splice(y,1)
      return keys
    },
    searchedProjects(){
      return this.projects.filter(el => {
        const {name} = el
        if(name.toLowerCase().includes(this.query.toLowerCase())){
          return true
        }
        return false
      })
    }
  },
  actions: {
    setVisible(){
      return this.popupVisible = !this.popupVisible
    },
    getProjects(){
      const projects = this.rawProjects.map((project) =>{
        let prjct = {
          id: project.id,
          name: project.name,
          description: project.description,
          creation: project.createdAt,
          stars: project.stars
        }

        if(!prjct.stars)
          prjct.stars = 0;

        return prjct
      })

      return projects
    },
    getProject(arr,id){
      return arr.filter(el => {
        if(el.id == id){
          return true
        }
      })
    },
    createProject(name, description){
      const newProject = {}
      newProject.name = name
      newProject.description = description
      newProject.stars = 0
      newProject.createdAt = dayjs().format('YYYY-MM-DD')
      return newProject
    },
    addProject(name, description){
      if(name.trim() && description.trim()){
        const project = this.createProject(name, description)
        this.rawProjects.push(project)
        this.clearFilters()
        // all'aggiunta di un nuovo progetto la lista si ordina per data di creazione di default
        this.orderProjects(2)
        this.warning.visible = false
        this.popupVisible = false
      } else{
        this.warning.visible = true
      }
    },
    checkStorage(arr){
      if(localStorage.length > 0){
        for(let i = 1; i <= localStorage.length; i++){
          let id = localStorage.getItem(i)
          console.log(id)
          if(id){
            arr.forEach(el => {
              if(el.id == id){
                el.stars++
                this.ratedProjects.push(el)
              }
            })
          }
        }
      }
    },
    setDefault(){
      this.rawProjects.forEach((el,i) => {
        el.id = i + 1
      })
      this.checkStorage(this.rawProjects)
      this.currentList = this.getProjects()
      return this.currentList
    },
    clearFilters(){
      const clearList = this.getProjects()
      this.checkStorage(clearList)
      this.currentList = clearList
    },

    rate(project){
      if(!this.ratedProjects.includes(project)){
        project.stars++
        this.rawProjects.forEach(el => {
          if(el.id == project.id){
            el.stars++
          }
        })

        if(!project.stars){
          project.stars = 1
        }
        this.ratedProjects.push(project)
        this.ratedProjects.forEach((el) => {
          localStorage.setItem(el.id, el.id)
        });
      }else{
        project.stars--
        this.rawProjects.forEach(el => {
          if(el == rawProject){
            el.stars--
          }
        })
        const startIndex = this.ratedProjects.indexOf(project)
        const removed = this.ratedProjects.splice(startIndex, 1)
        const key = removed[0].id
        localStorage.removeItem(key)
      }
    },
    setActive(obj, arr){
      arr.forEach(el => {
        el.active = false
      });
      obj.active = true
    },
    setProjects(link){
      if(link.text == 'Most Stars'){
        this.currentList.sort((a,b) => {
          return b.stars - a.stars
        })
        this.currentList = this.currentList.slice(0,3)
        // this.checkStorage(this.currentList)
        this.setActive(link, this.navLinks)
      }else if(link.text == 'All'){
        // this.clearFilters()
        this.currentList = this.getProjects()
        this.setActive(link, this.navLinks)
      }

    },
    orderProjects(value){
      const input = parseInt(value)
      switch(input){
        case 1:
          this.currentList.sort((a,b) => {
            if(a.name < b.name){
              return -1
            }
          })
          break;
        case 2:
          this.currentList.sort((a,b) => {
            if(a.creation > b.creation){
              return -1
            }
          })
          break;
        case 3:
          this.currentList.sort((a,b) => {
            if(a.stars > b.stars){
              return -1
            }
          })
          break;
      }
    },
    setQuery(query){
      return this.query = query
    },
    filterByName(query){
      this.setProjects(this.navLinks[0])
      this.setQuery(query)
      this.currentList = this.searchedProjects
    }
  },
})
