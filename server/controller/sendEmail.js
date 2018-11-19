const nodemailer = require('nodemailer');

const sendeEail = async ctx=>{
    if(ctx.query[0]){
        let num = ctx.query[0];
        console.log(num)
        let verifyNum = '';
        for(i=0;i<6;i++){
            verifyNum += Math.floor(Math.random()*10);
        }
        let transporter = nodemailer.createTransport({
            service: 'qq',
            port:587,
            secureConnection: true,
            auth: {
                user:'1302569547@qq.com',
                pass: 'yvlyydokfihthdef',
            }
        });
        let mailOptions = {
            from:'1302569547@qq.com',
            to:num,
            subject: 'Hello',
            html: "您的："+ '<b>' + verifyNum + '</b>',
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
        console.log(verifyNum)
        ctx.body={
            success:true,
            message:'发送邮件成功',
            verifyNum
        }
    }
}

module.exports = {
    sendeEail
};
