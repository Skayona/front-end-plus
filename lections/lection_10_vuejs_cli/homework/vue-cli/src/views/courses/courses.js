import course from '../../components/course/index';
// import { mapState, mapActions } from 'vuex'

export default {
  name: 'courses',
  components: {
    course
  },
  props: [],
  data() {
    return {
      studend: this.$route.params.name,
    }
  },
  created() {
    this.$store.dispatch('getData', this.studend);
  },
  computed: {
    courses() {
      return this.$store.getters.getLections;
    }
  },
  mounted() {},
  updated() {},
  methods: {
  }
}