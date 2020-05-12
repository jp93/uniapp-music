/*
 * 表单校验函数
 * @author aloysiousliang@gmail.com
 * @date   2016.07.05
 */
const TYPE_MOBILE = 'mobile'
const TYPE_MOBILE_TIPS = '请输入正确的手机号码'
const TYPE_EMAIL = 'email'
const TYPE_EMAIL_TIPS = '请输入正确的邮箱地址'
const TYPE_IDCARD = 'idcard'
const TYPE_IDCARD_TIPS = '请输入正确的身份证号码'
const TYPE_NUMBER = 'number'
const TYPE_NUMBER_TIPS = '只允许输入数字'
const TYPE_CHINESE = 'chinese'
const TYPE_CHINESE_TIPS = '只允许输入汉字'
const TYPE_NOT_EMPTY = 'notempty'
const TYPE_NOT_EMPTY_TIPS = '字段不能为空'

const trim = (string) =>  {
	return string.replace(/^\s+|\s+$/gm,'')
}

// 手机号校验
const isMobile = (value) => {
	// 不校验空串
	if (value === '') return true
	const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/ 
	if (!reg.test(value)) {
		return false 
	} else {
		return true
	}
}

// 邮箱校验
const isEmail = (value) => {
	// 不校验空串
	if (value === '') return true
	const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	if (!reg.test(value)) {
		return false
	} else {
		return true
	}	
}

// 身份证校验
const isIdCard = (value) => {
	// 不校验空串
	if (value === '') return true
	const city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "}
	let pass= true
	value = value.toUpperCase()

	// 身份证号格式错误
	if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
		pass = false

	// 地址编码错误
	} else if (!city[value.substr(0,2)]) {
		pass = false
	
	} else {
		//18位身份证需要验证最后一位校验位
		if (value.length == 18) {
			value = value.split('')
			//∑(ai×Wi)(mod 11)
			//加权因子
			const factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
			//校验位
			const parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
			let sum = 0
			let ai = 0
			let wi = 0
			for (let i = 0; i < 17; i++) {
				ai = value[i]
				wi = factor[i]
				sum += ai * wi
			}

			if (parity[sum % 11] != value[17]) {
				pass =false
			}
		}
	}

	return pass;
}

// 数字校验
const isNumber = (value) => {
	// 不校验空串
	if (value === '') return true
	const reg = /^[0-9]+$/
	if (value != '' && !reg.test(value)) { 
		return false 
	} else {
		return true
	}
}

// 中文校验
const isChinese = (value) => {
	// 不校验空串
	if (value === '') return true
	const reg = /^[\u0391-\uFFE5]+$/
	if (value != '' && !reg.test(value)) { 
		return false; 
	} else {
		return true
	} 
}

// 非空校验
const isNotEmpty = (value) => {
	value = trim(value)
	return (value !== '')
}

const _is = (value, type) => {
	let result = {}
	switch (type) {
		case TYPE_MOBILE:
			result = {
				isValid: isMobile(value),
				errorMsg: TYPE_MOBILE_TIPS
			}
			break
		case TYPE_EMAIL:
			result = {
				isValid: isEmail(value),
				errorMsg: TYPE_EMAIL_TIPS
			}
			break
		case TYPE_IDCARD:
			result = {
				isValid: isIdCard(value),
				errorMsg: TYPE_IDCARD_TIPS
			}
			break
		case TYPE_NUMBER:
			result = {
				isValid: isNumber(value),
				errorMsg: TYPE_NUMBER_TIPS
			}
			break
		case TYPE_CHINESE:
			result = {
				isValid: isChinese(value),
				errorMsg: TYPE_CHINESE_TIPS
			}
			break
		case TYPE_NOT_EMPTY:
			result = {
				isValid: isNotEmpty(value),
				errorMsg: TYPE_NOT_EMPTY_TIPS
			}
			break
		default:
			result = {
				isValid: true,
				errorMsg: '不做校验'
			}
	}

	return result
}

export default {
	/**
	 * value    待校验的值
	 * types    校验类型，支持多种类型校验，多种类型用'|'间隔，优先级逐个降低
	 */
	is (value, types) {
		const typeList = types.split('|')
		for (let i in typeList) {
			const r = _is(value, typeList[i])
			// 只返回优先级高的校验结果
			if (!r.isValid) {
				return r
			}
		}
		return {
			isValid: true,
			errorMsg: '校验通过'
		}
	}
}
