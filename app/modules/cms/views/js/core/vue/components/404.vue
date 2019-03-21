<template>
    <div class="page-content">
        <link rel="stylesheet" href="adminassets/assets/startui/css/separate/pages/others.min.css">

        <div class="container-fluid">
            <div class="box-typical box-typical-full-height">
                <div class="add-customers-screen tbl">
                    <div class="add-customers-screen-in">
                        <div class="add-customers-screen-user">
                            <i class="fa fa-ban"></i>
                        </div>
                        <h2>Page not found</h2>
                        <p class="lead color-blue-grey-lighter">Please ensure that your link is correctly or you do not have permission to access this page </p>
                        <router-link style="margin: 0 0;" :to="{path: '/'}" class="btn">Go back</router-link>
                    </div>
                </div>
            </div><!--.box-typical-->
        </div><!--.container-fluid-->
    </div><!--.page-content-->
</template>
<script>
    export default {
        name: 'NotFound',
    }
</script>