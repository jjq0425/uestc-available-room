var classroom = new Vue({
    el: '#classroom',
    data: {
        class_list: [],
        classroom_id: '',
        week: 8,
        section: '',
        xqj: 1,
        classroom_is_available: '',
        start:7,
        end:8,
        building:[],
        available:[],
        building_name:'二教',
    },

    methods: {
        allClassroom: function () {
            var that=this;
            axios({
                url:'https://studyapi.uestc.edu.cn/api/pub/exp/school/data',
                method:'post',
                data:{"type":"allclassroom","data":[{}]},
                timeout: 1000,
                headers: 'Content-Type: application/json'
            }).then(function (response) {
                that.class_list = response.data.data;
                console.log(that.class_list);
            }).catch(function (error) {
                console.log(error);
            })
        },
        searchClassroom: function () {
            var that = this;
            axios({
                url: 'https://studyapi.uestc.edu.cn/api/pub/exp/school/data',
                method: 'post',
                data: {"type":"thisweek_courseschedule","data":[{"room_name":that.classroom_id,"qqdjz":that.week}]},
                timeout: 1000,
                headers: 'Content-Type: application/json'
            }).then(function (response) {
                console.log(response.data);
            }).catch(function (err) {
                console.log(err);
            })
            
        
        },


        //查询所有二教的可用教室
        async search_special_building () {
            var that = this;
            // var i=0;
            axios({
                url: 'https://studyapi.uestc.edu.cn/api/pub/exp/school/data',
                method: 'post',
                data: {"type":"allclassroom","data":[{}]},
                // timeout: 1000,
                headers: 'Content-Type: application/json',
                async : false,
            }).then(function (response) {
                
                for(var k=0;k<that.class_list.length;k++){
                    if(that.class_list[k].building==that.building_name){
                        that.building.push(that.class_list[k]);
                    }
                }//查找需要查找的所有教室列表并且存入building数组中
                // console.log(that.building[0]);
                // that.$options.methods.find_available_classroom();
                
                console.log(that.building);
                

            }
            ).catch(function (err) {
                console.log(err);
            }
            )
        },



        async find_available_classroom () {
            this.available=[];
            var that = this;
            for(i=0;i<that.building.length;i++){
                //使得axio调用后再执行for
                var that=this;
                var tmp_room_name=that.building[i].building+that.building[i].room_name;
                // console.log(that.building[0]);
                // console.log(tmp_room_name);
                await axios({
                    url: 'https://studyapi.uestc.edu.cn/api/pub/exp/school/data',
                    method: 'post',
                    data: {"type":"thisweek_courseschedule","data":[{"room_name":that.building[i].building+that.building[i].room_name,"qqdjz":that.week}]},
                    
                    // timeout: 1000,
                    headers: 'Content-Type: application/json',
                    saync:false,
                }).then(function (response) {
                    console.log(response.data);
                    
                    var is_avail=true;
                    
                    for(var j=0;j<response.data.data.length+1;j++){
                        if(j<response.data.data.length&&response.data.data[j].xqj==that.xqj&&((response.data.data[j].ksjc>=that.start&&response.data.data[j].jsjc<=that.end)||(response.data.data[j].ksjc<=that.end&&response.data.data[j].ksjc>=that.start)||(response.data.data[j].jsjc<=that.end&&response.data.data[j].jsjc>=that.start))){
                            is_avail=false;
                            
                        }
                        else if(j==response.data.data.length){
                            if(is_avail){
                                that.available.push(tmp_room_name);
                                console.log(tmp_room_name);
                            }
                        }
                        else{
                            continue;
                        }
                        
                    }
                    
                    
                    
                    

                }).catch(function (err) {
                    console.log(err);
                })

            }//将所有教室名字存入available数组中
        },


        

    }
})