<template>
    <div>
        <Slidebar/>
        <Navigator/>
        <Loading v-show="isLoading"/>
        <router-view :key="$route.path" v-show="!isLoading"/>
        <confirm/>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import Slidebar from './Slidebar';
    import Navigator from './Navigator';
    import Loading from './Loading';
    import confirm from './confirm';
    import notFound from './404';

    export default {
        name: 'Layout',
        computed: {
            ...mapGetters([
                'isLoading'
            ])
        },
        components: {
            Slidebar,
            Navigator,
            Loading,
            confirm,
            notFound
        }
    }
</script>