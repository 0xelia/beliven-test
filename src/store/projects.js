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
    ]  
  }),
  getters: {

  },
  actions: {

  },
})
