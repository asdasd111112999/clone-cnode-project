<template>
  <div id="app">
    <Header></Header>
    <div id="body">
      <router-view name="main" class="main"></router-view>
      <router-view name="footer" class="footer"></router-view>
      <router-view name="side" class="side"></router-view>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header"
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style>
  html{font-size: 10px;background: #E1E1E1;max-width:100%;}
  html>body{margin: 0;}
  #body{padding: 1rem 5rem;height: auto;}
  #body>.main{width:75%;float: left;}
  #body>.side{width: 23%;float: right;}
  @media (max-width:1000px){
    #body>.main{width:88%;}
    #body>.side{display: none;}
  }
</style>
