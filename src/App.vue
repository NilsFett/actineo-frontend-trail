<template>
  <header>
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <h1>Globetrotter's Travel Log</h1>
  </header>
  <nav>
    <router-link to="/">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      Home
    </router-link>
    <router-link to="/log">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
      Log
    </router-link>
    <router-link to="/statistics">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
      Statistics
    </router-link>
  </nav>
  <main>
    <router-view/>
  </main>
</template>

<style lang="scss">
*{
  margin:0px;
  padding:0px;
    box-sizing: border-box;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
h1{
  font-weight: normal;
}
p{
  line-height:36px;
}
header {
  width:100%;
  background-color: #e38420;
  color: #fff;
  display: flex;
  position: fixed;
  top:0px;
  z-index:5;
  height:80px;
  svg {
    height:50px;
    margin:10px;
  }
  h1 {
    line-height: 70px;
    margin-left:10px;
  }
}
nav {
  position: fixed;
  left:0px;
  height:100%;
  width:200px;
  background-color: #252529;
  a {
    display: block;
    color: #fff;
    text-decoration: none;
    margin:5px;
    padding:5px;
    svg {
      height:20px;
      display:inline;
      line-height:30px;
      position: relative;
      top:4px;
    }
  }
  a.router-link-active {
    background-color: #616164;
  }
}
main{
  margin:80px 0 0 200px;
  padding:20px;
}
i.pi{
  cursor: pointer;
}

.overlay-bg, .overlay-frame{
  position: fixed;
  height:100%;
  width:100%;
  top:0px;
  left:0px;
  background-color: rgb(100,100,100,0.5);
}

.overlay-frame{
  z-index:10;
  display:flex;
  align-items: center;
  justify-content: center;
  h3{
    font-weight: normal;
  }
  >div{
    background-color: #fff;
    padding:20px;
    p{
      text-align:right;
      span{
        margin-left:10px;
        color:#2489e5;
        cursor: pointer;
      }
    }
    div.error, .error input{
      border-color:red;
    }
  }
  .p-calendar{
    margin:20px;
  }
}
</style>
