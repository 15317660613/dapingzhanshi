const state = {
    workTags: {
        list: [
            {
                name: "Home",
                tagname: '首页',
                path: '/home',
                meta:{
                    name:'首页'
                }
            }
        ],
        current: {
            name: "Home",
            tagname: '首页',
            path: '/home',
            meta:{
                name:'首页'
            }
        }
    },
    activePages: []
}
const mutations = {
    workTagsRemove(state, { tag: tag, router: router }) {
        // 关闭标签
        let ind = state.workTags.list.findIndex(s => s.name === tag.name)
        let pageIndex = state.activePages.findIndex( item => item === tag.name)
        if (ind > -1) {
            // 清理 keep alive - start
            // 清理 keep alive - end
            state.workTags.list.splice(ind, 1)
            state.activePages.splice(pageIndex,1)
        }
        if (tag.name === state.workTags.current.name && state.workTags.list.length > 0) {
            // 是当前页，返回上一页
            router.push(state.workTags.list[state.workTags.list.length-1].path);
        }
    },
    workTagsRoute(state, p) {
        let ind = state.workTags.list.findIndex(s => s.name === p.name)
        if (ind > -1) {
            // 标签已存在
            state.workTags.current = state.workTags.list[ind]
        } else {
            // 标签不存在，现在新建
            state.workTags.list.push(p)
            state.workTags.current = p
            state.activePages.push(p.name)
        }
    }
    ,
    initWorkTags(state, payload) {
        state.workTags = {
            list: [
                {
                    name: "Home",
                    tagname: '首页',
                    path: '/home',
                    meta:{
                        name:'首页'
                    }
                }
            ],
            current: {
                name: "Home",
                tagname: '首页',
                path: '/home',
                meta:{
                    name:'首页'
                }
            }
        }
        console.log(state.workTags)
        state.activePages = [];
    }
};
const actions = {
    workTagsRemove({ commit }, p) {
        commit('workTagsRemove', p)
    },
    workTagsRoute({ commit }, p) {
        commit('workTagsRoute', p)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}