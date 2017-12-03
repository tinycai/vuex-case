<template>
  <div class="number-box">
      <button class="minus-btn" @click="minus">-</button>
      <input type="text" id="input-box" :value="number">
      <button class="plus-btn"  @click="plus">+</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            number: 0
        }
    },
    created(){
        this.number = this.value || 0;
    },
    methods:{
        minus(){
            if(this.number > this.min){
                var step = this.step || 1;                
                this.number -= step;
            }
        },
        plus(){
            if(this.number < this.max){
                var step = this.step || 1;
                this.number += step;
            }
        }
    },
    props: ["min", "max", "step", "value", "goodsid"],
    watch: {
        number(){
            //告诉外面number变化了
            this.$emit("input", this.number);
        }
    }
}
</script>

<style scoped> 
.number-box{
    display: inline-block;
    width: 120px;
    height: 30px;
    vertical-align: middle;
}

.number-box input,button{
    float: left;
    height: 100% ;
}


#input-box{
    margin: 0;
    padding: 0;
    text-align: center;
    width: 40px;
}
</style>
