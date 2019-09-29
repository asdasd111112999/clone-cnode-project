import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import Postlist from '../components/Postlist'
import Userinfo from '../components/Userinfo'
import Sidebar from "../components/Sidebar";


Vue.use(Router)

export default new Router({
  routes: [
   {
     name:'root',
     path:'/',
     components:{
      main:Postlist,
       side:Sidebar
     }
   },
   {
     name:'toArticle',
     path:'/topic/:id',
     components:{
      main:Article
     }
   },
    {
      name:'toUserinfo',
      path:'/user/:userID',
      components:{
        main:Userinfo
      }
    }
  ]
})
