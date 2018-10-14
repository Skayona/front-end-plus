import router from "../../router";

export default {
  name: 'login',
  components: {},
  props: [],
  data() {
    return {
      login: '',
      error: false
    }
  },
  computed: {

  },
  mounted() {
    // console.log(this.$route);
  },
  methods: {
    onLogin() {
      switch (this.login) {
        case 'Petya':
        case 'Vasya':
          this.error = false;
          router.push(`/courses/${this.login.toLowerCase()}`);
          break;
        default:
          this.error = true;
          break;
      }
    }
  }
}