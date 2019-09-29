<template>
    <div class="header">
      <router-link :to="{
        name:'root'
      }">
        <img src="../assets/cnodejs_light.svg" alt="">
      </router-link>
      <ul>
        <li>
          <router-link :to="{name:'root'}">
         首页
         </router-link>
        </li>
        <li><a href="https://cnodejs.org/getstart">新手入门</a></li>
        <li><a href="https://cnodejs.org/api">API</a></li>
        <li><a href="https://github.com/login/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Fcnodejs.org%2Fauth%2Fgithub%2Fcallback&client_id=0625d398dd9166a196e9">关于</a></li>
        <li><a href="https://cnodejs.org/about">注册</a></li>
        <li><a href="https://cnodejs.org/signin">登录</a></li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  .header{background: #444444;height: 4rem;}
  .header img{max-width: 10rem;margin-left: 5rem;margin-top: 0.8rem;}
  .header>ul{list-style: none;position: absolute;right: 5rem;top:0.4rem;font-size: 1.4rem;}
  .header>ul>li{display: inline-block;padding-left: 20px;}
  .header>ul>li>a{text-decoration: none;color: #ccc;}
  .header>ul>li>a:hover{color: #FFFFFF;}
</style>
