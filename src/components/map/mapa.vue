<template>
    <div id="mapa" style="height: 960px;">

    </div>
</template>

<script>
    export default {
        name: "mapa",
        props:['list','lng','lat','zoom'],
        data(){
            return {
                map:null,
                overlayGroups:[],
                curTk:{},
                curTKMarker:null,
                clickNum:0,
            }
        },
        mounted(){
            this.initMap()
        },
        methods:{
            // 初始化
            initMap(){
                this.map = new AMap.Map('mapa', {
                    center: [this.lng, this.lat],
                    layers: [
                        // 卫星
                        new AMap.TileLayer.Satellite(),
                        // 路网
                        new AMap.TileLayer.RoadNet()
                    ],
                    zoom:this.zoom
                });
                this.map.on('zoomend', ()=>{
                    this.addMapItem();
                });
                this.addMapItem()
                //限制地图滚动
                // var bounds = this.map.getBounds();
                // this.map.setLimitBounds(bounds);
                // this.map.setFitView()
            },
            addMapItem(){
                // 移除覆盖物群组
                this.map.clearMap();

                this.list.forEach((item)=>{
                    if (item.isShow){
                        var marker = new AMap.Marker({
                            map:this.map,
                            position: new AMap.LngLat(item.lng, item.lat),
                            icon: item.imgUrl,
                        });
                        marker.on('click', ()=>{
                            this.clickNum = 0
                            if (this.curTKMarker){
                                this.map.remove(this.curTKMarker)
                                if (item.type==this.curTk.type){
                                    this.curTKMarker = null;
                                }else{
                                    this.curTKMarker = new AMap.Marker({
                                        map: this.map,
                                        position: new AMap.LngLat(item.lng+(98.304/(Math.pow(2, this.map.getZoom()))), item.lat),
                                        icon: item.tkImg,
                                    });
                                    this.curTk = item
                                }
                            } else {
                                this.curTKMarker = new AMap.Marker({
                                    map: this.map,
                                    position: new AMap.LngLat(item.lng+(98.304/(Math.pow(2, this.map.getZoom()))), item.lat),
                                    icon: item.tkImg,
                                });
                                this.curTk = item
                            }

                            if (this.curTKMarker&&item.type!=0) {
                                this.curTKMarker.on('click',()=>{
                                    this.clickNum++
                                    this.curTKMarker.setIcon(this.clickNum%2? item.tkImgDetail:item.tkImg)
                                })
                            }
                        });
                    }
                })
            },
            showTk(){
                console.log(this.curTk)
            }

        },
        watch:{
            list:{
                handler(newVal, oldVal){
                   if (newVal&&oldVal){
                        this.addMapItem()
                   }
                },
                deep: true,
                immediate: true
            },
        }
    }
</script>

<style scoped >

</style>