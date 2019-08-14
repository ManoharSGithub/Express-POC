<template>
  <!-- eslint-disable -->
  <div class='container'>
    <div class='row'>
      <div class='col-md-6 mt-5 mx-auto'>
        <form v-on:submit.prevent='login'>
          <h1 class='h3 mb-3 font-weight-normal'>Please Sign in</h1>
          <div class='form-group'>
            <label for='email'>Email Address</label>
            <input
              type='email'
              v-model='email'
              class='form-control'
              name='email'
              placeholder='Enter Email'
              required
            />
          </div>
          <div class='form-group'>
            <label for='email'>Password</label>
            <input
              type='password'
              v-model='password'
              class='form-control'
              name='password'
              placeholder='Enter Password'
              required
            />
          </div>
          <button class='btn btn-lg btn-primary btn-block'>Sign in</button>
          <br />
          <p
            v-if='showError'
            class='text-danger'
          >Invalid Sign in. Please register if you are new user.</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'
export default {
  data () {
    return {
      email: '',
      password: '',
      showError: false
    }
  },

  methods: {
    login () {
      axios
        .post('users/login', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem('usertoken', res.data)
          this.email = ''
          this.password = ''
          console.log(res.data.error)
          if (res.data.error) {
            this.showError = true
          } else {
            this.emitMethod()
            router.push({ name: 'Profile' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>
