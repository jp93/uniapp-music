

let BASE_URL;
if(process.env.NODE_ENV === 'development' ) {
	//开发档口小程序baseurl
	BASE_URL = 'http://daniutec.com/zhpx'
}else {
	//正式口小程序baseurl
	BASE_URL  = 'https://peixun.th00.cn'
}



export default {
	BASE_URL,
	
}

