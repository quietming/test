Array.prototype.max = function () {
	return Math.max.apply({}, this)
}
Array.prototype.min = function () {
	return Math.min.apply({}, this)
}
minute_k()
setInterval(function () {
	minute_k()
}, 1000 * 60)
// var minute_data = JSON.parse(localStorage.getItem('minute_data'))
// console.log(minute_data)
function minute_k() {
	var minute_data, // 分时线数据
		ydata = [], //价格
		ydata2 = [], //涨跌幅百分比
		ydata3 = [], //成交量
		myChart = echarts.init(document.getElementById('chart1')),
		xdata = ["09:30", "09:31", "09:32", "09:33", "09:34", "09:35", "09:36", "09:37", "09:38", "09:39", "09:40", "09:41", "09:42", "09:43", "09:44", "09:45", "09:46", "09:47", "09:48", "09:49", "09:50", "09:51", "09:52", "09:53", "09:54", "09:55", "09:56", "09:57", "09:58", "09:59", "10:00", "10:01", "10:02", "10:03", "10:04", "10:05", "10:06", "10:07", "10:08", "10:09", "10:10", "10:11", "10:12", "10:13", "10:14", "10:15", "10:16", "10:17", "10:18", "10:19", "10:20", "10:21", "10:22", "10:23", "10:24", "10:25", "10:26", "10:27", "10:28", "10:29", "10:30", "10:31", "10:32", "10:33", "10:34", "10:35", "10:36", "10:37", "10:38", "10:39", "10:40", "10:41", "10:42", "10:43", "10:44", "10:45", "10:46", "10:47", "10:48", "10:49", "10:50", "10:51", "10:52", "10:53", "10:54", "10:55", "10:56", "10:57", "10:58", "10:59", "11:00", "11:01", "11:02", "11:03", "11:04", "11:05", "11:06", "11:07", "11:08", "11:09", "11:10", "11:11", "11:12", "11:13", "11:14", "11:15", "11:16", "11:17", "11:18", "11:19", "11:20", "11:21", "11:22", "11:23", "11:24", "11:25", "11:26", "11:27", "11:28", "11:29", "11:30", "13:00", "13:01", "13:02", "13:03", "13:04", "13:05", "13:06", "13:07", "13:08", "13:09", "13:10", "13:11", "13:12", "13:13", "13:14", "13:15", "13:16", "13:17", "13:18", "13:19", "13:20", "13:21", "13:22", "13:23", "13:24", "13:25", "13:26", "13:27", "13:28", "13:29", "13:30", "13:31", "13:32", "13:33", "13:34", "13:35", "13:36", "13:37", "13:38", "13:39", "13:40", "13:41", "13:42", "13:43", "13:44", "13:45", "13:46", "13:47", "13:48", "13:49", "13:50", "13:51", "13:52", "13:53", "13:54", "13:55", "13:56", "13:57", "13:58", "13:59", "14:00", "14:01", "14:02", "14:03", "14:04", "14:05", "14:06", "14:07", "14:08", "14:09", "14:10", "14:11", "14:12", "14:13", "14:14", "14:15", "14:16", "14:17", "14:18", "14:19", "14:20", "14:21", "14:22", "14:23", "14:24", "14:25", "14:26", "14:27", "14:28", "14:29", "14:30", "14:31", "14:32", "14:33", "14:34", "14:35", "14:36", "14:37", "14:38", "14:39", "14:40", "14:41", "14:42", "14:43", "14:44", "14:45", "14:46", "14:47", "14:48", "14:49", "14:50", "14:51", "14:52", "14:53", "14:54", "14:55", "14:56", "14:57", "14:58", "14:59", "15:00"] // 时间

	$.ajax({
		type: "get",
		url: url + "api/treasure_minute/"+code,
        data: {
            session_id: session_id,
        },
		success: function (res) {
			console.log(JSON.parse(res))
			var data = JSON.parse(res)
			minute_data = data.data
			// localStorage.setItem('minute_data', JSON.stringify(minute_data))

			// for (let i = 0; i < minute_data.length; i++) {
			// 	xdata.push(minute_data[i][0].slice(0, 2) + ':' + minute_data[i][0].slice(2))
			// }
			for (let i = 0; i < minute_data.length; i++) {
				ydata.push(minute_data[i][1])
			}
			for (let i = 0; i < minute_data.length; i++) {
				var yestclose = data.yestclose
				var scale = ((minute_data[i][2] - yestclose) / yestclose * 100).toFixed(2)
				ydata2.push(scale)
			}
			for (let i = 0; i < minute_data.length; i++) {
				ydata3.push(minute_data[i][3])
			}
			myChart.setOption(option = {
				animation: false,
				grid: {
					left: 10,
					right: 10,
					top: 10,
					bottom: 20
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					},
					textStyle: {
						fontSize: 12
					}
				},
				xAxis: [{
					type: 'category',
					splitNumber: 0,
					data: xdata,
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
						interval: 100
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: ['#ccc'],
							width: 1,
							type: 'dashed'
						}
					}
				}],
				yAxis: [{
						type: 'value',
						min: (ydata.min() * 0.95).toFixed(2),
						max: (ydata.max() * 1.01).toFixed(2),
						axisLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							inside: true,
							margin: 2,
						},
						splitLine: {
							show: false
						},
						z: 2
					},
					{
						type: 'value',
						position: 'right',
						min: (ydata2.min() * 1.5).toFixed(2),
						max: (Math.abs(ydata2.max())*1.5).toFixed(2),
						axisLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							inside: true,
							margin: 2,
						},
						splitLine: {
							show: false
						},
						z: 2
					},
					{
						type: 'value',
						position: 'left',
						min: ydata3.min(),
						max: ydata3.max() * 4,
						axisLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							show: false,
							inside: true,
							margin: 2,
						},
						splitLine: {
							show: false
						}
					}
				],
				series: [{
						name: '价格',
						type: 'line',
						symbol: "none",
						data: ydata,
						itemStyle: {
							color: '#c1a575',
						},
						lineStyle: {
							width: 1
						}
					},
					{
						name: '涨跌幅',
						type: 'line',
						symbol: "none",
						yAxisIndex: 1,
						data: ydata2,
						itemStyle: {
							color: '#727272',
						},
						lineStyle: {
							width: 1
						}
					},
					{
						name: '成交量',
						type: 'bar',
						yAxisIndex: 2,
						data: ydata3,
						itemStyle: {
							color: '#14b143',
							// normal: {
							// 	color: '#ef232a',
							// 	color0: '#14b143',
							// 	borderColor: '#ef232a',
							// 	borderColor0: '#14b143'
							// },
						}
					}
				]
			})
		}
	});
}