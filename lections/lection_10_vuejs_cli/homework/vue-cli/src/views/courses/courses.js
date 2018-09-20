import course from '../../components/course/index';
// import { mapState, mapActions } from 'vuex'

export default {
  name: 'courses',
  components: {
    course
  },
  props: [],
  data () {
    return {
      studend: this.$route.params.name,
    }
  },
  computed: {
    courses() {
      return this.$store.state.lections;
    }
  },
  mounted () {
  },
  methods: {

  }
}
