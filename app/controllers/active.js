const Active=require('../models/active');
class  ActiveCtl{
    async find(ctx){
        const { phone } = ctx.request.body;
        ctx.body= await Active.findOne({phone});
    }
    async create(ctx){
        const {phone}=ctx.request.body;
        const {name}=ctx.request.body;
        // const repeatUser=await Active.findOne({name});
        // if(repeatUser){ctx.throw(409,'用户已经存在')}
        const active=await new Active(ctx.request.body).save();
        ctx.body=active;
    }
    async update(ctx){
        const {phone} =ctx.request.body
        const active=await Active.findOneAndUpdate({phone},ctx.request.body,{new:true})
        if(!active){
            ctx.throw(404,'文件不存在！')
        }
        ctx.body=active;
    }
    async del(ctx){
        const { phone } = ctx.request.body;
        const Active= await Active.findOneAndRemove({phone});
        if(!Active){ctx.throw(404,'文件不存在！')}
        ctx.status=204;

    }
};

module.exports=new ActiveCtl();