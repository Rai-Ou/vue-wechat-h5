<template>
    <div class="home">
        <van-dropdown-menu>
            <van-dropdown-item
                v-model="value1"
                :options="option1"
                @change="getList"
            />
            <van-dropdown-item
                v-model="value2"
                :options="option2"
                @change="getList"
            />
        </van-dropdown-menu>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
        >
            <div class="item" v-for="(item, index) in list" :key="index">
                <div class="img-box">
                    <van-image
                        width="100"
                        height="100"
                        fit="contain"
                        :src="item.image"
                    />
                </div>
                <div class="info">
                    <div class="name">{{ item.name }}</div>
                    <div class="address">{{ item.address }}</div>
                    <div>
                        <span class="price">¥{{ item.gasPrice }}</span>
                        <span class="national-price"
                            >油站价：¥{{ item.nationalGasPrice }}</span
                        >
                    </div>
                </div>
                <div class="nav" @click="navTo(item)">
                    <!-- <van-icon size="40" name="logistics" /> -->
                    <van-image
                        width="40"
                        height="40"
                        src="http://wanteng-imgs.oss-cn-qingdao.aliyuncs.com/distance.png"
                    />
                    <div v-if="item.distance">
                        {{ item.distance + item.distanceUnit }}
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
import Vue from "vue";
import { getNationalPrice, getMemberGasStationList } from "@/api/ipcshopping";

import {
    DropdownMenu,
    DropdownItem,
    List,
    Image as VanImage,
    Icon
} from "vant";

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(List);
Vue.use(VanImage);
Vue.use(Icon);

export default {
    name: "Home",
    components: {},

    data() {
        return {
            value1: "92#",
            value2: "DISTANCE",
            option1: [],
            option2: [
                { text: "价格优先", value: "PRICE" },
                { text: "距离优先", value: "DISTANCE" }
            ],
            locations: null,
            list: [],
            loading: false,
            finished: false
        };
    },
    created() {
        this.map();
    },
    mounted() {
        this.getNavList();
    },
    methods: {
        map() {
            var geolocation = new qq.maps.Geolocation(
                "YAQBZ-6RP64-E64US-DH45M-O2IFQ-3YBCJ",
                "myapp"
            );
            geolocation.getLocation(this.showPosition, this.errCallback);
        },
        showPosition(position) {
            this.locations = position;
            this.getList();
        },
        errCallback() {
            this.locations = { lat: null, lng: null };
            this.getList();
        },
        getList() {
            getMemberGasStationList({
                gasNumber: this.value1,
                latitude: this.locations.lat,
                longitude: this.locations.lng,
                sort: this.value2
            }).then(res => {
                this.list = res.data;
                this.loading = false;
                this.finished = true;
            });
        },
        getNavList() {
            getNationalPrice().then(res => {
                this.option1 = [];
                res.data.forEach(element => {
                    let tmp = {
                        text: element.gasNumber,
                        value: element.gasNumber
                    };
                    this.option1.push(tmp);
                });
            });
        },
        navTo(item) {
            //微信导航
            window.location.href = `https://uri.amap.com/navigation?from=${this.locations.lng},${this.locations.lat},我的位置&to=${item.longitude},${item.latitude},${item.name}&mode=car&policy=0&src=mypage&coordinate=gaode&callnative=1`;
            // window.location.href = `https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${item.latitude},${item.longitude};title:${item.name};addr:${item.address}&key=YAQBZ-6RP64-E64US-DH45M-O2IFQ-3YBCJ&referer=myapp`;
        }
    }
};
</script>
<style lang="scss" scoped>
.item {
    display: flex;
    justify-content: space-between;
    padding: 26px;
    font-size: 24px;
    border-bottom: 1px solid #ccc;
    .img-box {
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        align-content: center;
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1;
        padding-left: 30px;
        width: 300px;
        .name {
            font-size: 34px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .address {
            font-size: 24px;
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .price {
            font-size: 30px;
            color: red;
            padding-right: 30px;
        }
        .national-price {
            color: #666;
            text-decoration: line-through;
        }
    }
    .nav {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 100px;
        align-items: center;
    }
}
</style>
