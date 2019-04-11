let url = 'http://localhost:3000'
let dadjoke = 'https://icanhazdadjoke.com/'
axios.defaults.headers.common['Accept'] = 'application/json' // for all requests

new Vue({
  el: '#app',
  data: {
    message: "ey",
    isShown: true,
    loginEmail: '',
    loginPassword: '',
    homeJoke: ''
  },
  created() {
    axios.get(dadjoke)
      .then(({ data }) => {
        this.homeJoke = data.joke
      })
      .catch(err => {
        swal(err.message)
      })
  },
  methods: {
    login: function () {
      let obj = {
        email: this.loginEmail,
        password: this.loginPassword
      }
      axios.post(url + '/login', obj)
        .then(({ data }) => {
          window.localStorage.setItem('token', data.access_token)
          swal('berhasil masuk')
          this.isShown = !this.isShown
        })
        .catch(err => { console.log(err); swal(err.message) })
    },
    addToFavorites: function () {
      axios.post(url + '/favorites', {joke: this.homeJoke}, {
        headers: {
          access_token: window.localStorage.token
        }
      })
        .then(data => {
          console.log('berhasil add fav')
          console.log(data)
        })
        .catch(err => {
          console.log(err)
          swal(err.message)
        })
    }
  },

})