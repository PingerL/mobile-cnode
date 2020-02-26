<template>
  <div id="app">
    <!-- 顶部 logo 区域 -->
    <header>
      <div class="logo">
        <img src="../src/assets/cnodejs_light.svg" alt />
      </div>
    </header>
    <!-- 中间内容区域 -->
    <router-view></router-view>
    
    
  </div>
</template>

<style lang="scss"  >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header {
  background-color: #444;
  color: rgba(255, 255, 255, 0.5);
  .logo {
    text-align: center;
    height: 40px;
    padding: 10px;
    img {
      width: 110px;
    }
  }
}
</style>
