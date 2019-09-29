<template>
  <div>
    <div class="lodding" v-if="isloadding">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div  class="postlist" >
      <header>
        <a href="" class="active">全部</a>
        <a href="">精华</a>
        <a href="">分享</a>
        <a href="">问答</a>
        <a href="">招聘</a>
      </header>
      <ul>
        <li v-for="post in posts">
            <router-link :to="{
                name:'toUserinfo',
                params:{
                  userID:post.author.loginname
                }
            }" class="author">
              <img :src="post.author.avatar_url" alt="">
            </router-link>
          <div class="title_row">
            <span class="all_count">
              <span title="回复数" class="reply_count">{{post.reply_count}}</span>
              /
              <span title="浏览数" class="visit_count">{{post.visit_count}}</span>
            </span>
            <span :class="{'tab':true,'active':isactive(post)}">{{post | postlist_tabfilter}}</span>
              <router-link :to="{
                name:'toArticle',
                params:{
                  id:post.id
                }
              }" :title="post.title" class="title">
               {{post.title}}
              </router-link>
            <span class="last_reply">
              {{post.last_reply_at | timefilter}}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "postlist",
      data:function(){
          return {
            isloadding:false,
            posts:[]
          }
      },
      methods:{
          getdata(){
            this.$http.get("https://cnodejs.org/api/v1/topics",{
              page:1,
              limit:20
            }).then(res=>{
              this.isloadding = false;
              this.posts = res.data.data;
            }).catch(err=>{
              console.log(err);
            })
          },
        isactive(post){
          if(post.good===true || post.top===true){
            return true
          }else{
            return false
          }
        }
      },
      computed:{
        tab:function () {
          if(this.post.tab==='share'){return '分享'}
        }
      },
      beforeMount() {
          this.isloadding = true;
          this.getdata();
      }
    }
</script>

<style scoped>
  * {box-sizing: border-box;margin: 0;padding: 0;}
  a{text-decoration: none;color: black;font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;}
  .postlist{background: #E1E1E1;}



  /*.header*/
  .postlist>header{padding: 0.5rem;background: #F6F6F6;border-radius: 0.5rem 0.5rem 0 0 }
  .postlist>header>a{padding: 0rem 0.3rem;display: inline-block;border-radius:0.3rem;color: #80BD01;font-size: 1.5rem;margin: 0 1rem;}
  .postlist>header>a.active{background: #80BD01;color: white;}

  .postlist>ul{background: #FFFFFF;list-style: none;}
  .postlist>ul>li{padding: 0.6rem ;border-bottom: 1px solid #F0F0F0;}
  .postlist>ul>li:hover{background: #F5F5F5;}
  .postlist>ul>li::after{content: "";clear: both;display: block;}

  .author{float: left; display: block;margin-left: 10px;}
  .author>img{max-width: 3rem;}

  .title_row {float: left;margin-top: 0.5rem;width: 95%; position: relative;}
  .title_row>.all_count{margin-left:0.5rem;min-width:8%;display:inline-block;cursor: default;text-align: center;}
  .title_row>.all_count>.reply_count{color: #9E78C0;font-size: 1.4rem;}
  .title_row>.all_count>.visit_count{color: #888888;font-size: 0.7rem;}

  .title_row>.tab{color: #999988;background: #E5E5E5;padding: 0.2rem 0.5rem;border-radius:0.3rem;margin:0rem 0.5rem;font-size: 1.2rem;}
  .title_row>.tab.active{background: #80BD01;color: white;}
  .title_row>.title{font-size: 1.5rem;max-width: 70%;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;display: inline-block;}
  .title_row>.title:hover{text-decoration: underline;}
  .title_row>.title:visited{color:#888888;}
  .title_row>.last_reply{position:absolute;right:0;color:#888888;}

</style>
