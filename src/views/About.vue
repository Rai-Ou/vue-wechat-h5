<template>
    <div class="about">
        <img id="succes-img" src="@/assets/images/succes-img.png" alt="" />
        <img id="succes-text" src="@/assets/images/succes-text.png" alt="" />
        <div class="txt">
            感谢您的参与！
        </div>
        <div class="txt">
            稍后会有专门的业务人员与您联系
        </div>
    </div>
</template>
<style lang="scss" scoped>
.about {
    height: 100vh;
    text-align: center;
    background: #e7f5ff;
    padding-top: 186px;
    box-sizing: border-box;
    #succes-img {
        width: 486px;
        height: 309px;
        margin-bottom: 40px;
    }
    #succes-text {
        width: 470px;
        height: 84px;
        margin-bottom: 30px;
    }
    .txt {
        font-size: 30px;
        line-height: 50px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #808080;
    }
}
</style>
