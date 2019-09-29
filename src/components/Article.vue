<template>
    <div class="article">
      <!--      如果正在加载，就显示lodding-->
      <div class="lodding" v-if="isloadding">
        <img src="../assets/loading.gif" alt="">
      </div>
      <div v-else class="topic_header">
          <span class="title">
            <span :class="{'tab':true,'active':isactive}">
              {{tab}}
            </span>
            {{post.title}}
          </span>
          <ul>
            <li> 发布于 {{post.create_at | timefilter}}</li>
            <li> 作者
              <router-link :to="{
            name:'toUserinfo',
            params:{
              userID:post.author.loginname
            }
            }">
                {{post.author.loginname}}
              </router-link>
            </li>
            <li> {{post.visit_count}} 次分享</li>
            <li> 来自 {{from}}</li>
          </ul>
        <div class="hr"></div>
        <div v-html=post.content class="markdownbody"></div>
      </div>
      <div class="topic_reply">
        <div class="reply_count">{{reply_count}} 回复</div>
        <ul>
          <li v-for="(post,index) in post.replies">
            <router-link :to="{
            name:'toUserinfo',
            params:{
              userID:post.author.loginname
            }
            }">
              <img :src="post.author.avatar_url" alt="">
            </router-link>
              <router-link :to="{
            name:'toUserinfo',
            params:{
              userID:post.author.loginname
            }
            }" class="userID">
                {{post.author.loginname}}
            </router-link>
            <a class="reply_time" title="点了也没用！">{{index+1}}楼•{{post.create_at | timefilter}}</a>
            <span v-show="isshowFN(post)" class="reply_count_tab">作者</span>
            <p v-html="post.content">{{post.content}}</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Article",
        data:function(){
          return {
            isloadding:false,
            isactive:true,
            posts:{}
          }
        },
        methods:{
          getdata(){
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
              .then(responce=>{
                this.isloadding=false;
                this.post=responce.data.data
              })
              .catch(error=>{
                console.log("错误是"+error)
              })
          },
          isshowFN(post){
            let replyuser=post.author.loginname
            let titleuser=this.post.author.loginname
            if(titleuser===replyuser){
              return true
            }else{
              return false
            }
          }
        },
      computed:{
        from:function(){
          if(this.post.tab==='share'){
            return '分享'}
        },
        tab:function(){
          if(this.post.top===true){
            return '置顶'
          }else if(this.post.good ===true){
            return '精华'
          }else{
            return  this.isactive=false
          }
        },
        reply_count:function(){
          return this.post.replies.length
        }
      },
      beforeMount(){
          this.isloadding=true;
          this.getdata()
      }
    }
</script>

<style >
  @import url("../assets/markdown-github.css");
  a{text-decoration: none;font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;color: #0088CC;}
  a:hover{text-decoration: underline;}
  .article{background: #E1E1E1;}

  /*.topic_header>.title*/
  .topic_header{align-items:center;background: #FFFFFF;}
  .topic_header>.title{display: inline-block;font-size: 2.5rem;font-weight:900;padding-left: 2rem;padding-top: 2rem;}
  .topic_header>.title>.tab{display: none;margin-left: 5px;color: #FFFFFF;font-size: 1rem;background: #89C600;padding: 0.3rem 0.5rem;border-radius:0.3rem;margin-right: 1rem;}
  .topic_header>.title>.tab.active{display: inline-block;}

  /*.topic_header>ul*/
  .topic_header>ul{margin: 1.5rem 0rem 1rem 0rem;font-weight:200;padding: 0rem;}
  .topic_header>ul>li{font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;list-style: none;float: left;font-size:1.2rem;margin-left: 10px;color: #888888;}
  .topic_header>ul>li::before {content: '•';}
  .topic_header>ul>li>a{color: #888888;}
  .topic_header>ul::after{content: "";clear:both;display: block;}

  /*.topic_header>.markdownbody*/
  .topic_header>.markdownbody{font-size: 1.4rem;padding: 2rem;}
  .topic_header>.markdownbody img{width: 100%;}
  .topic_header>.hr{border-bottom:1px solid #888888;}

  .topic_reply>.reply_count{background: #F6F6F6;font-size: 20px;padding: 5px 10px 5px 15px;color:#444444 ;}
  .topic_reply>ul{padding: 0px;margin: 0px;}
  .topic_reply>ul>li{list-style: none;background: #FFFFFF;border-bottom: 1px solid #F0F0F0;padding: 10px;}
  .topic_reply>ul>li img{width: 40px;}
  .topic_reply>ul>li .reply_count_tab{background: #80BD01;color: white;padding: 0px 3px;}
  .topic_reply .userID{color: #666666;font-weight: 700;font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;}
  .topic_reply .reply_time{cursor: pointer;}

</style>
