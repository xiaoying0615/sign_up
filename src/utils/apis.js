const baseURL = 'https://www2.kaowola.com/'

export default {
  admin: {
    // 注册验证码
    registerSendSMS: baseURL + 'admin/register/sendSMS',
    // 注册
    register: baseURL + 'admin/register/doRegister',
    // 登录
    login: baseURL + 'admin/login/doLogin',
    // 重置验证码
    resetPasswordSendSMS: baseURL + 'admin/resetpassword/sendSMS',
    // 登录
    resetPassword: baseURL + 'admin/resetpassword/resetPassword',

    // 管理员-用户列表
    userList: baseURL + 'admin/admin_user/lists',
    // 管理员-删除用户
    userDelete: baseURL + 'admin/admin_user/del'
  },

  activity: {
    // 活动列表
    list: baseURL + 'admin/activity/lists',
    // 创建活动
    create: baseURL + 'admin/activity/addBaseInfo',
    // 升级
    upgrade: baseURL + 'admin/activity/upgrade',
    // 删除
    delete: baseURL + 'admin/activity/del',
    // 查询基本信息
    fetchInfo: baseURL + 'admin/activity/getInfo',
    // 修改基本信息
    editInfo: baseURL + 'admin/activity/editBaseInfo',
    // 编辑活动表单
    editFormInfo: baseURL + 'admin/activity/editFormInfo',
    // 上传背景图
    uploadImage: baseURL + 'admin/activity/uploadBackground'
  },

  records: {
    // 数据列表
    list: baseURL + 'admin/sign_info/lists',
    // 批量补签
    sign: baseURL + 'admin/sign_info/sign',
    // 批量删除
    delete: baseURL + 'admin/sign_info/del'
  },

  mobile: {
    // 初始化
    index: baseURL + 'index/index/index',
    // 上传头像
    avatar: baseURL + 'index/face/avatar',
    // 报名
    doClock: baseURL + 'index/face/doClock',
    // 发送验证码
    sendSMS: baseURL + 'index/face/sendSMS',
    // 获取报名信息
    signInfo: baseURL + 'index/base/signInfo'
  },

  screen: {
    // 初始化
    init: baseURL + 'index/base/screen',
    // 人脸签到
    doSign: baseURL + 'index/base/doSign'
  },

  pay: {
    // 高级活动
    upgradePay: baseURL + 'admin/activity/upgradePay',
    // 去除版权
    removeVersion: baseURL + 'admin/activity/removeVersion',
    // 活动延期
    delay: baseURL + 'admin/activity/extendedDay',
    // 支付
    pay: baseURL + 'admin/pay/doPay',
    // 支付流水
    history: baseURL + 'admin/order/lists'
  },

  tool: {
    // 获取服务器时间
    getTime: baseURL + 'admin/activity/getTime'
  }
  
}