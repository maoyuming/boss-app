/**
 * Created by Tuffy on 16/1/6.
 */
'use strict';

(function () {
    Date.prototype.Format = function (formatStr) {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        str = str.replace(/yyyy|YYYY/, this.getFullYear());
        str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
        // 月份在JS里面是从0开始的
        str = str.replace(/MM/, this.getMonth() > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
        str = str.replace(/M/g, this.getMonth());

        str = str.replace(/w|W/g, Week[this.getDay()]);

        str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
        str = str.replace(/d|D/g, this.getDate());

        str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
        str = str.replace(/h|H/g, this.getHours());
        str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
        str = str.replace(/m/g, this.getMinutes());

        str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
        str = str.replace(/s|S/g, this.getSeconds());
        return str;
    };
})();

// 工具类
var Tools = {
    /**
     * 手机号是否合法
     * @param mobileNo 手机号码
     * @returns {boolean} 合法返回true，反之返回false
     */
    isMobileNo: function (mobileNo) {
        var reg = new RegExp('^1\\d{10}$');
        return reg.test(mobileNo);
    },

    /**
     * 获取小时列表
     */
    timeHMList: function () {
        var list = [];
        for (var h = 0; h < 24; h++) {
            list.push({
                key: h,
                value: h > 9 ? h + ':00' : '0' + h + ':00'
            });
        }
        return list;
    },

    /**
     * 获取小时列表
     */
    numberList: function (max) {
        var list = [];
        for (var h = 1; h <= max; h++) {
            list.push(h);
        }
        return list;
    },

    /**
     * 日期字符串转换成日期对象
     * @param DateStr 日期字符串
     * @returns {Date} 日期对象
     * @constructor
     */
    StringToDate: function (DateStr) {
        var converted = Date.parse(DateStr.replace(/-/g, "/"));
        var myDate = new Date(converted);
        if (isNaN(myDate)) {
            // var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
            var arys = DateStr.split('-');
            myDate = new Date(arys[0], --arys[1], arys[2]);
        }
        return myDate;
    },

    /**
     * 获取两个坐标点之间的距离
     * @param lat1
     * @param lng1
     * @param lat2
     * @param lng2
     * @returns {number}
     */
    getFlatternDistance: function (lat1, lng1, lat2, lng2) {
        var EARTH_RADIUS = 6378137.0;    //单位M
        var PI = Math.PI;

        var getRad = function (d) {
            return d * PI / 180.0;
        };

        var f = getRad((lat1 + lat2) / 2);
        var g = getRad((lat1 - lat2) / 2);
        var l = getRad((lng1 - lng2) / 2);

        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);

        var s, c, w, r, d, h1, h2;
        var a = EARTH_RADIUS;
        var fl = 1 / 298.257;

        sg = sg * sg;
        sl = sl * sl;
        sf = sf * sf;

        s = sg * (1 - sl) + (1 - sf) * sl;
        c = (1 - sg) * (1 - sl) + sf * sl;

        w = Math.atan(Math.sqrt(s / c));
        r = Math.sqrt(s * c) / w;
        d = 2 * w * a;
        h1 = (3 * r - 1) / 2 / c;
        h2 = (3 * r + 1) / 2 / s;

        return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
    },

    getDistanceText: function (distance) {
        if (!isNaN(distance) && distance <= 100) {
            return "100m以内";
        } else if (!isNaN(distance) && 100 < parseInt(distance) && parseInt(distance) < 1000) {
            return parseInt(distance) + "m";
        } else if (!isNaN(distance)) {
            return parseInt(distance / 1000) + "km";
        }
    },

    /**
     * 将时间字符串, 转换为带时间符号时间字符串
     * @param timeStr 时间字符串
     * @returns {Date} 格式化之后时间字符串
     */
    timeStr2FormatTime: function (timeStr) {
        var rtnTimeStr = '';
        if (timeStr && timeStr.indexOf(':') < 0) {
            var timeArray = timeStr.split('');
            for (var i = 0; i < timeArray.length; i++) {
                rtnTimeStr += timeArray[i];
                if (i % 2 !== 0 && i + 1 < timeArray.length) {
                    rtnTimeStr += ':';
                }
            }
        }
        var date = new Date();
        var dateStr = date.Format('yyyy-MM-dd');
        var dateTimeStr = dateStr + ' ' + rtnTimeStr;
        var translateDate = dateTimeStr.replace("-", "/").replace("-", "/");
        var newDate = new Date(translateDate);
        return newDate;
    },

    /**
     * 获取某个日期加上几天之后的日期字符串，支持负数
     * @param dateParameter 某日起字符串
     * @param num 追加天数
     * @returns {String} 返回追加天数之后字符串
     */
    addByTransDate: function (dateParameter, num) {
        var translateDate = "", dateString = "", monthString = "", dayString = "";
        translateDate = dateParameter.replace("-", "/").replace("-", "/");
        var newDate = new Date(translateDate);
        newDate = newDate.valueOf();
        newDate = newDate + num * 24 * 60 * 60 * 1000;
        newDate = new Date(newDate);
        // 如果月份长度少于2，则前加 0 补位
        if ((newDate.getMonth() + 1).toString().length == 1) {
            monthString = 0 + "" + (newDate.getMonth() + 1).toString();
        } else {
            monthString = (newDate.getMonth() + 1).toString();
        }
        // 如果天数长度少于2，则前加 0 补位
        if (newDate.getDate().toString().length == 1) {
            dayString = 0 + "" + newDate.getDate().toString();
        } else {
            dayString = newDate.getDate().toString();
        }
        dateString = newDate.getFullYear() + "-" + monthString + "-"
            + dayString;
        return dateString;
    },
    /**
     * 获取在当前年基础上添加年数的天数
     * @param count 添加年数
     * @returns {number} 添加年之后天数
     */
    getYearDays: function (data, count) {
        var yearNum = parseInt(data.Format('yyyy'));
        yearNum = yearNum + count;
        if (yearNum % 4 === 0) {
            return 366;
        }
        return 365;
    }
};

// 登陆使用
var LoginInfo = {

    /**
     * 获取本地用户信息
     */
    getLoginInfo: function () {
        return Lockr.get('username_localStorage');
    },

    /**
     * 设置本地用户信息
     * @param loginInfo 用户信息下对象
     */
    setLoginInfo: function (loginInfo) {
        Lockr.set('username_localStorage', loginInfo);
    },
    /**
     * 删除本地用户信息
     */
    rm: function () {
        Lockr.rm('username_localStorage');
    },

    /**
     * 获取本地七牛上传token
     */
    getQiniUploadToken: function () {
        return Lockr.get('qiniuploadtoken_localStorage');
    },

    /**
     * 设置本地七牛上传token
     */
    setQiniUploadToken: function (qiniuploadtokenObj) {
        Lockr.set('qiniuploadtoken_localStorage', qiniuploadtokenObj);
    }
};

// 消息提示
var Tip = {
    msg: function (msg, callback) {
        var index = layer.alert(msg, {
            skin: 'layui-layer-lan',
            closeBtn: 0
        }, function () {
            if (callback) {
                callback();
            }
            layer.close(index);
        });
    }
};

function orderStatusTranslate(code) {
    var desc = '';
    switch (code) {
        case 30:
            desc = "待确认";
            break;
        case 50:
            desc = "已确认";
            break;
        case 200:
            desc = "已完成";
            break;
        case 250:
            desc = "用户未到店";
            break;
        case 500:
            desc = "取消";
            break;
    }
    return desc;
}

function payStatusTranslate(code) {
    var desc = '';
    switch (code) {
        case 10:
            desc = "无需支付";
            break;
        case 30:
            desc = "等待支付";
            break;
        case 50:
            desc = "支付成功";
            break;
        case 70:
            desc = "支付失败";
            break;
        case 90:
            desc = "已退款";
            break;
    }
    return desc;
}

function payTypeTranslate(code) {
    var desc = '';
    switch (code) {
        case 100:
            desc = "预付款";
            break;
        case 200:
            desc = "在线支付";
            break;
    }
    return desc;
}

function orderTypeTranslate(code) {
    var desc = '';
    var num = code.substr(0, 3);
    var a = num % 10;
    var b = num / 10 % 10;
    var c = num / 100 % 10;

    if (a == 1) {
        desc = '团体';
    } else if (b == 1) {
        desc = '餐饮';
    } else if (c == 1) {
        desc = '住宿';
    } else {
        desc = '其他';
    }
    return desc;
}