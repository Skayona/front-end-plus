import router from "../../router";

export default {
  name: 'login',
  components: {},
  props: [],
  data() {
    return {
      login: '',
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    onLogin() {
      switch (this.login) {
        case 'Petya':
          console.log('Petya');
          // router.push('/courses');
          break;
        case 'Vasya':
          console.log('Vasya');
          break;
        default:
          console.log('Error');
          return;



      }
    router.push(`/courses/${this.login}`);
    }
  }
}