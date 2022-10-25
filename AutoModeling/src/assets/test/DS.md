数据结构

[
使用数组存储楼层
    {
        每一层都是一个对象，使用对象来描述一个层
        storeyName:"",
        stairs:{
            name:"楼梯"
        }
        room:[
            每一层也有许多房间，这里存储了这一层的所有房间
            {
                使用对象来描述每个房间
                roomName:"",
                icon:""
                points:[],
                ....
            }
        ]
        ....
    },
    {}
]


geometry
Geometry
loader
TextureLoader 文件加载器