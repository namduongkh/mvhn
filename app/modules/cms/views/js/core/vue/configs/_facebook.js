import Vue from 'vue';
const vue_fb = {}
vue_fb.install = function install(Vue, options) {
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) { return }
        js = d.createElement(s)
        js.id = id
        js.src = "//connect.facebook.net/en_US/sdk.js"
        fjs.parentNode.insertBefore(js, fjs)
        console.log('setting fb sdk')
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function onSDKInit() {
        FB.init(options)
        FB.AppEvents.logPageView()
        Vue.FB = FB
        window.dispatchEvent(new Event('fb-sdk-ready'))

        FB.getLoginStatus(function(response) {
            window.dispatchEvent(new CustomEvent('fb-sdk-get-login-status-success', { 'detail': response }))
        })
    }
    Vue.FB = undefined
}

export default vue_fb;