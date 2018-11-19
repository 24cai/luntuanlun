const LOGIN_SUCCESS='LOGIN_SUCCESS';
const OUT_SUCCESS='OUT_SUCCESS';

const userDo={
    //登录成功
    loginSuccess:val=>{
        return{
            isLogin:val,
            type:LOGIN_SUCCESS
        }
    },
    outSuccess:val=>{
        return{
            isLogin:val,
            type:OUT_SUCCESS
        }
    }
};

export  default  userDo;