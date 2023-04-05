# 基于飞书API的你电空闲教室查询

## 使用方法

直接访问 https://jjq419875574.github.io/uestc-available-room/ 填写相关信息即可完成查询



## API说明

此飞书API来自你电成电MOOC的API，该API为**公开**的状态。

具体可以在`飞书->工作台->成电飞书手册`中进行查阅



## 优势

1. 教务处的空闲教室查询不关联学生活动、考试占用、补课占用、学生会开会等占用，只是关联教室上课情况
2. 教务处的空闲教室当遇到停调课的时候不会更新
3. 但是在这里，因为现在借阅教室都是通过飞书直接（或者辅导员通过飞书间接）发起，所以飞书中就会同步比如一些活动占用的数据，因此，**基于飞书的API更加准确！**



## 后记

这是我前面学习Vue随便乱写的，现在看上去真的很shit

最近事情多，忙完这一阵给更新一下。

### 更新小记

- 2023-04-05：使用Promise，不用点三个按钮了（当时还没学promise）