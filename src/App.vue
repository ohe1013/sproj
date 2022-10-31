<template>
  <div id="app">
    <Header />

    <div class="container">
      <router-view />
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  color: #43b984;
}
h2{
  color:#43b984;
  }

table {
  width: 100%;
  border-collapse: collapse;
}
.wrap {
  width: 100%;
}
.float-left {
  float:left;
}
.container {
  margin: 0 auto;
  max-width: 100%;
}
.container-small {
  margin: 0 auto;
  max-width: 768px;
}
.margin-0 {
  margin:0;
}
a {
  text-decoration: none;
}
.margin-top-5p{
  margin-top:5px;
}
.margin-top-20p{
  margin-top:20px;
}
.btn {
  padding: 10px;
  background: #34445c;
  color: #fff;
}
.btn-padding-4-g{
  padding: 4px 4px 4px 4px;
  color: #fff;
  background: #43b984;
  margin-right:5px;
  cursor: pointer;
}
.btn-padding-4-r{
  padding: 4px 4px 4px 4px;
  color: #fff;
  background: red;
  cursor: pointer;
}
.btn2 {
  padding: 10px;
  background: #34445c;
  color: #fff;
  line-height: 42px;
  margin-bottom: 20px;
}
.btn3-1 {
  border:0px;
  background:transparent;
  cursor:pointer;
  font-weight: bold;
}
.btn3-2{
  border:0px;
  background:transparent;
  cursor:pointer;
}
.padding-0{
  padding:0 !important;
}
.padding-2-5{
  padding: 2px 5px 2px 5px;
}
.btn-padding-3 {
  padding: 3px;
  background: #34445c;
  color: #fff;
}
.btn-padding-5 {
  padding: 5px;
  background: #34445c;
  color: #fff;
}
.btn-green {
  padding: 10px;
  background: #43b984;
  color: #fff;
}
.btn-green-border-0 {
  padding: 10px;
  background: #43b984;
  color: #fff;
  border: 0
}
.btn-gray-border-0 {
  padding: 10px;
  background: #858585;
  color: #fff;
  line-height: 30px;
  border: 0
}
.margin-right-10p{
  margin-right: 10px;
}

.background-trans{
  background-color:transparent;
}
.border0 {
  border:0;
}
.outline0 {
  outline:0;
}
.color-w {
  color:white;
}
.position-rel{
  position:relative
}
.bottom-55p {
  bottom: 55px;
}
.left--23p{
  left:-23px;
}
.font-15p{
  font-size: 15px;
}
.justfiy-start{
  justify-content: flex-start;
}
.error-box {
  display: block;
  margin: 9px 0 -2px;
  font-size: 12px;
  line-height: 14px;
  color: red;
}
.font-reply-id{
  color:#43b984;
  font-size:15px;
}

.font-reply-time{
  font-size:15px;
}

.mx-auto{
  margin:0 auto;
}
.margin-top-10p {
  margin-top:10px;
}
.margin-top-30p{
  margin-top:30px;
}
.margin-top-100p {
  margin-top:100px;
}
.container-modify{
  min-height: 500px; 
}
.border-2 {
  border : 2px;
}
.border-blue {
  border: rgb(33, 150, 243);
}
.border-dotted {
  border-style: dotted;
}
.cursor-pointer {
  cursor: pointer;
}
.display-none {
  display: none;
}
.items-center{
  align-items: center;
}
.justify-center{
  justify-content: center;
}
.margin-right-30p{
  margin-right:30px;
}
.display-block{
  display:block
}
ul {
  list-style-type:none;
}
.flex{
  display: flex;
}
.w-full { 
  width: 100%;
}
.h-full {
  height: 100%;
}
.w-128p {
  width: 128px;
}
.h-128p {
  height: 128px;
}
.h-64p {
  height:64px;
}
.w-32p {
 	width: 32px;
}
.h-32p {
  height: 32px;
}
.w-16p {
  width: 16px;
}
.h-16p {
  height: 16px;
}

.img-a {
  border-radius: 64px;
  width: 128px;
  height: 128px;
}
.padding-10p {
  padding: 10px;
}
.font-size-13p {
  font-size: 13px;
}
.font-size-15p {
	font-size: 15px;
}
.font-size-20p{
  font-size:20px;
}
.font-size-40p{
  font-size:40px;
}
.font-size-30p{
  font-size:30px;
}
.cursor-pointer {
  cursor: pointer;
}
.border-1p-sol-gray {
	border:1px solid #bfbfbf;
}
.border-2p-sol-red {
	border:2px solid red;
}
.outline0{
	outline:0;
}
.background-red{
  background: rgb(197, 67, 67);
}
.background-white{
  background-color: white;
}
.background-trans{
	background: transparent;	
}
.font-weight-bold{
	font-weight: bold;
}
.color-green{
	color:#43b984;
}
.margin-auto-0 {
	margin: auto 0;
}
.flex-col {
	flex-direction: column;
}
.back-gray {
  background-color: #f9f9f9;
}
.justify-around {
	justify-content: space-around;
}
.w-200p {
	width:200px;
}
.visibility-hidden{
  visibility: collapse;
}
.flex{
	display:flex;
}
.border-rad-50{
	border-radius: 50%;
}
.w-70{
  width:70%;
}
.w-30{
  width:30% !important;
}
.h-30 {
	height: 30%;
}
.w-20 {
  width: 20%;
}
.h-70 { 
	height: 70%;
}

.h-200p{
  height:200px;
}
.margin-right-50p{
  margin-right: 100px;
}
.float-center{
  float:center;
}
.float-right {
  float:right;
}
.select-convert{
  font-size:15px;
  font-weight: bold;
  display: block;
  width: 20% ;
  height: 40px !important;
  color:white;
  border: solid 1px #dadada !important;
  padding: 10px;
  background: #43b984;
  box-sizing: border-box;
  cursor: pointer;
  margin-top:10px;
}
hr {
  margin:0
}
.unselect-convert {
  font-size:15px;
  font-weight: bold;
  display: block;
  width: 20% ;
  height: 40px !important;
  color:#43b984;
  border: solid 1px #dadada !important;
  padding: 10px;
  background: white;
  box-sizing: border-box;
  cursor: pointer;
  margin-top:10px;
}

.member-add {
  border-top: 1px solid #888;
}
.member-add th,
.member-add td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.member-add td {
  padding: 10px 10px;
  box-sizing: border-box;
}
.member-add td input {
  width: 100%;
  min-height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
}

.red {
  color : red;
  font-weight: bold;
}

.error-box {
  display: block;
  margin: 9px 0 -2px;
  font-size: 12px;
  line-height: 14px;
  color: red;
}

.overflow-hidden{
  overflow: hidden;
}
.row-group {
  overflow: hidden;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
.join-title {
  margin: 19px 0 8px;
  font-size: 14px;
  font-weight: 700;
}

.email-row {
  display: flex;
}
.ps-box {
  display: block;
  width: 100%;
  height: 51px;
  border: solid 1px #dadada;
  padding: 2px 4px 2px 2px;
  background: #fff;
  box-sizing: border-box;
}
.ps-box2 {
  display: block;
  width: 88%;
  height: 64px;
  line-height: 17px;
  font-size: 13px;
  margin-bottom: 20px;
  border: solid 1px #dadada;
  padding: 2px 4px 2px 2px;
  background: #fff;
  box-sizing: border-box;
  resize: none;
}
.w-8{
  width: 8% !important;
}
.w-10{
  width: 10% !important;
}
.ps-box-w20 {
  display: block;
  width: 20% ;
  height: 40px !important;
  line-height: 30px;
  border: solid 1px #dadada !important;
  padding: 3px 5px 3px 3px;
  box-sizing: border-box;
  margin-top:10px
}
.ps-box-w40 {
  display: block;
  width: 40% !important;
  height: 40px !important;
  line-height: 30px;
  border: solid 1px #dadada !important;
  padding: 3px 5px 3px 3px;
  box-sizing: border-box;
  margin-top:10px
}
.ps-box-150-border {
  display: block;
  width: 150px !important;
  height: 40px !important;
  line-height: 30px;
  border:none;
  box-sizing: border-box;
  margin-top :10px;
}
.ps-box-255-border {
    display: block;
    width: 455px !important;
    height: 40px !important;
    margin-right: 10px;
    line-height: 30px;
    border:none;
    box-sizing: border-box;
    margin-top :30px;
  }
.ps-box-464-border {
  display: block;
  width: 464px !important;
  height: 40px !important;
  line-height: 30px;
  border:none;
  box-sizing: border-box;
  margin-top :30px;
}
.email-box{
  width: 28%;
  height: 51px;
  border: solid 1px #dadada;
  padding: 3px 5px 3px 3px;
  background: #fff;
  box-sizing: border-box;
  vertical-align: top;
  margin-right: 1%; 
}
.email-box-select{
  width: 24%;
  height: 51px;
  border: solid 1px #dadada;
  padding: 3px 5px 3px 3px;
  background: #fff;
  box-sizing: border-box;
  vertical-align: top;
  margin-left: 1%; 
}
.error-next-box {
  display: block;
  margin: 9px 0 -2px;
  font-size: 12px;
  line-height: 14px;
  color: red;
}
.selects {
  height: 100%;
  padding: 10px 0px 10px 9px;
  margin-right: 10px;
}
.search-wrap {
  border: 1px solid #888;
  border-radius: 5px;
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
}
.search-wrap input {
  width: 60%;
  height: 36px;
  border-radius: 3px;
  padding: 0 10px;
  border: 1px solid #888;
}
.search-wrap .btn-search {
  display: inline-block;
  margin-left: 10px;
}
.margin-0-auto{
  margin: 0 auto;
}
.justify-between {
  justify-content: space-between;
}
.margin-left-5px{
  margin-left:5px;
}
.margin-left-1 {
  margin-left : 1%;
}
.margin-left-2 {
  margin-left :2%;
}
.margin-left-5 {
  margin-left : 5%;
}
.tb-list th {
  border-top: 1px solid #888;
}
.tb-list th,
.tb-list td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.tb-list td.txt-left {
  text-align: left;
}
.btn-right-wrap {
  text-align: right;
  margin: 10px 0 0 0;
}

.pagination {
  margin: 20px 0 0 0;
  text-align: center;
}
.first,
.prev,
.next,
.last {
  border: 1px solid #666;
  margin: 0 5px;
  background-color: #43b984;
  
}

.pagination span {
  display: inline-block;
  padding: 0 5px;
  color: #333;
}
.pagination a {
  text-decoration: none;
  display: inline-block;
  padding: 0 5px;
  
}
.black {
  color: black;
}
.first,
.last{
  color: white;
}
.bir-wrap {
	width : 100%;
	display : flex;
  text-align :right;
}
.bir-yy {
	width : 30%;
}
.bir-mm {
  margin-left: 5%;
	width: 30%;
  margin-right: 5%;
}
.bir-dd {
  width: 30%;
}
.tb-add {
  border-top: 1px solid #888;
}
.tb-add th,
.tb-add td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.tb-add td {
  padding: 10px 10px;
  box-sizing: border-box;
  text-align: left;
}
.tb-add td.txt_cont {
  height: 300px;
  vertical-align: top;
}

.btn-wrap {
  text-align: center;
  margin: 20px 0 0 0;
}
.btn-wrap a {
  margin: 0 10px;
}
.btn-add {
  background: #43b984;
}
.btn-delete {
  background: #f00;
}

.text-align-left{
  text-align: left;
}
.text-align-right{
  text-align: right;
}
.tb-add {
  border-top: 1px solid #888;
}
.tb-add th,
.tb-add td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.tb-add td {
  padding: 10px 10px;
  box-sizing: border-box;
}
.tb-add td input {
  width: 100%;
  min-height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
}
.tb-add td textarea {
  width: 100%;
  min-height: 300px;
  padding: 10px;
  box-sizing: border-box;
}
.btn-wrap {
  text-align: center;
  margin: 20px 0 0 0;
}
.btn-wrap a {
  margin: 0 10px;
}
.btn-add {
  background: #43b984;
}
.btn-mod {
  background: #43b984;	
}
.btn-delete {
  background: #f00;
}
</style>