<template>
  <div class="Sidebar">
    <section class="sec_one">
      <p>CNode: Node.js专业中文社区</p>
      <p>
        您可以
        <a href="">登录</a>
        或
        <a href="">注册</a>
        ，也可以
      </p>
      <p>
        <a href="">通过 GitHub 登录</a>
      </p>
    </section>
    <section  class="sec_two">
      <header>无人回复的话题</header>
      <ul>
        <li v-for="none in nonepreplylist">
          <router-link :to="{
              name:'toArticle',
              params:{
                id:none.id
              }
          }">
            {{none.title}}
          </router-link>
        </li>
      </ul>
    </section>
    <section class="sec_three">
      <header>
        积分榜
        <a href="">TOP 100 >>></a>
      </header>
      <ul>

      </ul>
    </section>
  </div>
</template>
<script>
    export default {
      name: "Sidebar",
      data() {
        return {
          posts: {},
          nonepreplylist:[]
        }
      },
      methods: {
        get_posts() {
          this.$http.get(`https://cnodejs.org/api/v1/topics`, {
            limit: 40
          })
            .then(res => {
              this.posts = res.data.data
            })
            .catch(err => console.log("getposts出错啦" + err))
        },
        nonereplytopic() {
          let posts = this.posts
          let list = this.nonepreplylist
          let len = posts.length
          for (let i = 0; i < len; i++) {
            if (posts[i].reply_count === 0 &&list.length<5) {
              list[list.length] = posts[i]
            }
          }
          console.log(this.nonepreplylist)
        }
      },
      created(){
        this.get_posts()
      },
      beforeMount() {
        this.nonereplytopic()
      }
    }
</script>

<style scoped>
  header{background: #F6F6F6;padding: 0.7rem;font-size: 1.3rem;}
  section{background: #FFFFFF;width:auto;margin-bottom: 1.5rem;}
  li{list-style: none}
  a{text-decoration: none}

  /*第一层*/
  .sec_one{padding: 1rem;}
  .sec_one>p:nth-child(1){font-size: 1.5rem;}
  .sec_one>p:nth-child(2){font-size: 1.3rem;display: inline-block;margin-top: 1.5rem;width: 100%;}
  .sec_one>p:nth-child(2)>a{color: #888888}
  .sec_one>p:nth-child(2)>a:hover{text-decoration: underline;}
  .sec_one>p:nth-child(3){display: inline-block;padding:  0.7rem 1.2rem;background: #5ABFDD;border-radius: 0.3rem;margin-top: 0.3rem;transition: all 0.3s;}
  .sec_one>p:nth-child(3):hover{
    background: #2F96B4;}
  .sec_one>p:nth-child(3)>*{color: white;font-size: 1.5rem;}

  .sec_two{}



</style>
