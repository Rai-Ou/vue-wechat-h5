<template>
    <div id="app">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
    font-family: PingFang SC;
}
.mt-8 {
    margin-top: 8px !important;
}
.mt-27 {
    margin-top: 27px !important;
}
.mt-44 {
    margin-top: 44px !important;
}
.mt-95 {
    margin-top: 95px !important;
}
.mt-80 {
    margin-top: 80px !important;
}

.pt-70 {
    padding-top: 70px !important;
}
.pt-85 {
    padding-top: 85px !important;
}
.pb-60 {
    padding-bottom: 60px !important;
}
.pb-70 {
    padding-bottom: 70px !important;
}
.color-red {
    color: red;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
