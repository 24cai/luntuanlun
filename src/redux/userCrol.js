const defaultState={
    isLogin:true
}
const user =(state=defaultState,action)=>{
    switch (action.type){
        case 'LOGIN_SUCCESS':
            return {...state,isLogin:action.isLogin}
        case 'OUT_SUCCESS':
            return {...state,isLogin:action.isLogin}
        default:
            return state
    }
}

export default user;