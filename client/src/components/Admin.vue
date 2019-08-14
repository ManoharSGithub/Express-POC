<template>
  <!-- eslint-disable -->
  <div class="container">
    <div class="jumbotron mt-5">
      <h1 class="h3 mb-3 font-weight-normal">Total Users</h1>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in totalRecords" v-bind:key="item.id">
            <td>{{item.first_name}}</td>
            <td>{{item.last_name}}</td>
            <td>{{item.email}}</td>
            <td>
              <button class="btn btn-danger" v-on:click="deleteRecord(item)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      totalRecords: []
    }
  },
  methods: {
    getAllRecords () {
      axios
        .get('users/admin')
        .then(res => {
          this.totalRecords = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteRecord (item) {
      console.log(item)
      axios
        .delete('users/admin/' + item._id)
        .then(res => {
          console.log(res)
          axios.get('users/admin').then(res => {
            this.totalRecords = res.data
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  beforeMount () {
    this.getAllRecords()
  }
}
</script>
