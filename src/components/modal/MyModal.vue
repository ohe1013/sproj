<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="flex">
                <div @click="imageChange(img1)">
                  <a><img :class="{imgR : img1T}" class="cursor-pointer w-200p h-200p margin-right-50p border-rad-50" :src=img1></a>
                </div>
                <div @click="imageChange(img2)">
                  <a><img :class="{imgR : img2T}" class="cursor-pointer w-200p h-200p margin-right-50p border-rad-50" :src=img2></a>
                </div>
                <div @click="imageChange(img3)">
                  <a><img :class="{imgR : img3T}" class="cursor-pointer w-200p h-200p border-rad-50" :src=img3></a>
                </div>
              </div>
            </slot>
          </div>

          <div class="float-center">
            <slot name="footer">
              <button class="modal-default-button background-trans cursor-pointer  " @click="select()" type="submit">
                선택완료
              </button>
				      <br>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
	data() {
		return{
      form:'',
      img: '',
      img1T:false,
      img2T:false,
      img3T:false,
			img1:'https://my-hg-bucket.s3.ap-northeast-2.amazonaws.com/1629958768095.jpg',
			img2:'https://my-hg-bucket.s3.ap-northeast-2.amazonaws.com/1629356432588.jpg',
			img3:'https://my-hg-bucket.s3.ap-northeast-2.amazonaws.com/1629356424657.jpg',
		}
	},
	methods :{
		imageChange: function(item) {
      this.img = item;
      if (item =="https://my-hg-bucket.s3.ap-northeast-2.amazonaws.com/1629958768095.jpg"){
        this.img1T = true;
        this.img2T = false;
        this.img3T = false;
      }
      else if (item == "https://my-hg-bucket.s3.ap-northeast-2.amazonaws.com/1629356432588.jpg"){
        this.img1T = false;
        this.img2T = true;
        this.img3T = false;
      }
      else if (item == "https://my-hg-bucket.s3.ap-northeast-2.amazonaws.com/1629356424657.jpg") {
        this.img1T = false;
        this.img2T = false;
        this.img3T = true;
      }
		},
		select : function() {
			var sel=confirm("선택한 이미지로 진행하시겠습니까?")
			if (sel) {
        this.$emit('close');
        this.$emit('image',this.img);
			}
		}
	}
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
}

.imgR {
  border:2px solid red;
}


</style>