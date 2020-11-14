login=async function() {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	data = new Object();
	data.username = username;
	data.password = password;
	console.log(username);
	console.log(password);
	let response = await fetch('https://os.ncuos.com/api/user/token', {
		method: 'POST',
		headers: {
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
			'content-type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (response.ok) {
		response.json().then(data => {
				if (data.status == 0) {
					alert(unescape(data.message));
					return;//密码错误处理
				}
					fetch('https://os.ncuos.com/api/user/profile/basic', {
						method: 'GET',
						headers: {
							'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
							'authorization': 'passport ' + data.token
						}
					}).then(function(response) {
						response.json().then(data => {
							document.getElementById('login-form').style.display='none';
							document.getElementById('zz').style.display = 'block';
							document.getElementById('info-form').style.display = 'block';
							console.log(data);
							document.getElementById('xm').innerText = "姓名:" + data.base_info.xm;
							document.getElementById('xh').innerText = "学号:" + data.base_info.xh;
							document.getElementById('xb').innerText = "性别:" + data.base_info.xb.mc;
							document.getElementById('dz').innerText = "地址:" + data.base_info.csd.mc;
							document.getElementById('sjh').innerText = "手机号:" + data.base_info.yddh;
						})
					})
				});
	}
}

quit=function() {
	document.getElementById('login-form').style.display='block';
	document.getElementById('info-form').style.display = 'none';
	document.getElementById('zz').style.display = 'none';//返回按钮事件
}
