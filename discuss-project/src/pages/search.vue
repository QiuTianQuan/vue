<template>
    <div>
        <router-view></router-view>
        搜索
        <Mynav/>
    </div>
</template>

<script>
import Mynav from '@/components/mynav'
export default {
    components:{Mynav }
}
</script>
