<template>
  <div class="Userinfo">
    <div class="lodding" v-if="isloadding">
      <img src="../assets/loading.gif" alt="">
    </div>
    <section class="userinfo_header">
      <header>
        <a href="">主页 </a>
        /
      </header>
      <body>
        <div class="user">
          <img :src="posts.avatar_url" alt="">
          <span>{{posts.loginname}}</span>
        </div>
        <p>{{posts.score}} 积分</p>
        <p class="collect">
          <a href="" >
            {{collect.length}}
            个话题收藏
          </a>
        </p>
        <p class="togithub">
          <img src="" alt="">
          <a :href="togithub()" >@{{posts.githubUsername}}</a>
        </p>
        <p class="time">
          注册时间 :
          <span>
            {{posts.create_at | timefilter}}
          </span>
        </p>
      </body>
    </section>
    <section class="creattopic">
      <header class="sectionheader">最近创建的话题</header>
      <body>
        <ul>
          <li v-for="create in create_recentlist(posts.recent_topics)">
            <img :src="create.author.avatar_url" >
            <span class="all_count">
              <span class="reply_count">{{create.title_reply_count}}</span>
              /
              <span class="visit_count">{{create.title_visit_count}}</span>
            </span>
            <router-link :to="{
                name:'toArticle',
                params:{
                  id:create.id
                }
           }">
              {{create.title}}
            </router-link>
            <div class="liright">
             <span class="lasttime">{{create.last_reply_at | timefilter}}</span>
            </div>
          </li>
        </ul>
      </body>
      <a class="moretopic">查看更多»</a>
    </section>
    <section class="jointopic">
      <header class="sectionheader">最近参与的话题</header>
      <body>
        <ul>
          <li v-for="join in create_recentlist(posts.recent_replies)">
            <img :src="join.author.avatar_url" >
            <span class="all_count">
                <span class="reply_count">{{join.title_reply_count}}</span>
                /
                <span class="visit_count">{{join.title_visit_count}}</span>
              </span>
            <router-link :to="{
                name:'toArticle',
                params:{
                  id:join.id
                }
           }">
              {{join.title}}
            </router-link>
            <div class="liright">
              <span class="lasttime">{{join.last_reply_at | timefilter}}</span>
            </div>
          </li>
        </ul>
      </body>
      <a class="moretopic">查看更多»</a>
    </section>
  </div>

</template>

<script>
    export default {
        name: "Userinfo",
        data(){
          return {
            isloadding:false,
            posts:[],
            collect:{}
          }
        },
        methods:{
          get_posts(){
              this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.userID}`)
                .then(res=> {
                  this.isloadding = false;
                  this.posts = res.data.data;
                })
                .catch(err=>console.log("getposts出错啦"+err))

          },
          create_recentlist(post) {
            let list = [];
            let old_list = post;
            let number;
            post.length >= 5 ? number = 5 : number = post.length;
            for (let i = 0; i < number; i++) {
              list[i] = old_list[i];
              this.$http.get(`https://cnodejs.org/api/v1/topic/${old_list[i].id}`)
                .then(res => {
                  let data = res.data.data;
                  let replies_list = data.replies;
                  let len = (replies_list.length) - 1;
                  list[i].lastreplyuser = replies_list[len].author;
                  list[i].title_reply_count = data.reply_count;
                  list[i].title_visit_count = data.visit_count;
                })
                .catch(err => {
                  console.log('create_recentlist出错啦' + err)
                })
            }
            console.log(list)
            return list
          },
          get_collect(){
            this.$http.get(`https://cnodejs.org/api/v1/topic_collect/${this.$route.params.userID}`)
              .then(res=>{
                this.collect=res.data.data;
              })
              .catch(err=>console.log('getcollect出错啦'+err))
              },
          togithub(){
            let str='https://github.com/'
            str+=this.posts.githubUsername
            return str
          }
        },
      created(){
        this.get_collect()
        this.get_posts()
      },
        beforeMount() {
        this.isloadding = true;
        }
    }
</script>

<style scoped>

  /*公有属性*/
  *{font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;padding: 0px;margin: 0px;}
  section{padding: 0px;margin-bottom:2rem;}
  body{background: #FFFFFF;}
  ul{margin: 0;padding: 0;}
  ul> li{list-style: none;border-bottom: 1px solid #F0F0F0;padding: 5px;}
  a{text-decoration: none;}
  a:hover{text-decoration: underline;}

  /*统一class*/
  .moretopic{display:block;padding:0.5rem;font-size: 1.8rem;color: #888888;border-radius:  0 0 0.2rem 0.2rem ;background: white;}
  .moretopic:hover{text-decoration: none;}
  .sectionheader{padding: 0.8rem;background: #F6F6F6;border-radius: 0.5rem 0.5rem 0 0}
  .lasttime{display:inline-block;float: right;margin-top:1.3rem;color: #CDCCCD}
  .liright{float: right;}

  /*第一区块*/
  .userinfo_header p{margin: 1rem;}
  .userinfo_header>header{padding: 1rem 1.5rem;background: #F6F6F6;font-size: 1.5rem;
    color: #888888;}
  .userinfo_header>header>a{color: #80BD01;}
  .userinfo_header>body{padding: 1rem;}
  .userinfo_header>body>.user{padding: 1rem;}
  .userinfo_header>body>.user>img{width:5rem;}
  .userinfo_header>body>.user>span{color: #778087;font-size: 1.5rem;display: inline-block;}
  .userinfo_header>body>p{font-size: 1.5rem;}
  .userinfo_header>body>.collect>a{color: #778087;font-size: 1.4rem;}
  .userinfo_header>body>.collect>a:hover{text-decoration: none;}
  .userinfo_header>body>.togithub>a{color: #778087}
  .userinfo_header>body>.togithub>a:hover{text-decoration: none;}
  .userinfo_header>body>.time{color: #888888;}

  /*第二区块*/
  .creattopic {font-size: 1.5rem;}
  .creattopic li {padding: 1.5rem;}
  .creattopic li img{width: 2rem;}
  .creattopic li .reply_count{color: #AB78C4}
  .creattopic li .visit_count{color: #888}

  /*第三区块*/
  .jointopic {margin-bottom: 50px;font-size: 1.5rem;}
  .jointopic li {padding: 1.5rem;}
  .jointopic li img{width: 2rem;}
  .jointopic li .reply_count{color: #AB78C4}
  .jointopic li .visit_count{color: #888}
  /*.jointopic li .liright img{width: 1.2rem; margin-top:1rem;margin-right: 1rem;}*/



</style>
