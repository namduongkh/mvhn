<template>
    <nav class="side-menu">
        <ul class="side-menu-list">
            <li v-for="(menu, index) in menuFiltered" v-if="!menu.hidden" :key="index"
                :class="[ {'sub-menu': !menu.childrens}, menu.meta.color , {'opened': (index === index_route_active || menu.path === route.path), 'with-sub': menu.childrens }]">
                <router-link v-if="!menu.childrens" :to="{ path: menu.path }">
                    <i class="font-icon" :class="[ menu.meta.iconClass ]"></i>
                    <span class="lbl">{{ menu.meta ? menu.meta.title : menu.name }}</span>
                </router-link>
                <span v-if="menu.childrens">
                    <i class="font-icon fa " :class="[ menu.meta.iconClass, { 'active': menu.newNoti } ]" ></i>
                    <span class="lbl">{{ menu.meta ? menu.meta.title : menu.name }}</span>
                </span>
                <ul v-if="menu.childrens">
                    <li v-for="(sub_menu, sub_index) in menu.childrens" :key="sub_index" class="sub-menu"  v-if="!sub_menu.hidden">
                        <router-link :to="{ path: sub_menu.path }">
                            <span class="lbl">{{ sub_menu.meta.title || sub_menu.name }}</span>
                        </router-link>
                    </li>
                </ul>
            </li>

        </ul>
    </nav><!--.side-menu-->
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Slidebar',
        data: ()=>{
            return{
                listRoute: [],
                windowWidth: $(window).width()
            }
        },
        computed: {
            ...mapGetters([
                'menuItems',
                'route',
                'authUser',
            ]),
            menuFiltered(){
                let menus = JSON.parse(JSON.stringify(this.menuItems));
                let authUser = JSON.parse(JSON.stringify(this.authUser));

                function isHiddenMenu(menuItem){
                    if(menuItem.hidden)
                        return menuItem.hidden;
                    if(menuItem.meta && menuItem.meta.permission && menuItem.meta.permission.length){
                        let intersaction = menuItem.meta.permission.filter(value => -1 != authUser.scope.indexOf(value))
                        return intersaction.length === 0;
                    }
                    return false;
                }

                for (let idx = 0; idx < menus.length; idx++) {
                    menus[idx].hidden = isHiddenMenu(menus[idx]);
                    if(menus[idx].childrens){
                        for (let sub_idx = 0; sub_idx < menus[idx].childrens.length; sub_idx++) {
                            menus[idx].childrens[sub_idx].hidden = isHiddenMenu(menus[idx].childrens[sub_idx]);
                        }
                    }
                }
                return menus;
            },
            index_route_active(){
                let index = -1;
                for(let i in this.menuItems){
                    if(this.menuItems[i].hasOwnProperty('childrens')){
                        for(let j in this.menuItems[i]['childrens']){
                            if(this.route.path === this.menuItems[i]['childrens'][j]['path']){
                                index = i
                            }
                        }
                    }
                };
                return parseInt(index);
            }
        },
        watch: {
        },
   
        created(){
            let vm = this;
            $(window).on('resize', function() {
                vm.windowWidth = $(window).width();
            });
        },
        mounted(){
            let vm = this;
            $('.sub-menu').on('click', function(){
                if(vm.windowWidth <= 1056){
                    $('#btn-hide-slidebar').trigger('click');
                }
            });
        }
    }
</script>