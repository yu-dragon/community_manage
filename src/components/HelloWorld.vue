<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li>hehe</li>
      <li>hahaha</li>
      <li>xixixi</li>
      <li>jasdaskfj</li>
      <li>父节点是尖峰时刻</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
