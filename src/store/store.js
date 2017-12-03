export default {
    getAllCarts(){
        var result = localStorage.getItem("cartinfo");
        result = result ? JSON.parse(result) : [];
        return result;
    },
    getCartsInfo(id){
        var carts = this.getAllCarts();
        var temp = carts.filter(v => {
            return v.id == id;
        })

        temp = temp.length > 0 ? temp[0] : null;
        return temp;
    },
    getAllCount(){
        var carts = this.getAllCarts();
        var result = 0;
        carts.forEach(v => result += v.count);
        return result;
    },
    addToCarts(cart){
        var carts = this.getAllCarts();

        //判断之前的数组里是否有和当前商品id相同的购物车对象
        var temp = carts.filter(v => {
            return v.id == cart.id;
        })
        //如果有的话
        if(temp.length > 0){
            temp[0].count += cart.count;
        }else{
            //如果没有的话
            carts.push(cart)
        }

        //将更新后的数组转成字符串重新存储到localstorage中去
        localStorage.setItem("cartinfo", JSON.stringify(carts));
    },
    getIds(){
        var carts =this.getAllCarts();
        var ids = carts.map(v => v.id);
        return ids.join(",");
    },
    getCountById(id){
        var carts = this.getAllCarts();
        var temp = carts.filter(v => v.id == id);
        if(temp.length > 0){
            return temp[0].count;
        }else{
            return 0;
        }
    },
    updateCartById(cart){
        var carts = this.getAllCarts();
        var temp = carts.filter(v => v.id == cart.id);
        if(temp.length > 0){
            temp[0].count = cart.count;
        }
        localStorage.setItem("cartinfo", JSON.stringify(carts));
    },
    deleteById(id){
        var carts = this.getAllCarts();
        var index = -1;
        carts.forEach((v, i)=> {
          if(v.id == id){
            index = i;
          }
        })
        carts.splice(index, 1)
        localStorage.setItem("cartinfo", JSON.stringify(carts));
    }
}