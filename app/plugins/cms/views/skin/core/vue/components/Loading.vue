<template>
    <div id="loading-component">
        <div  class="page-center" style="height: 100vh;">
            <div class="page-center-in">
                <div class="container-fluid">
                    <div class="loader"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Loading'
    }
</script>
<style lang="scss">
    #loading-component{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        background: rgba(0,0,0,.2);
    }
    .loader {
        margin: 0 auto;
        border: 10px solid #f3f3f3;
        border-top: 10px solid #3498db;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin_loading .9s linear infinite;
    }

    @keyframes spin_loading {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
