<template>
  <div id="app">
    <h1>联系人管理器</h1>
    <div class="add-contact">
      <label for="name">姓名：</label>
      <input type="text" id="name" v-model="newContact.name" />
      <label for="phone">电话：</label>
      <input type="tel" id="phone" v-model="newContact.phone" />
      <button @click="addContact">添加联系人</button>
    </div>
    <div class="search-contact">
      <label for="search">查询联系人：</label>
      <input type="text" id="search" v-model="queryContact" @input="filterContacts" />
      <label for="phone">测试：</label>
      <input type="tel" id="phone" v-model="test" />
      <button @click="queryContacts">查询联系人</button>
    </div>
    <div class="contact-table">
      <table>
        <thead>
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(contact, index) in filteredContacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.phone }}</td>
          <td><button @click="deleteContact(contact.id)">删除</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: [],
      newContact: {
        name: '',
        phone: '',
      },
      queryContact:'',
      test: ' ',
      nextId: 1, // 用于生成唯一ID
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.queryContact.toLowerCase())
      );
    },
},
  methods: {
    addContact() {
      const _self=this
      this.$http.post("/contact/add/"+this.newContact.name+"/"+this.newContact.phone).then(resp => {
        this.queryContacts()
      })
    },
    deleteContact(index) {
      const _self=this
      this.$http.delete("/contact/delete/"+index).then(resp => {
        this.queryContacts()
      })
    },
    queryContacts() {
      const _self = this;
        this.$http.get("/contact/get/"+_self.queryContact).then(resp => {
          this.contacts= resp.data.data
        })
    },
    filterContacts() {
      // 此方法已在computed属性中处理，因此这里不需要额外逻辑
    },
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.add-contact, .search-contact {
  margin: 20px 0;
}

.contact-table {
  overflow-x: auto; /* 允许表格水平滚动 */
  max-width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
