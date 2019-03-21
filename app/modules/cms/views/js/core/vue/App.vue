<template>
    <div>
        <Layout v-if="authUser && authUser.uid && authUser.uid.length"/>
        <LoginLayout v-else />
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import LoginLayout from './components/LoginLayout';
    import Layout from './components/Layout';

    export default {
        name: 'App',
        created() {},
        watch: {
            '$route'(to, from){
                if ((from.name == 'create_dynamicdata' || from.name == 'edit_dynamicdata') && to.name != 'dynamicdatas') {
                    this.$cookie.delete('dynamicdata-more-params');
                }
            }
        },
        mounted() {},
        computed: {
            ...mapGetters([
                'authUser'
            ]),
        },
        components: {
            LoginLayout,
            Layout
        }
    }
</script>

